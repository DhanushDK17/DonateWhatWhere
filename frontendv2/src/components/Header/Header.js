import { useEffect, useState } from "react";
import {
  InputAdornment,
  IconButton,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchDonationsAction } from "../../store/slices/donation";
import {
  createDonation,
  generateDescription,
  uploadImageToDonation,
} from "../../api/donations";
import { getUser, resetUserData } from "../../store/slices/user";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import logoImage from "../../assets/images/home.png";

export function Header() {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [helpMenuAnchor, setHelpMenuAnchor] = useState(null);
  const user = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const placeHolder =
    "https://content.hostgator.com/img/weebly_image_sample.png";

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleHelpMenuClose = () => {
    setHelpMenuAnchor(null);
  };

  const handleAdminMenuClose = () => {
    setProfileMenuAnchor(null);
    navigate("/");
  };

  const handleClickCreate = () => {
    if (user.user_type === "PERSONAL") {
      setShowCreateDialog(true);
    } else {
      setShowCreateDialog(true);
    }
  };

  const handleCloseCreate = () => {
    setShowCreateDialog(false);
  };

  const navigateToChats = () => {
    navigate("/chatlist");
  };

  const navigateToClaims = () => {
    navigate("/claims");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCreate = async () => {
    try {
      setCreateLoading(true);
      const createdDonation = await createDonation(
        title,
        category,
        description
      );
      const updatedDonation = await uploadImageToDonation(
        image,
        createdDonation.id
      );
      dispatch(fetchDonationsAction());
      resetData();
      setShowCreateDialog(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateLoading(false);
    }
  };

  const resetData = () => {
    setAddress("");
    setCategory("");
    setDescription("");
    setTitle("");
    setImage("");
    setPreviewUrl("");
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleOpenPage = (page) => {
    console.log(page);
    navigate(`/${page}`);
    handleProfileMenuClose();
  };
  const handleHelpMenuOpen = (event) => {
    setHelpMenuAnchor(event.currentTarget);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleGenerateDescription = () => {
    setDescriptionLoading(true);
    generateDescription(image)
      .then((data) => {
        setDescription(data.description);
      })
      .catch((error) => console.error(error))
      .finally(() => setDescriptionLoading(false));
  };

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setPreviewUrl(imageUrl);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(resetUserData());
    navigate("/login");
    handleProfileMenuClose();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSupport = () => {
    setHelpMenuAnchor(null);
    navigate("/support");
  };

  const handleAbout = () => {
    setHelpMenuAnchor(null);
    navigate("/about");
  };

  const handleFAQ = () => {
    setHelpMenuAnchor(null);
    navigate("/faq");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          px: 4,
        }}
        className={`${styles.header}`}
        style={{ backgroundColor: "#361d32", padding: "18px" }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center">
              <Grid item>
                <img
                  src={logoImage}
                  alt="img"
                  style={{ width: "55px", height: "auto" }}
                />
              </Grid>
              <Grid item>
                <Button onClick={() => navigate("/")}>
                  <Typography
                    variant="h6"
                    sx={{ color: "text.navbar", fontSize: "24px" }}
                  >
                    Donate What Where
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{ color: "text.navbar", ml: 2 }}
                  >
                    {user.email}
                    {user.user_type}
                  </Typography>
                </Button>
              </Grid>
            </Stack>
            {Object.keys(user).length > 0 && (
              <>
                <Grid item>
                  {user.user_type === "PERSONAL" && (
                    <Button
                      onClick={handleClickCreate}
                      variant="h6"
                      sx={{
                        color: "text.navbar",
                        borderRight: "1px solid white",
                      }}
                    >
                      <AddIcon />
                    </Button>
                  )}
                  {user.user_type === "PERSONAL" && (
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/donations")}
                      sx={{ color: "text.navbar" }}
                    >
                      My Donations
                    </Button>
                  )}
                  {user.user_type === "ORGANIZATION" && (
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/events")}
                      sx={{ color: "text.navbar" }}
                    >
                      My Events
                    </Button>
                  )}
                  <Button
                    onClick={navigateToChats}
                    variant="h6"
                    sx={{ color: "text.navbar" }}
                  >
                    <ChatIcon />
                  </Button>
                  {user.user_type !== "PERSONAL" && (
                    <Button
                      onClick={navigateToClaims}
                      variant="h6"
                      sx={{ color: "text.navbar" }}
                    >
                      <CheckBoxIcon />
                    </Button>
                  )}
                  <Button
                    onClick={handleHelpMenuOpen}
                    variant="h6"
                    sx={{ color: "text.navbar" }}
                  >
                    Help
                  </Button>
                  <Button onClick={handleProfileMenuOpen}>
                    <AccountCircleIcon
                      sx={{ color: "white" }}
                      src="/broken-image.jpg"
                    />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem spacing={2} onClick={() => handleOpenPage("userprofile")}>
              <Typography variant="body1">Profile</Typography>
            </MenuItem>
            <Divider color="divider" variant="middle" />
            <MenuItem spacing={2} onClick={handleLogout}>
              <Typography variant="body1">Logout</Typography>
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={helpMenuAnchor}
            open={Boolean(helpMenuAnchor)}
            onClose={handleHelpMenuClose}
          >
            <MenuItem spacing={2} onClick={handleSupport}>
              <Typography variant="body1">Support</Typography>
            </MenuItem>
            <Divider color="divider" variant="middle" />
            <MenuItem spacing={2} onClick={handleAbout}>
              <Typography variant="body1">About</Typography>
            </MenuItem>
            <Divider color="divider" variant="middle" />
            <MenuItem spacing={2} onClick={handleFAQ}>
              <Typography variant="body1">FAQ</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth
        maxWidth="md"
        open={showCreateDialog}
        onClose={handleCloseCreate}
      >
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
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Address"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </Grid>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileSelect}
                  />
                </Button>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    multiline
                    rows={5}
                    fullWidth
                    size="small"
                    label="Description"
                    value={description}
                    onChange={(event) => handleDescriptionChange(event)}
                    disabled={descriptionLoading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            alignItems: "flex-start",
                            mt: 6,
                          }}
                        >
                          <IconButton
                            onClick={handleGenerateDescription}
                            edge="end"
                          >
                            <AutoFixHighIcon
                              sx={{
                                fontSize: 23,
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{ ml: 2, p: 3 }}>
              {/* <Stack direction="column" alignItems="center" justifyContent="space-around" height="100%">
              <Typography variant="h3">Select a file to upload</Typography>
              <IconButton>
                <CloudUploadIcon/>
              </IconButton>
            </Stack> */}
              <img
                style={{ objectFit: "contain", width: "100%", height: "294px" }}
                src={previewUrl === "" ? placeHolder : previewUrl}
                alt="preview"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseCreate}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            disabled={descriptionLoading || createLoading}
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
