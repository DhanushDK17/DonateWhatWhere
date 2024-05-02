import { Grid } from "@mui/material"
import { Donations } from "../components/Donations"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchDonationsAction } from "../store/slices/donation"

export const MyDonations = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDonationsAction())
    }, [])

    return (
        <>
            <Grid container sx={{p: 2}}>
                <Donations/>
            </Grid>
        </>
    )
}
