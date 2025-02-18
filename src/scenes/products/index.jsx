import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import { mockDataProducts } from '../../data/mockData';
import Header from '../../components/Header';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    {
      field: 'date',
      headerName: 'Date Last Modified',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'id',
      headerName: 'Product ID',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'category',
      headerName: 'Category',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
    },
    {
      field: 'store',
      headerName: 'Store',
      flex: 1,
    },
    {
      field: 'availability',
      headerName: 'Availability',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.availability === 'In Stock'
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {row.availability}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Products" />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-product')}
          sx={{
            backgroundColor: colors.blueAccent[700],
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataProducts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Products;
