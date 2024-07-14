import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar"; // Use the unified Sidebar
import AdminDashboard from "./scenes/dashboard/admin";
import Products from "./scenes/products/index";
import Categories from "./scenes/categories/index";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Users from "./scenes/users";
import Stores from "./scenes/stores";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import CreateCategory from "./scenes/categories/create";
import AddProductForm from "./scenes/products/create";
import ChatBox from "./scenes/ChatItem/ChatBox";
import ChatList from "./scenes/ChatItem/ChatList";
import Deliverypersonal from "./scenes/deliveryperson/index";
import CreatePersonnel from "./scenes/deliveryperson/create";
import Deliveries from "./scenes/deliveries/mydeliveries";
import OrderDetails from "./scenes/deliveries/OrderDetails";
import ManagerDashboard from "./scenes/dashboard/manager";
import DeliveryDashboard from "./scenes/dashboard/deliveryman";
import LoginForm from "./scenes/login";
import { useAuthContext } from "./hooks/AuthProvider";
import OrdersTable from "./scenes/orders/admin";
import AssignOrder from "./scenes/orders/AssignOrder";
import Chats from "./scenes/chat/chat";
const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAuthenticated, userType, login, logout } = useAuthContext();
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  const handleLogin = (type) => {
    login(type);
    setKey((prevKey) => prevKey + 1);
  };

  const handleLogout = () => {
    logout();
    setKey((prevKey) => prevKey + 1);
    navigate('/');
  };

  useEffect(() => {
    console.log("App component state:", { isAuthenticated, userType, key });
  }, [isAuthenticated, userType, key]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" key={key}>
          {isAuthenticated ? (
            <>
              <Sidebar isSidebar={isSidebar} userType={userType} handleLogout={handleLogout} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                  <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/create-personnel" element={<CreatePersonnel />} />
                  <Route path="/deliveries" element={<Deliveries />} />
                  <Route path="/deliverypersonal" element={<Deliverypersonal />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/OrdersTable" element={<OrdersTable />} />
                  <Route path="/assign-order/:orderid" element={<AssignOrder />} />
                  <Route path="/delivery-personnel" element={<Deliverypersonal />} /> // Assuming you have this route
                  <Route path="/chat" component={Chats} />

                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/create-category" element={<CreateCategory />} />
                  <Route path="/create-product" element={<AddProductForm />} />
                  <Route path="/chat" element={<ChatList />} />
                  <Route path="/order-details/:orderId" element={<OrderDetails />} />
                  <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />

                  
                </Routes>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
              <Route path="*" element={<LoginForm handleLogin={handleLogin} />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
