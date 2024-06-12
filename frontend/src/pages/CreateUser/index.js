import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmail } from "validator";
import { useAuth } from "../../context/auth/AuthContext";
import { api } from "../../services/api";

const CreateUser = () => {
  const { isAuthenticated, token, logoutUser } = useAuth();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/users/list");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getUsers();
    }
  }, [isAuthenticated, token]);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
      // Remove o usuário deletado da lista
      setUsers(users.filter((user) => user.id !== userId));
      setConfirmDeleteDialogOpen(false);
      toast.success("Usuário deletado com sucesso.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao deletar usuário.");
    }
  };

  const handleConfirmDelete = (userId) => {
    setDeleteUserId(userId);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleAddUser = async () => {
    if (!isEmail(email)) {
      toast.error("Formato de e-mail inválido.");
      return;
    }

    try {
      const newUser = { username, email, password };
      const response = await api.post("/api/users/create", newUser);
      setUsers([...users, response.data]);
      toast.success("Usuário criado com sucesso.");
      setOpenModal(false);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Erro ao criar usuário.");
    }
  };

  const handleEditUser = async () => {
    try {
      const editedUser = {
        username: editUsername,
        email: editEmail,
        password: editPassword,
      };
      await api.put(`/api/users/edit/${editUserId}`, editedUser);
      const updatedUsers = users.map((user) =>
        user.id === editUserId
          ? { ...user, username: editUsername, email: editEmail }
          : user
      );
      setUsers(updatedUsers);
      setEditDialogOpen(false);
      toast.success("Usuário editado com sucesso.");
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Erro ao editar usuário.");
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  if (!isAuthenticated) {
    return <p>Você não tem permissão para acessar esta página.</p>;
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 96px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          maxWidth: "100%",
          overflowY: "auto",
        }}
        maxWidth={false}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Usuários
        </Typography>

        {/* Espaço abaixo da Typography */}
        <Box mb={2} />

        {/* Campo de Pesquisa */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            variant="standard"
            placeholder="Pesquisar..."
            value={searchText}
            onChange={handleSearchTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Adicionar usuário
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#0c3d17", color: "#fff" }}>
                  Nome do usuário
                </TableCell>
                <TableCell sx={{ backgroundColor: "#0c3d17", color: "#fff" }}>
                  E-mail
                </TableCell>
                <TableCell sx={{ backgroundColor: "#0c3d17", color: "#fff" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditUserId(user.id);
                          setEditUsername(user.username);
                          setEditEmail(user.email);
                          setEditDialogOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleConfirmDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add User Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adicionar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Nome"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-username"
            label="Novo Nome"
            type="text"
            fullWidth
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="edit-email"
            label="Novo E-mail"
            type="email"
            fullWidth
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="edit-password"
            label="Novo Password"
            type="password"
            fullWidth
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={handleCloseConfirmDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmação de Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteUser(deleteUserId)}
            color="secondary"
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default CreateUser;
