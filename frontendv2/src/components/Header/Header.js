import { useState } from "react";
import {
  DialogActions,
  DialogTitle,
  Stack,
  DialogContent,
  TextField,
  Dialog,
  AppBar,
  Button,
  Toolbar,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { fetchDonationsAction } from "../../store/slices/donation";
import { createDonation } from "../../api/donations";
import logoImage from "../../assets/images/home.png";

export function Header() {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
    navigate("/userprofile");
  };

  const handleAdminMenuClose = () => {
    setProfileMenuAnchor(null);
    navigate("/");
  };

  const handleClickCreate = () => {
    setShowCreateDialog(true);
  };

  const handleCloseCreate = () => {
    setShowCreateDialog(false);
  };

  const navigateToChats = () => {
    navigate("/chatlist");
  };

  const navigateToClaims = () => {
    navigate("/claimsv2");
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleCreate = async () => {
    setCreateLoading(true);
    createDonation(title, category)
      .then(() => {
        dispatch(fetchDonationsAction());
        setShowCreateDialog(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setCreateLoading(false));
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          px: 4,
        }}
        className={`${styles.header}`}
        style={{ backgroundColor: "#361d32", padding: "15px" }}
      >
        <Toolbar>
          <div className="nav-logo-img">
            <img
              src={logoImage}
              alt="img"
              style={{ width: "55px", height: "auto" }}
            />
          </div>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Button onClick={() => navigate("/")}>
                <Typography variant="h6" sx={{ color: "text.navbar" }}>
                  Donate What Where
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClickCreate}
                variant="h6"
                sx={{ color: "text.navbar", borderRight: "1px solid white" }}
              >
                <AddIcon />
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                sx={{ color: "text.navbar", fontSize: "18px" }}
              >
                My Donations
              </Button>
              <Button
                onClick={navigateToChats}
                variant="h6"
                sx={{ color: "text.navbar" }}
              >
                <ChatIcon />
              </Button>
              <Button
                onClick={navigateToClaims}
                variant="h6"
                sx={{ color: "text.navbar" }}
              >
                <CheckBoxIcon />
              </Button>
              <Button onClick={handleProfileMenuOpen}>
                <AccountCircleIcon
                  sx={{ color: "white" }}
                  src="/broken-image.jpg"
                />
              </Button>
            </Grid>
          </Grid>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem spacing={2} onClick={handleAdminMenuClose}>
              <Typography variant="body1">Admin Console</Typography>
            </MenuItem>
            <Divider color="divider" variant="middle" />
            <MenuItem spacing={2} onClick={handleProfileMenuClose}>
              <Typography variant="body1">Profile</Typography>
            </MenuItem>
            <Divider color="divider" variant="middle" />
            <MenuItem spacing={2}>
              <Typography variant="body1">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog fullWidth open={showCreateDialog} onClose={handleCloseCreate}>
        <DialogTitle sx={{ backgroundColor: "primary.main", py: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ color: "white" }}
          >
            <Typography variant="h6" color="text.navbar">
              Create donation
            </Typography>
            <Button onClick={handleCloseCreate}>
              <CloseIcon sx={{ color: "white" }} />
            </Button>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: "20px !important", pb: 0 }}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    value={title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Category"
                    value={category}
                    onChange={(event) =>
                      handleCategoryChange(event.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseCreate}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            sx={{ backgroundColor: "primary.main" }}
            loading={createLoading}
            onClick={handleCreate}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
