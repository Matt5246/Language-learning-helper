import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import  SubsEditor  from "../services/subtitlesEditor";
import Switch from '@mui/material/Switch';

function SubtitleForm(toggleTheme: any) {
  const [subtitleText, setSubtitleText] = useState("");
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedSubs = SubsEditor(subtitleText);
    localStorage.setItem('subtitles', editedSubs);
  };
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
    >
        <Switch {...label} onChange={toggleTheme} />
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
            label="Subtitle Text"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubtitleForm;
