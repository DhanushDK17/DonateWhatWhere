import { axiosInstance } from ".";

export const startConversation = async ({text, receiver, conversation_id}) => {
    const response = await axiosInstance.post('/conversation', {
        receiver,
        conversation_id,
        text
    })
    return response.data
}