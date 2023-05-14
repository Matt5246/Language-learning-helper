import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleBackgroundColor } from "../features/background/backgroundSlice";
import { SettingsList } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { subtitlesAdded } from "../features/subtitles/subtitlesSlice";
import { selectAllSubtitles } from "../features/subtitles/subtitlesSlice";
import { selectSubtitles } from "../features/subtitles/subtitlesSlice";
import { MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect } from "react";

function Settings() {
  // use the settings object here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, logout, saveSubtitles, loadSubtitles } = useAuth();
  const storedSubtitles = useSelector(selectAllSubtitles);
  //   useEffect(() => {
  //     async function loadSubtitlesFromFirestore() {
  //       const subtitlesFromFirestore = await loadSubtitles();
  //       const storedSubtitlesIds = storedSubtitles.map(subtitle => subtitle.id);
  //       const allSubtitlesExist = subtitlesFromFirestore?.every(subtitle =>
  //         storedSubtitlesIds.includes(subtitle.id)
  //       );
  //       console.log("allSubtitlesExist: ", allSubtitlesExist);
  //       if (allSubtitlesExist) {
  //         console.log("All subtitles already exist in store.");
  //       } else if (subtitlesFromFirestore !== null) {
  //         dispatch(subtitlesAdded(subtitlesFromFirestore!));
  //       }
  //     }
  //     loadSubtitlesFromFirestore();
  //   }, [dispatch, loadSubtitles, storedSubtitles]);
  async function loadSubtitlesFromFirestore() {
    const subtitlesFromFirestore = await loadSubtitles();
    const storedSubtitlesIds = storedSubtitles.map(subtitle => subtitle.id);
    const allSubtitlesExist = subtitlesFromFirestore?.every(subtitle =>
      storedSubtitlesIds.includes(subtitle.id)
    );
    console.log("allSubtitlesExist: ", allSubtitlesExist);
    if (allSubtitlesExist) {
      console.log("All subtitles already exist in store.");
    } else if (subtitlesFromFirestore !== null) {
      dispatch(subtitlesAdded(subtitlesFromFirestore!));
    }
  }
  const settings: SettingsList = [
    {
      name: "Theme",
      key: "theme",
      action: () => dispatch(toggleBackgroundColor()),
    },
  ];

  if (currentUser) {
    settings.push(
      { name: currentUser?.email, key: "email" },
      { name: "Load", key: "load", action: () => loadSubtitlesFromFirestore() },
      {
        name: "Save",
        key: "save",
        action: () => {
          if (
            window.confirm(
              "Are you sure you want to save the subtitles? it may alter your previous subtitles!"
            )
          ) {
            saveSubtitles(storedSubtitles)
              .then(() => console.log("Subtitles saved successfully"))
              .catch(error =>
                console.error("Failed to save subtitles:", error)
              );
          }
        },
      },
      {
        name: "Logout",
        key: "logout",
        action: () => logout(),
      }
    );
  } else {
    settings.push(
      {
        name: "Login",
        key: "login",
        action: () => navigate("/account/signin"),
      },
      {
        name: "Register",
        key: "register",
        action: () => navigate("/account/signup"),
      }
    );
  }
  const subtitles = storedSubtitles.map(subtitle => ({
    name: subtitle.title,
    key: subtitle.id!,
    action: () => (
      dispatch(selectSubtitles(subtitle.id!)), navigate("/SubsVisualization")
    ),
  }));
  if (subtitles) {
    settings.push(...subtitles);
  }
  return (
    <>
      {settings.map(setting => (
        <MenuItem key={setting.key} onClick={setting.action}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      ))}
    </>
  );
}

export default Settings;
