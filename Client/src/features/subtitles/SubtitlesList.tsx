import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllSubtitles,
  subtitleLineDelete,
  subtitleDelete,
  updateSubsObject,
  selectedSubtitlesContent,
} from "./subtitlesSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubsObject } from "../../types";
import { Tooltip } from "@mui/material";
import { SubtitlesState } from "./subtitlesSlice";

const SubtitlesList = () => {
  const contentSubtitles = useSelector(selectedSubtitlesContent);
  const dispatch = useDispatch();
  const allSubtitles = useSelector(selectAllSubtitles);
  const selectedSubtitlesId = useSelector(
    (state: { subtitles: SubtitlesState }) => state.subtitles.selectedSubtitles!
  );
  const selectedSubtitles = allSubtitles.find(
    subtitle => subtitle.id === selectedSubtitlesId
  );

  const handleSubtitleUpdate = (
    selectedSubtitlesId: string,
    subId: string,
    updatedFields: Partial<SubsObject>
  ) => {
    dispatch(
      updateSubsObject({
        selectedSubtitlesId: selectedSubtitlesId,
        id: subId,
        ...updatedFields,
      })
    );
  };
  const handleSubtitleDelete = (selectedSubtitlesId: string, subId: string) => {
    dispatch(
      subtitleLineDelete({
        selectedSubtitlesId: selectedSubtitlesId,
        id: subId,
      })
    );
  };

  let rows: JSX.Element[] = [];
  if (contentSubtitles) {
    rows = contentSubtitles
      .filter(sub => !sub.learned)
      .map((sub: SubsObject, index: number) => (
        <TableRow key={index} sx={{ padding: "8px" }}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="left">{sub.time}</TableCell>
          <TableCell align="left">{sub.line}</TableCell>
          <TableCell align="left">
            <Tooltip title="Mark as known">
              <IconButton
                aria-label="mark as known"
                onClick={() =>
                  handleSubtitleUpdate(selectedSubtitlesId, sub.id, {
                    learned: true,
                  })
                }
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mark as hard">
              <IconButton
                aria-label="mark as hard"
                onClick={() =>
                  handleSubtitleUpdate(selectedSubtitlesId, sub.id, {
                    hard: true,
                  })
                }
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell align="left">
            <Tooltip title="Delete subtitle">
              <IconButton
                aria-label="delete subtitle"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this subtitle?"
                    )
                  ) {
                    handleSubtitleDelete(selectedSubtitlesId, sub.id);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ));
  }

  return (
    <div>
      {contentSubtitles ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{selectedSubtitles?.title! || "#"}</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Subtitle Text</TableCell>
                  <TableCell>Learned Hard</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="error"
            className="w-xl-50 w-30 "
            style={{ display: "block", margin: "0 auto" }}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to Delete this subtitles?"
                )
              ) {
                dispatch(subtitleDelete(selectedSubtitlesId));
              }
            }}
          >
            Delete Subtitles
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <h1>No Subtitles picked. Choose one in the profile menu </h1>
        </div>
      )}
    </div>
  );
};

export default SubtitlesList;
