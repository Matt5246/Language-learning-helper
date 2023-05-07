import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectedSubtitlesContent } from "./subtitlesSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

const SubtitlesList = () => {
  const contentSubtitles = useSelector(selectedSubtitlesContent);

  let rows: JSX.Element[] = [];
  if (contentSubtitles) {
    rows = contentSubtitles
      .toString()
      .split("\n")
      .map((line, index) => (
        <TableRow key={index} sx={{ padding: "8px" }}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="left">{line}</TableCell>
          <TableCell align="left">Translation</TableCell>
          <TableCell align="left">
            <IconButton aria-label="mark as known">
              <CheckCircleIcon />
            </IconButton>
            <IconButton aria-label="mark as hard">
              <HighlightOffIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
  }

  return (
    <div>
      {contentSubtitles ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Subtitle Text</TableCell>
                <TableCell>Translation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <h1>No Subtitles picked. Choose one in the profile menu </h1>
        </div>
      )}
    </div>
  );
};
export default SubtitlesList;
