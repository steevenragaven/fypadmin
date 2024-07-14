import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChatIcon from '@mui/icons-material/Chat';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, userType, handleLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  useEffect(() => {
    setSelected('Dashboard');
  }, [userType]);

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${theme.palette.mode === 'light' ? colors.sidebarBackground.main : colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  Logo
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            {userType === 'admin' && (
              <>
                <Item
                  title="Dashboard"
                  to="/admin-dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Data
                </Typography>
                <Item
                  title="Products"
                  to="/products"
                  icon={<RamenDiningOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Users"
                  to="/users"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Stores"
                  to="/stores"
                  icon={<StorefrontOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Categories"
                  to="/categories"
                  icon={<EmojiFoodBeverageIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Orders"
                  to="/OrdersTable"
                  icon={<LocalMallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Deliveries"
                  to="/deliveries"
                  icon={<LocalMallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Delivery Personal"
                  to="/deliverypersonal"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Store Creation"
                  to="/form"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Chat"
                  to="/chat"
                  icon={<ChatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {userType === 'storemanager' && (
              <>
                <Item
                  title="Dashboard"
                  to="/manager-dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Management
                </Typography>
                <Item
                  title="Products"
                  to="/products"
                  icon={<RamenDiningOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Stores"
                  to="/stores"
                  icon={<StorefrontOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {userType === 'deliveryman' && (
              <>
                <Item
                  title="Dashboard"
                  to="/delivery-dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                >
                  Deliveries
                </Typography>
                <Item
                  title="My Deliveries"
                  to="/deliveries"
                  icon={<LocalMallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            <Item
              title="Logout"
              to="/login"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => {
                console.log('Logout clicked');
                handleLogout();
              }}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
