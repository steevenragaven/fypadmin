import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockDataCategories } from "../../data/mockData";
import Header from "../../components/Header";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  const handleEditCategory = () => {
    console.log("Edit category with id:", selectedCategoryId);
    handleMenuClose();
  };

  const handleDeleteCategory = () => {
    console.log("Delete category with id:", selectedCategoryId);
    handleMenuClose();
  };

  const columns = [
    { 
      field: "date_added", 
      headerName: "Date Added", 
      flex: 1, 
      cellClassName: "name-column--cell" 
    },
    { 
      field: "category_id", 
      headerName: "Category ID" 
    },
    {
      field: "category_name",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "item_image",
      headerName: "Item Image",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <img src={`./${row.item_image}`} alt="category" style={{ width: 50, height: 50, objectFit: "cover" }} />
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedCategoryId === row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditCategory}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteCategory}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Categories" />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-category")}
        >
          Add Category
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataCategories} columns={columns} />
      </Box>
    </Box>
  );
};

export default Categories;
