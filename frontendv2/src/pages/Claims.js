import { Grid, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import { fetchClaims } from "../api/claims";
import { ClaimItem } from "../components/ClaimItem";

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
                loading ?
                    <CircularProgress/>
                :
                (<Grid container sx={{p: 2}}>
                    {claims.map((claim, index) => 
                        <ClaimItem key={index} claim={claim} />
                    )}
                </Grid>)
            }
        </>
    )
}