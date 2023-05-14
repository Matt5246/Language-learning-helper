import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SubsEditor from "../services/subtitlesEditor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { subtitlesAdded } from "../features/subtitles/subtitlesSlice";

function SubtitleForm() {
  const [subtitleText, setSubtitleText] = useState("");
  const [subtitleName, setSubtitleName] = useState("");

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedSubs = SubsEditor(subtitleText);
    const subtitlesData = {
      subtitles: [
        {
          title: subtitleName,
          content: editedSubs,
        },
      ],
    };
    //localStorage.setItem(subtitleName, JSON.stringify(editedSubs));
    if (subtitleText && subtitleName) {
      dispatch(subtitlesAdded(subtitlesData.subtitles));
      navigate("/SubsVisualization");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="p-5"
        style={{
          width: "50%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          minWidth: "300px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            id="subtitles-name"
            label="Subtitles name"
            multiline
            rows={1}
            value={subtitleName}
            onChange={event => setSubtitleName(event.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="subtitles-text"
            label="YT Subtitles Text"
            multiline
            rows={10}
            value={subtitleText}
            onChange={event => setSubtitleText(event.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1rem" }}
          />

          <div className="text-center pt-4">
            <Button
              variant="contained"
              type="submit"
              className="w-xl-50 w-30"
              sx={{ width: "200px", marginRight: "1rem", padding: "6px" }}
            >
              Translate
            </Button>
            <Button
              className="mt-2 mt-xl-0 w-30"
              variant="contained"
              onClick={() => {
                navigator.clipboard.readText().then(text => {
                  setSubtitleText(text);
                });
              }}
            >
              Paste from Clipboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubtitleForm;
