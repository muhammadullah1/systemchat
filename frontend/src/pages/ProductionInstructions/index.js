import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const ProductionInstructions = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 'calc(100vh - 96px)', // mesma altura das outras páginas
        display: 'flex',
        alignItems: 'center', // centralizar verticalmente
        justifyContent: 'center', // centralizar horizontalmente
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 1,
          width: '100%', // mesma largura das outras páginas
          maxWidth: 800, // limite de largura para melhor legibilidade
        }}
      >
        <Typography variant="h4" gutterBottom>
          Instruções de Produção
        </Typography>
        <Typography variant="body1" gutterBottom>
          Siga estas etapas para garantir uma produção eficiente:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Verifique os materiais necessários antes de iniciar." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Prepare a área de trabalho e verifique se está limpa." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Siga as instruções de segurança em todos os momentos." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Realize inspeções regulares das máquinas e equipamentos." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Comunique qualquer problema ou anomalia ao supervisor imediatamente." />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default ProductionInstructions;
