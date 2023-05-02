import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import  SubsEditor  from "../services/subtitlesEditor";

function SubtitleForm() {
  const [subtitleText, setSubtitleText] = useState("");
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedSubs = SubsEditor(subtitleText);
    localStorage.setItem('subtitles', editedSubs);
  };
  
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
    >
      
      <div
        className="p-5"
        style={{
          width: "50%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            id="subtitle-text"
            label="YT Subtitle Text"
            multiline
            rows={10}
            value={subtitleText}
            onChange={(event) => setSubtitleText(event.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1rem", minWidth: "100px" }}
          />

          <div className="text-center pt-4">
            <Button variant="contained" type="submit" sx={{ width: "50%", minWidth: "100px"}}>
              Translate
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: "1rem" }}
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
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
