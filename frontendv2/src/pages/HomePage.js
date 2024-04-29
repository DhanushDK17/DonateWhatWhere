
import { Grid } from '@mui/material'
import { Donations } from '../components/Donations';
import { Search } from '../components/Search';
export const HomePage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Search/>
      </Grid>
      <Grid item xs={12}>
        <Donations/>
      </Grid>
    </Grid>
  );
}