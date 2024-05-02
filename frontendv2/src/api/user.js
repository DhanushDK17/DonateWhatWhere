import { axiosInstance } from ".";

export const fetchProfile = async () => {
    const profileResponse = await axiosInstance.get('/profile')
    return profileResponse.data
}