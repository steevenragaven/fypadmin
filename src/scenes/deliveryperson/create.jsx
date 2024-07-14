import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const CreatePersonnel = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [personnel, setPersonnel] = useState({
    date_started: '',
    name: '',
    address: '',
    age: '',
    contact_number: '',
    license_number: '',
    car_plate_assigned: '',
    order_count_today: 0,
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnel((prevPersonnel) => ({
      ...prevPersonnel,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/create-personnel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personnel),
      });
      if (!response.ok) {
        throw new Error(`Error creating personnel: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('New personnel created:', data);
      navigate('/');
    } catch (error) {
      console.error('Error creating personnel:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Delivery Personnel" />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="20px" mt="20px">
          <TextField
            label="Date Started"
            variant="outlined"
            name="date_started"
            value={personnel.date_started}
            onChange={handleChange}
          />
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={personnel.name}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={personnel.address}
            onChange={handleChange}
          />
          <TextField
            label="Age"
            variant="outlined"
            name="age"
            value={personnel.age}
            onChange={handleChange}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            name="contact_number"
            value={personnel.contact_number}
            onChange={handleChange}
          />
          <TextField
            label="License Number"
            variant="outlined"
            name="license_number"
            value={personnel.license_number}
            onChange={handleChange}
          />
          <TextField
            label="Car Plate Assigned"
            variant="outlined"
            name="car_plate_assigned"
            value={personnel.car_plate_assigned}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={personnel.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={personnel.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreatePersonnel;
