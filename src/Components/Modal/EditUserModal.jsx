import React, { useEffect } from "react";
import { useState } from "react";
import {  Typography, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  employeeType: Yup.string().required("Employee Type is required"),
});

const EditUserModal = () => {
  const { id } = useParams();
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`)
      .then((response) => {
        console.log("User loaded successfully:", response.data);
        setUser(response.data);
      })
       .catch(error => console.log(error));
  }, [id]);




  const handleSubmit = (values) => {
    axios
      .put(
        `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${id}`,
        values
      )
      .then((response) => {
        console.log("User updated successfully:", response.data);

      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <div>
        <div>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit User
          </Typography>
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              employeeType: user.employeeType,
              districtID: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <Field name="firstName" label="First Name" as={TextField} id="outlined-basic"  variant="outlined" margin="dense" />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <Field name="lastName" label="Last Name" as={TextField} id="outlined-basic"  variant="outlined" margin="dense" />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <Field
                  name="employeeType"
                  label="Employee Type"
                  as={TextField}
                  id="outlined-basic"  variant="outlined" margin="dense"
                />
                <ErrorMessage name="employeeType" component="div" />
              </div>
              <Button type="submit" variant="contained" color="primary" margin="dense">
                submit
              </Button>
            </Form>
          </Formik>
        </div>

    </div>
  );
};

export default EditUserModal;
