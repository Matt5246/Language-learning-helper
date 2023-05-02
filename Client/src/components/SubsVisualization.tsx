import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";

export default function App () {
    const storedSubtitles = localStorage.getItem("subtitles");

    let rows:JSX.Element[] = [];
    if (storedSubtitles) {
        rows = storedSubtitles.split("\n").map((line, index) => (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
            {index + 1}
            </TableCell>
            <TableCell align="left">{line}</TableCell>
        </TableRow>
        ));
    }
  return (
    <div>
      
        {storedSubtitles && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Subtitle Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </TableContainer>
        )}
      
    </div>
  );
}
