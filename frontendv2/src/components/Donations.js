import { Grid, Button, Typography } from "@mui/material";
import { DonationItem } from "./DonationItem";
import {
  fetchDonationsAction,
  getDonations,
  getDonationsMessage,
  getDonationsStatus,
} from "../store/slices/donation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import home from "../assets/images/home.png";

export const Donations = () => {
  const dispatch = useDispatch();
  const donations = useSelector(getDonations);
  const donationsStatus = useSelector(getDonationsStatus);
  const donationsMessage = useSelector(getDonationsMessage);

  useEffect(() => {
    dispatch(fetchDonationsAction());
  }, []);

  return (
    <Grid container className="user-profile-container">
      {donationsStatus === "success" ? (
        donations.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {donations.map((donation, index) => (
                <Grid item key={donation.id} xs={3} sx={{ mb: 2 }}>
                  <DonationItem data={donation} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <div>
              <img src={home} className="no-history-image" />
              <Typography variant="h3">No donations available</Typography>
            </div>
          </Grid>
        )
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};
