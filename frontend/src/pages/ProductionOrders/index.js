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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const OrderManagement = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrderName, setEditOrderName] = useState('');
  const [editOrderPrice, setEditOrderPrice] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleDeleteOrder = async (orderId) => {
    // Código para deletar ordem (a ser implementado)
    setOrders(orders.filter(order => order.id !== orderId));
    setConfirmDeleteDialogOpen(false);
  };

  const handleConfirmDelete = (orderId) => {
    setDeleteOrderId(orderId);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleAddOrder = async () => {
    // Código para adicionar ordem (a ser implementado)
    const newOrder = { id: orders.length + 1, name: orderName, price: orderPrice };
    setOrders([...orders, newOrder]);
    setOpenModal(false);
    setOrderName('');
    setOrderPrice('');
  };

  const handleEditOrder = async () => {
    // Código para editar ordem (a ser implementado)
    const editedOrder = { id: editOrderId, name: editOrderName, price: editOrderPrice };
    const updatedOrders = orders.map(order =>
      order.id === editOrderId ? editedOrder : order
    );
    setOrders(updatedOrders);
    setEditDialogOpen(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchText.toLowerCase())
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
          Ordens de Produção
        </Typography>

        {/* Espaço abaixo da Typography */}
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
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            Adicionar Ordem de Produção
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>ID OP</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>PRODUTO</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>LOTE</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>DATA LANÇAMENTO</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>DATA ENTREGA</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>SETOR</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>EXECUÇÃO</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>QTDE/ENVASE</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>STATUS</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>IMPRIMIR</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>AÇÕES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => (
                  <TableRow key={index}>
                    {/* Incluir os dados da ordem aqui */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default OrderManagement;
