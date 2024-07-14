import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Header from '../../components/Header';

const CustomCard = styled(Card)(({ theme }) => ({
  marginBottom: '20px',
  backgroundColor: theme.palette.background.paper,
}));

const CustomIcon = styled('div')({
  verticalAlign: 'bottom',
  marginRight: '8px',
  display: 'inline-flex',
});

const CustomButton = styled(Button)({
  marginTop: '20px',
});

const CustomAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.error.contrastText,
}));

const OrderDetails = () => {
  const { orderId } = useParams();
  console.log('OrderDetails component loaded with orderId:', orderId);

  const mockDataDeliveries = [
    {
      id: 1,
      deadline: '14/01/2024',
      order_id: '1',
      customer_name: 'Marjorie Jolie',
      address: '13 Brown Sequard Street, Quatre Bornes',
      time: '11/06/2024 17:00',
      code: '---',
      status: 'ASSIGNED',
      latitude: -20.2633,
      longitude: 57.4791,
    },
    {
      id: 2,
      deadline: '14/01/2024',
      order_id: '2',
      customer_name: 'Yves LeBeau',
      address: 'F. Bonnefin Street, Grand Baie',
      time: '10/06/2024 13:00',
      code: '---',
      status: 'PENDING',
      latitude: -20.0154,
      longitude: 57.5875,
    },
    {
      id: 3,
      deadline: '15/05/2024',
      order_id: '3',
      customer_name: 'Luke Skywalker',
      address: 'Morcellement St. Andre, Curepipe',
      time: '11/06/2024 15:30',
      code: '---',
      status: 'ASSIGNED',
      latitude: -20.3177,
      longitude: 57.5260,
    },
    {
      id: 4,
      deadline: '15/05/2024',
      order_id: '4',
      customer_name: 'Homer Simpson',
      address: '10 Rose Avenue, Rose Hill',
      time: '11/06/2024 15:00',
      code: 'PLO500',
      status: 'DONE',
      latitude: -20.2427,
      longitude: 57.4693,
    },
    // Add more data as needed
  ];

  useEffect(() => {
    if (orderId) {
      console.log('Searching for order with ID:', orderId);
    } else {
      console.error('No orderId found in URL parameters');
    }
  }, [orderId]);

  const order = mockDataDeliveries.find((order) => {
    console.log('Checking order:', order);
    return order.order_id === orderId;
  });

  if (!order) {
    console.error('Order not found with ID:', orderId);
  } else {
    console.log('Order found:', order);
  }

  const handleOpenGoogleMaps = () => {
    if (order.latitude && order.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`;
      console.log('Opening Google Maps with URL:', url);
      window.open(url, '_blank');
    } else {
      console.error('No valid latitude and longitude provided for order:', order);
      alert('Location not available. No valid latitude and longitude provided.');
    }
  };

  return (
    <Box m="20px">
      <Header title={`Order Details for Order #${orderId}`} />
      {order ? (
        <Box mt="20px">
          <CustomCard>
            <CardContent>
              <Typography variant="h6">
                <CustomIcon>
                  <PersonIcon />
                </CustomIcon>
                Customer Name: {order.customer_name}
              </Typography>
              <Typography variant="h6">
                <CustomIcon>
                  <ScheduleIcon />
                </CustomIcon>
                Order Number: {order.order_id}
              </Typography>
              <Typography variant="h6">
                <CustomIcon>
                  <LocationOnIcon />
                </CustomIcon>
                Address: {order.address}
              </Typography>
              <Typography variant="h6">
                <CustomIcon>
                  <ScheduleIcon />
                </CustomIcon>
                Time: {order.time}
              </Typography>
              <CustomButton
                variant="contained"
                color="primary"
                onClick={handleOpenGoogleMaps}
              >
                Open Location in Google Maps
              </CustomButton>
            </CardContent>
          </CustomCard>
        </Box>
      ) : (
        <CustomAlert severity="error">Order not found</CustomAlert>
      )}
    </Box>
  );
};

export default OrderDetails;
