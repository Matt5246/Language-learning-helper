import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SubtitleForm() {
  const [subtitleText, setSubtitleText] = useState("");
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(subtitleText);
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
