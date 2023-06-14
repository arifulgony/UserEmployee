import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const DetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`)
      .then((response) => {
        console.log("Users loaded successfully:", response.data);
        setUser(response.data.readEmployeeData);
      })
      .catch((error) => {
        console.error("Error loading user:", error);
      });
  }, [id]);





  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
 
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        User Details
      </Typography>
      {user.map(user => (<div key={user.empID}>  
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        ID: {user.empID}
        </Typography>
        <Typography>First Name: {user.firstName}</Typography>
      <Typography>Last Name: {user.lastName}</Typography>
      <Typography>Employee Type: {user.employeeType}</Typography>
      </CardContent>
      <CardActions>
      <Link to={`/users/${user.empID}/edit`}>
      <Button variant="outlined" color="primary">
       Edit
       </Button>
      </Link>
      </CardActions>
    </Card>
      
       </div> ))}
      
    </div>
  );
};

export default DetailsPage;
