import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import app from './app';
import http from 'http';
import { connectDatabase } from './database';
import { proxy_port } from './config';
import './database/initialize';
import SendPrivateService from './services/ChatServices/SendChatService';
import MessageService from './services/ChatServices/MessageService'; // Importe o serviço de mensagens

const startServer = async () => {
  try {
    await connectDatabase(); 
    console.log('Database connected...');

    const server = http.createServer(app);

    app.use(cors({
      origin: '*',
      credentials: true 
    }));

    const io = new SocketIoServer(server, {
      cors: {
        origin: '*', 
        methods: ['GET', 'POST'], 
        allowedHeaders: ['Authorization'] 
      }
    });

    io.on('connection', async (socket) => {
      console.log(`New client connected: ${socket.id}`);
      
      socket.on('joinRoom', async ({ roomId }) => {
        socket.join(roomId);
        console.log(`Client ${socket.id} joined room ${roomId}`);
        try {
          // Buscar as mensagens do banco de dados
          const messages = await MessageService.getMessages(roomId);
          // Emitir as mensagens para o cliente recém-conectado
          io.to(socket.id).emit('initialMessages', messages);
        } catch (error) {
          console.error('Error fetching initial messages:', error);
        }
      });

      socket.on('sendMessage', async ({ content, userId, roomId, senderName }) => {
        try {
          const message = { content, userId, roomId, senderName, createdAt: new Date() };
          console.log('Mensagem recebida:', message);
          // Emitir a mensagem para o frontend
          io.to(roomId).emit('message', message);
          // Salvar a mensagem no banco de dados
          await SendPrivateService.sendPrivateMessage(content, userId, roomId, senderName); // Atualize o serviço para aceitar senderName
          console.log('Mensagem enviada:', message);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      });
      

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    server.listen(proxy_port, () => {
      console.log(`Server running on http://localhost:${proxy_port}`);
      console.log('Socket.IO server started successfully...');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Error starting Socket.IO server:', error);
  }
};

startServer();
