import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Typography, Tab, Tabs } from "@material-ui/core";
import UserTab from './components/Pages/UserTab';
import EmployeeTab from './components/Pages/EmployeeTab';
import EditUserModal from './components/Modal/EditUserModal';
import DetailsPage from "./components/Pages/DetailsPage";
import CreateUserForm from "./components/Form/CreateUserForm";




function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          User and Employee Management
        </Typography>
        <Tabs>
          <Tab label="User" component={Link} to="/users" />
          <Tab label="Employees" component={Link} to="/employees" />
        </Tabs>
        <Switch>
          <Route path="/" exact>
            <UserTab/>
          </Route>
          <Route path="/users" exact>
             <UserTab/>
          </Route>
          <Route path="/employees" exact>
            <EmployeeTab/>
          </Route>
          <Route path="/users/:id" exact>
          <DetailsPage/>
          </Route>
          <Route path="/users/:id/edit" exact>
            <EditUserModal />
          </Route>  
          <Route path="/form" exact>
           <CreateUserForm/>
          </Route> 
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
