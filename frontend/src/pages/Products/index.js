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

const ProductManagement = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleDeleteProduct = async (productId) => {
    // Código para deletar produto (a ser implementado)
    setProducts(products.filter(product => product.id !== productId));
    setConfirmDeleteDialogOpen(false);
  };

  const handleConfirmDelete = (productId) => {
    setDeleteProductId(productId);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleAddProduct = async () => {
    // Código para adicionar produto (a ser implementado)
    const newProduct = { id: products.length + 1, name: productName, price: productPrice };
    setProducts([...products, newProduct]);
    setOpenModal(false);
    setProductName('');
    setProductPrice('');
  };

  const handleEditProduct = async () => {
    // Código para editar produto (a ser implementado)
    const editedProduct = { id: editProductId, name: editProductName, price: editProductPrice };
    const updatedProducts = products.map(product =>
      product.id === editProductId ? editedProduct : product
    );
    setProducts(updatedProducts);
    setEditDialogOpen(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
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
          Produtos
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
            Adicionar Produto
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Imagem</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Nome do Produto</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Preço</TableCell>
                <TableCell sx={{ backgroundColor: '#0c3d17', color: '#fff' }}>Ações</TableCell>
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
                filteredProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => {
                        setEditProductId(product.id);
                        setEditProductName(product.name);
                        setEditProductPrice(product.price);
                        setEditDialogOpen(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleConfirmDelete(product.id)}
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

      {/* Add Product Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Adicionar Produto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="productName"
            label="Nome"
            type="text"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="productPrice"
            label="Preço"
            type="text"
            fullWidth
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Produto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-productName"
            label="Novo Nome"
            type="text"
            fullWidth
            value={editProductName}
            onChange={(e) => setEditProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="edit-productPrice"
            label="Novo Preço"
            type="text"
            fullWidth
            value={editProductPrice}
            onChange={(e) => setEditProductPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditProduct} color="primary">
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
            Tem certeza de que deseja excluir este produto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteProduct(deleteProductId)}
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

export default ProductManagement;
