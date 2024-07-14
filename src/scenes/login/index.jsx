import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme, Paper, Avatar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens } from "../../theme";

const LoginForm = ({ handleLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [userType, setUserType] = useState('admin');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === userType && credentials.password === userType) {
      handleLogin(userType);
    } else {
      alert('Invalid credentials, please try again');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={colors.primary[500]}>
      <Paper elevation={10} sx={{ padding: '40px 30px', borderRadius: '15px', backgroundColor: colors.primary[400], textAlign: 'center' }}>
        <Avatar sx={{ margin: '0 auto', backgroundColor: colors.greenAccent[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" color={colors.grey[100]} gutterBottom>
          Login
        </Typography>
        <Typography variant="h6" color={colors.grey[300]} gutterBottom>
          Please enter your credentials
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={handleUserTypeChange}
          sx={{ marginBottom: '20px' }}
        >
          <ToggleButton value="admin">Admin</ToggleButton>
          <ToggleButton value="storemanager">Store Manager</ToggleButton>
          <ToggleButton value="deliveryman">Deliveryman</ToggleButton>
        </ToggleButtonGroup>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            sx={{
              marginBottom: '20px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.greenAccent[400],
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.greenAccent[500],
                },
              },
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            sx={{
              marginBottom: '20px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.greenAccent[400],
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.greenAccent[500],
                },
              },
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
              padding: '10px 0',
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
