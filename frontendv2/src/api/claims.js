import { axiosInstance } from ".";

export const fetchClaims = async () => {
    const claimsResponse = await axiosInstance.get('/claim')
    return claimsResponse.data.results
}

export const deleteClaim = async (id) => {
    const deleteClaimResponse = await axiosInstance.delete(`/donation/${id}/claim`)
    return deleteClaimResponse
}