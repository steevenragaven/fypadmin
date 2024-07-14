import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, TextField, useTheme, Button, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { tokens } from '../../theme';
import { mockDataDelivery } from '../../data/mockData';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const Deliverypersonal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [filterText, setFilterText] = useState('');

  const handleMenuOpen = (event, storeId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStoreId(storeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStoreId(null);
  };

  const handleEditStore = () => {
    console.log('Edit store with id:', selectedStoreId);
    handleMenuClose();
  };

  const handleDeleteStore = () => {
    console.log('Delete store with id:', selectedStoreId);
    handleMenuClose();
  };

  const columns = [
    {
      field: 'date_started',
      headerName: 'Date started',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'employee_id',
      headerName: 'Employee ID',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
    },
    {
      field: 'contact_number',
      headerName: 'Contact Number',
      flex: 1,
    },
    {
      field: 'license_number',
      headerName: 'License Number',
      flex: 1,
    },
    {
      field: 'car_plate_assigned',
      headerName: 'Car Plate Assigned',
      flex: 1,
    },
    {
      field: 'order_count_today',
      headerName: 'Order Count Today',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip
          label={`${value} orders`}
          color={value > 10 ? 'success' : value > 0 ? 'warning' : 'default'}
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedStoreId === row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditStore}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteStore}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  const filteredRows = mockDataDelivery.filter((store) =>
    store.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box m="20px">
      <Header title="Employees" />
      <Box mt="20px" display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={() => navigate('/create-personnel')}>
          Add Employee
        </Button>
      </Box>
      <Box mt="20px">
        <TextField
          label="Search by Employee Name"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Box>
      <Box
        mt="20px"
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
        <DataGrid
          checkboxSelection
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          sortingOrder={['asc', 'desc']}
        />
      </Box>
      
    </Box>
  );
};

export default Deliverypersonal;
