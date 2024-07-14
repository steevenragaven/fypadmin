import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, TextField, useTheme, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [filterText, setFilterText] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/orders');
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder({});
  };

  const handleAssignOrder = () => {
    navigate(`/assign-order/${selectedOrder.orderid}`, { state: { order: selectedOrder } });
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'On Way':
        return 'info';
      case 'Delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns = [
    { field: 'orderid', headerName: 'Order ID', flex: 1 },
    { field: 'userid', headerName: 'User ID' },
    { field: 'totalprice', headerName: 'Total Price', flex: 1, renderCell: ({ value }) => `$${parseFloat(value).toFixed(2)}` },
    { field: 'orderdate', headerName: 'Order Date', flex: 1, renderCell: ({ value }) => new Date(value).toLocaleString() },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: ({ value }) => <Chip label={value} color={getStatusColor(value)} /> },
    { field: 'ref', headerName: 'Reference', flex: 1 },
    { field: 'full_name', headerName: 'Client Name', flex: 1 },
    { field: 'address', headerName: 'Client Address', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton onClick={(event) => handleMenuOpen(event, row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedOrder.orderid === row.orderid} onClose={handleMenuClose}>
            <MenuItem onClick={handleAssignOrder}>Assign</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  const filteredRows = orders.filter((order) => order.ref?.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <Box m="20px">
      <Header title="Orders" />
      <ToastContainer />
      <Box mt="20px">
        <TextField label="Search by Reference" variant="outlined" fullWidth value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      </Box>
      <Box mt="20px" height="75vh" sx={{
        '& .MuiDataGrid-root': { border: 'none' },
        '& .MuiDataGrid-cell': { borderBottom: 'none' },
        '& .name-column--cell': { color: colors.greenAccent[300] },
        '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.blueAccent[700], borderBottom: 'none' },
        '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
        '& .MuiDataGrid-footerContainer': { borderTop: 'none', backgroundColor: colors.blueAccent[700] },
        '& .MuiCheckbox-root': { color: `${colors.greenAccent[200]} !important` },
      }}>
        <DataGrid checkboxSelection rows={filteredRows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50]} pagination sortingOrder={['asc', 'desc']} getRowId={(row) => row.orderid} />
      </Box>
    </Box>
  );
};

export default OrdersTable;
