import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

const GroupsAndSubGroups = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [name, setName] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleDelete = async (id) => {
    // Código para deletar grupo/subgrupo (a ser implementado)
    if (tabIndex === 0) {
      setGroups(groups.filter(item => item.id !== id));
    } else {
      setSubGroups(subGroups.filter(item => item.id !== id));
    }
    setConfirmDeleteDialogOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleAdd = async () => {
    // Código para adicionar grupo/subgrupo (a ser implementado)
    const newItem = { id: tabIndex === 0 ? groups.length + 1 : subGroups.length + 1, name };
    if (tabIndex === 0) {
      setGroups([...groups, newItem]);
    } else {
      setSubGroups([...subGroups, newItem]);
    }
    setOpenModal(false);
    setName('');
  };

  const handleEdit = async () => {
    // Código para editar grupo/subgrupo (a ser implementado)
    const editedItem = { id: editId, name: editName };
    if (tabIndex === 0) {
      const updatedGroups = groups.map(item =>
        item.id === editId ? editedItem : item
      );
      setGroups(updatedGroups);
    } else {
      const updatedSubGroups = subGroups.map(item =>
        item.id === editId ? editedItem : item
      );
      setSubGroups(updatedSubGroups);
    }
    setEditDialogOpen(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredItems = (tabIndex === 0 ? groups : subGroups).filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 96px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          overflowY: 'auto',
        }}
        maxWidth={false}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Grupos e Subgrupos
        </Typography>

        <Box mb={2} />

        {/* Campo de Pesquisa */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
          <Box sx={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Grupos" />
              <Tab label="Subgrupos" />
            </Tabs>
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            Adicionar {tabIndex === 0 ? 'Grupo' : 'Subgrupo'}
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Nome</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => {
                        setEditId(item.id);
                        setEditName(item.name);
                        setEditDialogOpen(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleConfirmDelete(item.id)}
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

      {/* Add Item Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Adicionar {tabIndex === 0 ? 'Grupo' : 'Subgrupo'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAdd} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar {tabIndex === 0 ? 'Grupo' : 'Subgrupo'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-name"
            label="Nome"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEdit} color="primary">
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
        <DialogTitle id="alert-dialog-title">Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir este {tabIndex === 0 ? 'grupo' : 'subgrupo'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(deleteId)}
            color="secondary"
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupsAndSubGroups;
