import React, { useEffect, useState } from "react";
import "./reports.css";
import axios from "axios";
import { Gallery } from "../../components/interfaces";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

interface Report {
  events: ReportEvent[];
  gallery: Gallery;
  totalOpenCount: number;
}

interface ReportEvent {
  email: string;
  date: number;
}

function Row(props: { row: Report }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.gallery.name}
        </TableCell>

        <TableCell align="right">{row.totalOpenCount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Guest Email</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.events.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.email}
                      </TableCell>

                      <TableCell align="right">{historyRow.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Reports() {
  const [reportsArray, setReportsArray] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/reports/myreports", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: localStorage.getItem("authUserId") },
      })
      .then((res) => {
        
        setReportsArray(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <div className="reports-wrapper">
      <div className="reports-window">
        <div className="reports-close">
          <Link to="/dashboard">
            <CloseIcon fontSize="large" />
          </Link>
        </div>
        <div className="reports-table">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Gallery Name</TableCell>
                  <TableCell align="right">Total Views</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportsArray.map((row: Report) => (
                  <Row key={row.gallery.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
