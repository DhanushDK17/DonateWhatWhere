
import { Grid, TextField } from '@mui/material'
import { Donations } from '../components/Donations';
import { Search } from '../components/Search';
export const HomePage = () => {
    return (
          <Grid container rowSpacing={1} className="dashboardContainer">
            <Grid container direction="row" sx={{my: 3}}>
              <Grid item xs={8} sx={{mb: 2}}>
                <TextField fullWidth label="Title of the donation" />
              </Grid>
              <Grid item xs={8} sx={{mb: 2}}>
                <TextField fullWidth label="Description of the donation" />
              </Grid>
              <Grid item xs={8} sx={{mb: 2}}>
                <TextField fullWidth/>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Search/>
            </Grid>
            <Grid item xs={12}>
                <Donations/>
            </Grid>
            <Grid item xs={12} >
              {/* <DisplayUploadedFiles /> */}
            </Grid>
          </Grid>
      );
}