import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Popper,
  Button,
  IconButton,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  DialogContentText,
  Grid
} from "@mui/material";
import { useState, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";

import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grow from "@mui/material/Grow";
import { claimDonation, deleteDonation } from "../../api/donations";
import { fetchDonationsAction, getEditing, setEditing } from "../../store/slices/donation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/user";
import EditIcon from "@mui/icons-material/Edit";

export const DonationItem = ({ data }) => {
  const [showOptions, setShowOptions] = useState(false);
  const moreRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const [dialogTitle, setDialogTitle] = useState("Claim Donation");
  const [dialogText, setDialogText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const edit = useSelector(getEditing)

  const handleClose = () => {
    setShowOptions(false);
  };

  const handleDeleteDonation = () => {
    setShowConfirmation(true);
    setDialogText("Are you sure about deleting this donation?");
    setDialogTitle("Delete donation");
  };

  const handleConfirmClaim = () => {
    setClaimLoading(true);
    if (dialogTitle === "Delete donation") {
      deleteDonation(data.id)
        .then(() => {
          handleCloseClaimDonation();
          dispatch(fetchDonationsAction({ is_claimed: false}));
        })
        .catch((error) => console.error(error.message))
        .finally(() => setClaimLoading(false));
    } else {
      claimDonation(data.id)
        .then(() => {
          dispatch(fetchDonationsAction({is_claimed: false}));
          handleCloseClaimDonation()
        })
        .catch((error) => console.error(error.message))
        .finally(() => setClaimLoading(false));
    }
  };

  const handleCloseClaimDonation = () => {
    setShowConfirmation(false);
  };

  const handleClaimDonation = () => {
    setShowConfirmation(true);
    setDialogText("Are you sure about claiming this donation?");
    setDialogTitle("Claim donation");
  };

  const handleEdit = () => {
    dispatch(setEditing(data))
  }

  return (
    <>
      <Dialog fullWidth open={showConfirmation}>
        <DialogTitle sx={{ backgroundColor: "primary.main", py: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ color: "white" }}
          >
            <Typography variant="h6" color="text.navbar">
              {dialogTitle}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: "20px !important", pb: 0 }}>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseClaimDonation}>
            No
          </Button>
          <LoadingButton
            variant="contained"
            sx={{ backgroundColor: "primary.main" }}
            loading={claimLoading}
            onClick={handleConfirmClaim}
          >
            {dialogTitle === "Delete donation" ? "Delete" : "Claim"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Card
        sx={{ maxWidth: 345, border: "1.5px solid #ccc", cursor: "pointer" }}
      >
        <CardHeader
          style={{ color: "#361d32" }}
          action={
            <IconButton
              ref={moreRef}
              onClick={() => setShowOptions(true)}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={data.item}
          subheader={data.category}
        />
        <CardMedia
          component="img"
          height="194"
          style={{ color: "black" }}
          image={`data:image/png;base64,${data.image_base64}`}
          alt={data.item}
        />
        <CardContent sx={{overflow: 'scroll', height: '50px'}}>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8}>
              {user.user_type === 'ORGANIZATION' && <IconButton aria-label="Claim donation" onClick={handleClaimDonation}>
                <HandshakeIcon color="success" />
              </IconButton>}
              {user.user_type === 'PERSONAL' && <IconButton aria-label="Edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>}
              {user.user_type === 'PERSONAL' && <IconButton aria-label="Delete" onClick={handleDeleteDonation}>
                <DeleteIcon color="error" />
              </IconButton>}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body3">{data.address || "Austin"}</Typography>
            </Grid>
          </Grid>
          
          {/* <Popper
            open={showOptions}
            anchorEl={moreRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={showOptions}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem onClick={handleClose}>Report</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                large plate and set aside, leaving chicken and chorizo in the pan. Add
                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and
                peppers, and cook without stirring, until most of the liquid is absorbed,
                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                mussels, tucking them down into the rice, and cook again without
                stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse> */}
      </Card>
    </>
  );
};
