import { axiosInstance } from ".";

export const createDonation = async (title, category) => {
    const createdDonationResponse = await axiosInstance.post('/donation', {
        item: title,
        category,
        datetime: new Date().toISOString()
    })
    return true
}

export const fetchDonations = async () => {
    const donationsResponse = await axiosInstance.get('/donation')
    console.log(donationsResponse.data.results)
    return donationsResponse.data.results
}

export const deleteDonation = async (id) => {
    await axiosInstance.delete(`/donation/${id}`)
    return true
}

export const claimDonation = async (id) => {
    const claimDonationResponse = await axiosInstance.post(`/donation/${id}/claim`)
    return claimDonationResponse.data
}