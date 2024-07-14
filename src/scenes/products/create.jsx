import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [productImage, setProductImage] = useState('');
  const [shop, setShop] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      categoryid: parseInt(categoryId),
      price: parseFloat(price),
      stockquantity: parseInt(stockQuantity),
      productimage: productImage,
      shop: shop,
    };
    try {
      const response = await axios.post('http://localhost:3000/products', productData);
      console.log(response.data);
      // Reset form fields after successful submission
      setProductName('');
      setCategoryId('');
      setPrice('');
      setStockQuantity('');
      setProductImage('');
      setShop('');
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <TextField
          fullWidth
          label="Product Name"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Category ID"
          variant="outlined"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock Quantity"
          variant="outlined"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Image URL"
          variant="outlined"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Shop"
          variant="outlined"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;
