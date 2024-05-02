import { Grid, Button, Typography, TextField } from '@mui/material'
import { DonationItem } from './DonationItem'
import { fetchDonationsAction, getDonations, getDonationsMessage, getDonationsStatus } from '../store/slices/donation'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';

export const Donations = () => {
    const donations = useSelector(getDonations)
    const donationsStatus = useSelector(getDonationsStatus)
    const donationsMessage = useSelector(getDonationsMessage)
    const dispatch = useDispatch()
    return (
        <Grid container>
            {donationsStatus === 'success' ?
            (
                donations.length > 0 ?
                (<>
                    <Grid container spacing={2}>
                        {donations.map((donation, index) => 
                        <Grid item key={donation.id} xs={3} sx={{mb: 2}}>
                            <DonationItem data={donation}/>
                        </Grid>)}
                    </Grid>
                </>)
                :
                <Grid container alignItems="center" justifyContent="center" sx={{height: '100%'}}>
                    <Typography variant='h3'>No donations available</Typography>
                </Grid>
            )
            :
            donationsStatus === 'loading' ?
            (<CircularProgress/>)
            :
            <>Error loading donations</>
            } 
        </Grid>
    )
}
