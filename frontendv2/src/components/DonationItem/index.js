import { Grid, Popper, Button, Collapse, IconButton, Typography, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material'
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';


import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grow from '@mui/material/Grow';


export const DonationItem = ({data}) => {
    const [expanded, setExpanded] = useState(false);
    const [showOptions, setShowOptions] = useState(false)
    const moreRef = useRef()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

    const handleClose = () => {
        setShowOptions(false)
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                style={{color: "black"}}
                // avatar={
                // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //     D
                // </Avatar>
                // }
                action={
                <IconButton ref={moreRef} onClick={() => setShowOptions(true)} aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={data.title}
                subheader={data.category}
            />
            <CardMedia
                component="img"
                height="194"
                style={{color: "black"}}
                image={data.picture_link}
                alt={data.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {data.description}
                </Typography>
            </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <HandshakeIcon color='success' />
            </IconButton>
            
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <DeleteIcon color='error' />
            </IconButton>
            <Popper
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
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
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
            </Popper>
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
      );
}