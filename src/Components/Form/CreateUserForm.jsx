import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

const CreateUserForm = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionId, setDivisionId] = useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employeeType: "",
      divisionId: 0,
      districeID: 0,
    },
    onSubmit: (values) => {
      sendData(values);
    },
  });

  const divisionIdHandler = (e, divID) => {
    e.preventDefault();
    setDivisionId(divID);
    formik.setFieldValue("divisionId", divID);
  };

  useEffect(() => {
    axios.get("http://59.152.62.177:8085/api/Employee/Division").then((res) => {
      console.log(res.data.readDivisionData);
      setDivisions(res.data.readDivisionData);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/District/${divisionId}`)
      .then((res) => {
        console.log(res.data.readDistrictData);
        setDistricts(res.data.readDistrictData);
      });
  }, [divisionId]);

  const sendData = (data) => {
    axios
      .post("http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation", data)
      .then((response) => {
        console.log(response.data);
        alert("Success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={`flex`}
          justifyContent={`center`}
          alignItems={`center`}
          sx={{ gap: "20px" }}
        >
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
        <Box
          mt={`20px`}
          display={`flex`}
          justifyContent={`space-between`}
          sx={{ gap: "20px" }}
        >
          <Box width={"50%"}>
            <InputLabel id="demo-simple-select-label">Division</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Division"
              name="divisionId"
              value={formik.values.divisionId}
              onChange={formik.handleChange}
            >
              {divisions.map((division, idx) => (
                <MenuItem
                  value={division.divID}
                  key={idx}
                  onClick={(e) => divisionIdHandler(e, division.divID)}
                >
                  {division.divisionName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width={"50%"}>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="District"
              name="districeID"
              value={formik.values.districeID}
              onChange={formik.handleChange}
            >
              {districts.map((district, idx) => (
                <MenuItem
                  onClick={(e) => formik.setFieldValue("districeID", district.districtID)}
                  value={district.districtID}
                  key={idx}
                >
                  {district.districtName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <FormControl sx={{ mt: "20px" }}>
          <FormLabel id="demo-radio-buttons-group-label">User Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Employee"
            name="employeeType"
            value={formik.values.employeeType}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              label="Employee"
              value="Employee"
              control={<Radio />}
            />
            <FormControlLabel label="Admin" value="Admin" control={<Radio />} />
          </RadioGroup>
        </FormControl>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateUserForm;