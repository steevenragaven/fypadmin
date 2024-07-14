import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, TextField, useTheme, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignOrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchDeliveryMen();
  }, []);

  const fetchDeliveryMen = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/delivery-men');
      if (!response.ok) {
        throw new Error(`Error fetching delivery men: ${response.statusText}`);
      }
      const data = await response.json();
      setDeliveryMen(data);
    } catch (error) {
      console.error('Error fetching delivery men:', error);
    }
  };

  const handleMenuOpen = (event, storeId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStoreId(storeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStoreId(null);
  };

  const handleAssign = async () => {
    if (!selectedDeliveryMan) {
      toast.error('Please select a delivery man before confirming the assignment.');
      return;
    }

    console.log('Assigning order:', order.orderid, 'to delivery person:', selectedDeliveryMan.id);

    try {
      const response = await fetch('http://localhost:8000/api/assign-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: order.orderid,
          delivery_person_id: selectedDeliveryMan.id,
          client_id: order.client_id,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error assigning delivery: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Delivery assigned:', data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error assigning delivery:', error);
      toast.error('Failed to assign delivery.');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/OrdersTable');
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
            <MenuItem onClick={() => setSelectedDeliveryMan(row)}>Assign</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  const filteredRows = deliveryMen.filter((store) =>
    store.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box m="20px">
      <Header title="Assign Order to Delivery Man" />
      <ToastContainer />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delivery Assigned</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The order has been successfully assigned to the delivery person.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt="20px">
        <Typography variant="h6">Assigning Order</Typography>
        <Typography variant="body1">Order Ref: {order.ref}</Typography>
        <Typography variant="body1">Client Name: {order.full_name}</Typography>
        <Typography variant="body1">Client Address: {order.address}</Typography>
      </Box>
      <Box mt="20px">
        <TextField
          label="Search by Delivery Man Name"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Box>
      <Box mt="20px" display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleAssign} disabled={!selectedDeliveryMan}>
          Confirm Assignment
        </Button>
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
          getRowId={(row) => row.id}
          onRowClick={(params) => setSelectedDeliveryMan(params.row)}
        />
      </Box>
    </Box>
  );
};

export default AssignOrder;
