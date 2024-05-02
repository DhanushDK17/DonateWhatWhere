import { Grid, Stack, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { fetchClaims } from "../api/claims";
import { ClaimItem } from "../components/ClaimItem";
import home from "../assets/images/home.png";

export const ClaimsPage = () => {
    const [claims, setClaims] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchClaimsHandler()
    }, [])

    const fetchClaimsHandler = () => {
        setLoading(true)
        fetchClaims()
        .then((claimsData) => {
            setClaims(claimsData)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }

    return (
        <>
            {
                <Grid container sx={{p: 3}} justifyContent="center" alignItems="center">
                    {loading ?
                        <CircularProgress/>
                    :
                    (claims.length > 0 ?
                    <Grid container sx={{p: 2}}>
                        {claims.map((claim, index) => 
                            <ClaimItem fetchClaims={fetchClaimsHandler} key={index} claim={claim} />
                        )}
                    </Grid>
                    :
                    <>
                    <Stack direction="column" justifyContent="center" alignItems="center" sx={{mt: 10}}>
                        <img src={home} className="no-history-image" alt="No claims" />
                        <Typography variant="h3">No Claims Available</Typography>
                    </Stack>
                    </>
                    )}
                </Grid>
            }
        </>
    )
}