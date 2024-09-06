import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import apiRequest from "../apiRequest.jsx";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState("mine");

  useEffect(() => {
    fetchAppointments(page);
  }, [page]);

  const fetchAppointmentsDr = async (page) => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: "http://127.0.0.1:8000/api/appointment/dr/",
        params: { page: page },
      });
      if (response) {
        setAppointments(response.data.results);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchAppointments = async (page) => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: "http://127.0.0.1:8000/api/appointment/",
        params: { page: page },
      });
      if (response) {
        setAppointments(response.data.results);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
    if (value === "dr") {
      fetchAppointmentsDr(page);
    } else {
      fetchAppointments(page);
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "1000px",
        boxSizing: "border-box",
        px: { xs: "10px", sm: "30px", md: "50px", lg: "60px", xl: "80px" },
        pt: { xs: "20px", sm: "30px", md: "40px", lg: "50px", xl: "64px" },
      }}
    >
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">انتخاب ها</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {localStorage.getItem("is_doctor") === "true" && (
            <FormControlLabel
              sx={{
                color:"black"
              }}
              value="dr"
              control={<Radio />}
              label="نوبت های مطب من"
            />
          )}
          <FormControlLabel
            value="mine"
            sx={{
                color:"black"
              }}
            control={<Radio />}
            label="نوبت های من"
          />
        </RadioGroup>
      </FormControl>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>National ID</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patient_first_name}</TableCell>
                  <TableCell>{appointment.patient_last_name}</TableCell>
                  <TableCell>{appointment.patient_phone_number}</TableCell>
                  <TableCell>{appointment.patient_national_id}</TableCell>
                  <TableCell>{appointment.patient_gender}</TableCell>
                  <TableCell>
                    دکتر {appointment.provider.user.first_name}{" "}
                    {appointment.provider.user.last_name}
                  </TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Paper>
    </Box>
  );
};

export default AppointmentTable;
