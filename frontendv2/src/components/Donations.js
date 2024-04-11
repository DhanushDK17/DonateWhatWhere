import { Grid, Button, Typography } from '@mui/material'
import { donations } from '../mock/data'
import { DonationItem } from './DonationItem'
export const Donations = () => {
    return (
        <Grid container>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography variant="subtitle">Donations</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {donations.map((donation, index) => 
                <Grid key={index} xs={3}>
                    <DonationItem data={donation}/>
                </Grid>)}
            </Grid>
        </Grid>
    )
}