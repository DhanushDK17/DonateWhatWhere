
import { Grid } from '@mui/material'
import { Donations } from '../components/Donations';
import { Search } from '../components/Search';
import { useSelector } from 'react-redux';
import { getUser } from '../store/slices/user';
import { Events } from './Events';
export const HomePage = () => {

  const user = useSelector(getUser)

  return (
    <Grid container>
      {user.user_type === 'PERSONAL' ?
      <>
      <Events/>
      </>
      :
      <>
        <Grid item xs={12}>
          <Search/>
        </Grid>
        <Grid item xs={12}>
          <Donations/>
        </Grid>
      </>
      }
    </Grid>
  );
}