import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";
import { useAuth } from "../../context/auth/AuthContext";
import backgroundImage from "../../assets/images/background.png";
import { api, socket } from "../../services/api";

const ChatPage = () => {
  const { isAuthenticated } = useAuth();
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const userId = userData?.id;
  const username = userData?.username;
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const messageContainerRef = useRef(null);

  const getChatMessages = async (roomId) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/chat/messages/${roomId}`);
      setChatMessages(response.data);
      scrollToBottom(); // Adicionando a chamada para manter a rolagem na parte inferior
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const messageContainerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await api.get(`/api/chat/userRooms/${userId}`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching user rooms:", error);
      }
    };

    if (isAuthenticated) {
      getRooms();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (messageText.trim() === "" || selectedRoom === "") {
      return;
    }

    try {
      const newMessage = {
        content: messageText,
        userId: userId,
        roomId: selectedRoom,
        senderName: username,
      };

      socket.emit("sendMessage", newMessage);

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateRoom = async () => {
    setIsCreatingRoom(true);
    try {
      const response = await api.post("/api/chat/room", { name: roomName });
      const roomId = response.data.id;
      await Promise.all(
        selectedUsers.map((userId) =>
          api.post("/api/chat/room/addUser", { userId, roomId })
        )
      );
      setRooms([...rooms, { id: roomId, name: roomName }]);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setIsCreatingRoom(false);
      setRoomName("");
      setSelectedUsers([]);
    }
  };

  const handleCloseCreateRoomDialog = () => {
    setIsCreatingRoom(false);
    setRoomName("");
    setSelectedUsers([]);
  };

  useEffect(() => {
    const joinRoom = async () => {
      if (selectedRoom !== "") {
        socket.emit("joinRoom", { roomId: selectedRoom });
      }
    };

    joinRoom();

    return () => {
      socket.off("joinRoom");
    };
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("initialMessages", (messages) => {
      setChatMessages(messages);
    });

    return () => {
      socket.off("initialMessages");
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/api/users/list");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const handleRoomSelection = async (roomId) => {
    setSelectedRoom(roomId);
    await getChatMessages(roomId);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const renderMessages = () => {
    let currentDate = null;

    return chatMessages.map((message, index) => {
      const messageDate = formatDate(message.createdAt);
      let showDate = false;

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        showDate = true;
      }

      return (
        <div key={index}>
          {showDate && (
            <Typography
            variant="subtitle2"
            align="center"
            sx={{
              my: 1,
              color: "#fff",
              background: "#000",
              borderRadius: "4px",
              padding: "4px",
              width: "50%", // Ajuste a largura conforme necessário
              margin: "0 auto", // Centraliza o elemento horizontalmente
            }}
          >             {currentDate}
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: message.userId === userId ? "flex-end" : "flex-start" }}>
            <div style={{ position: "relative", overflow: "hidden", marginBottom: "8px", maxWidth: "70%", minWidth: "20%"}}>
              <div
                style={{
                  backgroundColor: message.userId === userId ? "#DCF8C6" : "#E0E0E0",
                  padding: "8px 12px",
                  borderRadius: message.userId === userId ? "10px 0 10px 10px" : "0 10px 10px 10px",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                <Typography variant="subtitle2" style={{ marginBottom: "4px" }}><strong>{message.senderName}</strong></Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <Typography variant="body1" style={{ marginBottom: "4px", marginRight: "8px", wordBreak: "break-word" }}>{message.content}</Typography>
                  <Typography variant="caption" style={{ color: "#888" }}>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                </div>
              </div>
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  backgroundColor: message.userId === userId ? "#DCF8C6" : "#E0E0E0",
                  zIndex: "0",
                  [message.userId === userId ? "left" : "right"]: "-10px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 96px)" }}>
      <Paper
        elevation={3}
        sx={{
          flex: "0 0 30%",
          overflowY: "auto",
          padding: 2,
          marginRight: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Salas de Bate-papo
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreatingRoom(true)}
          sx={{ mb: 2 }}
        >
          Criar Sala
        </Button>
        <Dialog
          open={isCreatingRoom}
          onClose={handleCloseCreateRoomDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Criar Sala</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nome da Sala"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Selecione os usuários para adicionar à sala:
            </Typography>
            {users.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers((prevUsers) => [
                          ...prevUsers,
                          user.id,
                        ]);
                      } else {
                        setSelectedUsers((prevUsers) =>
                          prevUsers.filter((userId) => userId !== user.id)
                        );
                      }
                    }}
                  />
                }
                label={user.username}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateRoomDialog}>Cancelar</Button>
            <Button
              onClick={handleCreateRoom}
              color="primary"
              disabled={!roomName || selectedUsers.length === 0}
            >
              Criar
            </Button>
          </DialogActions>
        </Dialog>
        <Divider sx={{ my: 2 }} />
        {rooms.map((room) => (
          <Button
            key={room.id}
            variant="outlined"
            fullWidth
            onClick={() => handleRoomSelection(room.id)}
            sx={{ mb: 1 }}
          >
            {room.name}
          </Button>
        ))}
      </Paper>
      <Container
        sx={{
          flex: "1 1 70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            overflowY: "auto",
            flexGrow: 1,
          }}
          ref={messageContainerRef}
        >
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!loading && renderMessages()}
        </Paper>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Digite sua mensagem"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ mt: 2, alignSelf: "flex-end" }}
          >
            Enviar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatPage;
