import { Grid, Typography, Card, CardHeader, IconButton, CardContent, CardActions } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import { getUser } from "../../store/slices/user"
import EditIcon from '@mui/icons-material/Edit';
import { deleteEvent } from "../../api/events";
import { useDispatch } from "react-redux";
import { fetchEventsAction } from "../../store/slices/event";

export const EventItem = ({ event, onEdit }) => {
    const dispatch = useDispatch()

    const handleEdit = () => {
        onEdit(undefined, event)
    }

    const handleDelete = () => {
        deleteEvent(event.id)
        .then(() => {
            dispatch(fetchEventsAction())
        })
    }

    const user = useSelector(getUser)
    return (
        <>
            <Card
        sx={{ maxWidth: 345, border: "1.5px solid #ccc", cursor: "pointer" }}
      >
        <CardHeader
          style={{ color: "#361d32" }}
          title={event.name}
          subheader={event.address || "Arizona"}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </CardActions>
      </Card>
        </>
    )
}