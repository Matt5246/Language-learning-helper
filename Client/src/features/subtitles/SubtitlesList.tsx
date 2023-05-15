import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import { Button } from "@mui/material";

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
    if (window.confirm("Are you sure you want to delete this subtitle?")) {
      dispatch(
        subtitleLineDelete({
          selectedSubtitlesId: selectedSubtitlesId,
          id: subId,
        })
      );
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "time", headerName: "Time", editable: true, flex: 2 },
    {
      field: "line",
      headerName: "Subtitle Text",
      flex: 5,
      editable: true,
    },
    {
      field: "learned",
      headerName: "Learned",
      flex: 1,
      renderCell: (params: { row: { id: string; learned: boolean } }) => {
        const handleLearnedClick = () => {
          handleSubtitleUpdate(selectedSubtitlesId, params.row.id, {
            learned: true,
          });
        };

        return (
          <Tooltip title="Mark as known">
            <IconButton
              aria-label="Mark as known"
              disabled={params.row.learned}
              onClick={handleLearnedClick}
            >
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "hard",
      headerName: "Hard",
      flex: 1,
      editable: true,
      renderCell: (params: { row: { id: string; hard: boolean } }) => {
        const handleHardClick = () => {
          handleSubtitleUpdate(selectedSubtitlesId, params.row.id, {
            hard: true,
          });
        };

        return (
          <Tooltip title="Mark as hard">
            <IconButton
              aria-label="Mark as hard"
              disabled={params.row.hard}
              onClick={handleHardClick}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params: { row: { id: string } }) => {
        const handleDeleteClick = () => {
          handleSubtitleDelete(selectedSubtitlesId, params.row.id);
        };

        return (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const rows = contentSubtitles
    ? contentSubtitles
        .filter(sub => !sub.learned)
        .map(sub => {
          return {
            id: sub.id,
            time: sub.time,
            line: sub.line,
            learned: sub.learned,
            hard: sub.hard,
          };
        })
    : [];

  const handleDeleteSubtitles = () => {
    if (window.confirm("Are you sure you want to Delete this subtitles?")) {
      dispatch(subtitleDelete(selectedSubtitlesId));
    }
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      {contentSubtitles ? (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            checkboxSelection
            disableRowSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                toolbar: { styles: { minHeight: "50px" } },
              },
            }}
            processRowUpdate={(params: any) => {
              const line = params?.line;

              handleSubtitleUpdate(selectedSubtitlesId, params.id, {
                line: line,
              });
              return params;
            }}
            onProcessRowUpdateError={(params: any) => {
              console.log("onProcessRowUpdateError triggered:");
              console.log(params);
            }}
          />

          <Button
            variant="contained"
            color="error"
            className="w-xl-50 w-30 "
            style={{ margin: "16px" }}
            onClick={handleDeleteSubtitles}
          >
            Delete Subtitles {selectedSubtitles?.title}
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
