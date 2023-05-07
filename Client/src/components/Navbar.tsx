import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllSubtitles,
  selectSubtitles,
  subtitlesAdded,
} from "../features/subtitles/subtitlesSlice";
import { useDispatch } from "react-redux";
import { toggleBackgroundColor } from "../features/background/backgroundSlice";
import { useAuth } from "../contexts/AuthContext";
import { SettingsList } from "../types";

const pages = [
  { name: "Translator", path: "/" },
  { name: "Visualizer", path: "/SubsVisualization" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [selectedSubtitle, setSelectedSubtitle] = React.useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, logout, saveSubtitles, loadSubtitles } = useAuth();
  const storedSubtitles = useSelector(selectAllSubtitles);
  async function LoadSubtitlesFromFirestore() {
    const subtitle = await loadSubtitles();
    dispatch(subtitlesAdded(subtitle!));
  }

  const settings: SettingsList = [
    { name: "Theme", action: () => dispatch(toggleBackgroundColor()) },
    { name: "Load", action: () => LoadSubtitlesFromFirestore() },
  ];

  if (currentUser) {
    settings.push(
      { name: currentUser?.email },
      {
        name: "Save",
        action: () =>
          // @ts-ignore
          saveSubtitles(storedSubtitles)
            .then(() => console.log("Subtitles saved successfully"))
            .catch(error => console.error("Failed to save subtitles:", error)),
      },
      { name: "Logout", action: () => logout() }
    );
  } else {
    settings.push(
      { name: "Login", action: () => navigate("/account/signin") },
      { name: "Register", action: () => navigate("/account/signup") }
    );
  }
  const subtitles = storedSubtitles.map(subtitle => ({
    name: subtitle.title,
    action: () => (
      dispatch(selectSubtitles(subtitle.id!)),
      setSelectedSubtitle(subtitle.title),
      navigate("/SubsVisualization")
    ),
  }));
  if (subtitles) {
    settings.push(...subtitles);
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ userSelect: "none" }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(page => (
                <MenuItem>
                  <Link
                    key={page.name}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.3rem",
            }}
          >
            {pages.map(page => (
              <Link
                key={page.name}
                className="my-2 mx-2"
                to={page.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {page.name}
              </Link>
            ))}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.3rem",
            }}
          >
            {selectedSubtitle}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting.name} onClick={setting.action}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
