import { axiosInstance } from "."

export const fetchEvents = async () => {
    const eventsResponse = await axiosInstance.get('/event')
    return eventsResponse.data
}

export const createEvent = async (eventData) => {
    return await axiosInstance.post('/event', eventData)
}

export const deleteEvent = async (id) => {
    return await axiosInstance.delete(`/event/${id}`)
}

export const updateEvent = async (id, updatedEvent) => {
    return await axiosInstance.patch(`/event/${id}`, updatedEvent)
}