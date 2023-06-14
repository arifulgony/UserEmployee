import React, { useEffect, useState } from "react";
import CreateUserForm from "../Form/CreateUserForm";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Box
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "@material-ui/core";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
      .then((response) => {
        console.log("Users loaded successfully:", response.data);
        setUsers(response.data.readEmployeeData);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const adminUsers = users.filter((user) => user.employeeType === "Admin");
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        User List
      </Typography>
        <Button onClick={handleOpen} variant="contained" color="primary">
        Add User
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={`flex`}
            justifyContent={`space-between`}
            alignItems={`center`}
            marginBottom={`30px`}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Add User Information
            </Typography>
            <Button onClick={handleClose} variant="contained" color="error">
              Close
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <CreateUserForm></CreateUserForm>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminUsers.map((user) => (
              <TableRow key={user.empID}>
                <TableCell>{user.empID}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.employeeType}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/users/${user.empID}`}
                    variant="outlined"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTab;
