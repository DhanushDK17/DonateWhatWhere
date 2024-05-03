import { Stack, IconButton, Typography, TextField, Grid, CircularProgress, Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchEvents, createEvent, updateEvent } from "../api/events"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import LoadingButton from "@mui/lab/LoadingButton"
import SearchIcon from "@mui/icons-material/Search"
import event, { fetchEventsAction, getEvents, getEventsStatus } from "../store/slices/event"
import { getUser} from "../store/slices/user"
import { useDispatch, useSelector } from "react-redux"
import { EventItem } from "../components/EventItem"
import moment from 'moment'

export const Events = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [editing, setEditing] = useState(false)
    const [address, setAddress] = useState('')
    const [currentEvent, setCurrentEvent] = useState('')
    
    const [selAddress, setSelectedAddress] = useState('')
    const [org, setOrganization] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const eventsData = useSelector(getEvents)
    const status = useSelector(getEventsStatus)

    useEffect(() => {
        handleFetchEvents()
        const getData = setTimeout(() => {
            // handleFetchEvents()
            dispatch(fetchEventsAction())
        }, 1000)
        return () => clearTimeout(getData)
    }, [searchTerm, selAddress, org])

    const handleFetchEvents = () => {
        setLoading(true)
        fetchEvents()
        .then(data => {
            setEvents(data.results)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }

    const handleCloseCreate = () => {
        setEditing(false)
        setShowCreateDialog(false)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handleConfirmCreateEvent = () => {
        if (editing) {
            setCreateLoading(true)
            updateEvent(currentEvent, {name: title, description, datetime: date, address})
            .then(data => {
                dispatch(fetchEventsAction())
                setEditing(false)
                setShowCreateDialog(false)
            })
            .catch(error => console.error(error))
            .finally(() => setCreateLoading(false))
        } else {
            setCreateLoading(true)
            createEvent({name: title, description, datetime: date, address})
            .then(data => {
                dispatch(fetchEventsAction())
                setShowCreateDialog(false)
            })
            .catch(error => console.error(error))
            .finally(() => setCreateLoading(false))
        }
    }

    const handleCreate = (e, eventData) => {
        console.log(eventData)
        if (eventData === undefined) {
            setEditing(false)
            setShowCreateDialog(true)
        } else {
            setEditing(true)
            setCurrentEvent(eventData.id)
            setTitle(eventData.name)
            setDescription(eventData.description)
            setDate(eventData.datetime)
            setAddress(eventData.address)
            console.log(moment(eventData.datetime).format('yyyy-MM-DD'))
            setDate(moment(eventData.datetime).format('yyyy-MM-DD'))
            setShowCreateDialog(true)
        }
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleOrganizationChange = (e) => {
        setOrganization(e.target.value)
    }

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value)
    }

    const handleLocationChange = (e) => {
        setAddress(e.target.value)
    }



    return (
        <>
            {
                loading ? <CircularProgress/>
                :
                <Grid container sx={{mt: 3}} justifyContent="center" alignItems="center">
                    <Grid container justifyContent="center" alignItems="center">
                        <Typography variant="h3">Events</Typography>
                        <Grid item xs={5}>
                            <TextField
                            label="Search"
                            className="inputField"
                            size="small"
                            fullWidth
                            value={searchTerm}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                <IconButton color="primary" sx={{fontSize:{xs:"medium", sm:"large"}}}>
                                    <SearchIcon fontSize="inherit"/>
                                </IconButton>
                                ),
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ml: 2}}
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ml: 2}}>
                            <TextField sx={{ml: 2}} size='small' label='Organization' value={org} onChange={handleOrganizationChange} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField size='small' label='Location' value={selAddress} onChange={handleAddressChange}/>
                        </Grid>
                        {user.user_type === 'ORGANIZATION' && 
                            <Grid item xs={2}>
                                <Button onClick={(event) => handleCreate(event, undefined)} variant="h6">
                                    <AddIcon/> {currentEvent === '' ? "Create Event" : "Update Event"}
                                </Button>
                            </Grid>
                        }
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                    {
                        status === 'loading'
                        ?
                        <CircularProgress/>
                        :
                        eventsData.length > 0
                        ?
                        <Grid container>
                            {eventsData.map((event, index) =>
                            <Grid item xs={3} sx={{ml: 2, mt: 2}} key={index}>
                                <EventItem event={event} onEdit={handleCreate}/>
                            </Grid>)}
                        </Grid>
                        :
                        <CircularProgress sx={{mt: 10}} />

                    }
                    </Grid>
                </Grid>
            }
            <Dialog
                fullWidth
                maxWidth="md"
                open={showCreateDialog}
                onClose={handleCloseCreate}
                
                >
                <DialogTitle sx={{backgroundColor: 'primary.main', py: 1}}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{color: 'white'}}>
                        <Typography variant="h6" color="text.navbar" >Create Event</Typography>
                        <Button onClick={handleCloseCreate}> <CloseIcon sx={{color: 'white'}}/> </Button>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{pt: "20px !important", pb: 0}}>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item xs={7}>
                            <Grid container>
                                <Grid item xs={12} sx={{mb: 2}}>
                                    <TextField fullWidth size="small" label="Title" value={title} onChange={handleTitleChange}/>
                                </Grid>
                                <Grid item xs={12} sx={{mb: 2}}>
                                    <TextField type="date" fullWidth size="small" label="Date and Time"  value={date} onChange={handleDateChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{mb: 2}}>
                                    <TextField fullWidth size="small" label="Address"  value={address} onChange={handleLocationChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField multiline rows={5}
                                    fullWidth
                                    size="small"
                                    label="Description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCloseCreate}>Cancel</Button>
                    <LoadingButton variant="contained" disabled={createLoading} sx={{backgroundColor: "primary.main"}} loading={createLoading} onClick={handleConfirmCreateEvent}>{
                    editing ? "Update" : "Create"
                    }</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}