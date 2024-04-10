import { useState } from "react";
import { DialogActions, DialogTitle, Stack, DialogContent, TextField, Dialog, AppBar, Button, Toolbar, Typography, Grid, Menu, MenuItem, Divider } from "@mui/material";
import styles from './styles.module.css'
import AddIcon from '@mui/icons-material/Add';

export function Header() {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')



  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleAdminMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleClickCreate = () => {
    setShowCreateDialog(true)
  }

  const handleCloseCreate = () => {
    setShowCreateDialog(false)
  }

  const handleCreate = () => {

  }


  return (
    <>
      <AppBar
      position="sticky"
      sx={{
        px: 4,
      }}
      className={`${styles.header}`}
      style={{background: 'black'}}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{color:"text.navbar"}}>
              Donate What Where
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleClickCreate} variant="h6" sx={{color:"text.navbar"}}>
              <AddIcon/>
            </Button>
          </Grid>
        </Grid>
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem spacing={2} onClick={handleAdminMenuClose}>
            <Typography variant="body1">
                Admin Console
              </Typography>
            </MenuItem>
            <Divider color="divider" variant="middle"/>
          <MenuItem spacing={2} onClick={handleProfileMenuClose}>
            <Typography variant="body1">
              Profile
            </Typography>
          </MenuItem>
          <Divider color="divider" variant="middle"/>
          <MenuItem spacing={2}>
            <Typography variant="body1">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    <Dialog
      // anchor="bottom"
      fullWidth
      maxWidth="md"
      open={showCreateDialog}
      onClose={handleCloseCreate}
    >
      <DialogTitle sx={{background: 'black'}}>
        <Stack direction="row" justifyContent="space-between" sx={{color: 'white'}}>
          <Typography variant="h6" color="text.navbar" >Create donation</Typography>
          <Typography variant="h6" color="text.navbar" >close</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{pt: "20px !important", pb: 0}}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={5}>
            <Grid container>
              <Grid item xs={12} sx={{mb: 2}}>
                <TextField fullWidth label="Title of the donation" value={title}/>
              </Grid>
              <Grid item xs={12} sx={{mb: 2}}>
              <TextField fullWidth label="Location of the donation" value={location}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} sx={{ml: 1}}>
            <TextField multiline rows={4} fullWidth label="Description of the donation" value={description}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}