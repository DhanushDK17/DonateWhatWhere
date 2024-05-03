import { axiosInstance } from ".";
import { encodeQueryData } from ".";

export const createDonation = async (title, category, description, address) => {
    const createdDonationResponse = await axiosInstance.post('/donation', {
        item: title,
        description,
        address,
        category,
        datetime: new Date().toISOString()
    })
    return createdDonationResponse.data
}

export const uploadImageToDonation = async (image, id) => {
    const response = await axiosInstance.post('/image', { donation: image, donation_id: id }, {headers: {
        "content-type": "multipart/form-data"
    }})
    return response.data
}

export const fetchDonations = async (data) => {
    const queryString  = encodeQueryData(data)
    const donationsResponse = await axiosInstance.get(`/donation?${queryString}`)
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

export const generateDescription = async (file) => {
    const descriptionResponse = await axiosInstance.post('/description', {
        donation: file
    }, {headers: {
        "content-type": "multipart/form-data"
    }})
    return descriptionResponse.data
}

export const updateDonation = async (id, newDonation) => {
    const updatedDonation = await axiosInstance.patch(`/donation/${id}`, newDonation)
    return updatedDonation.data
}