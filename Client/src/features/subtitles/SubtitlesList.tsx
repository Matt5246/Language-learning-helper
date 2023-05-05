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

const SubtitlesList = () => {
  const contentSubtitles = useSelector(selectedSubtitlesContent);

  let rows: JSX.Element[] = [];
  if (contentSubtitles) {
    rows = contentSubtitles
      .toString()
      .split("\n")
      .map((line, index) => (
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
      {contentSubtitles ? (
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
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <h1>No Subtitles picked. Choose one in the profile menu</h1>
        </div>
      )}
    </div>
  );
};
export default SubtitlesList;
