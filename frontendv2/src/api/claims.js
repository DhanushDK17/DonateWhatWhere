import { axiosInstance } from ".";

export const fetchClaims = async () => {
    const claimsResponse = await axiosInstance.get('/claim')
    return claimsResponse.data.results
}