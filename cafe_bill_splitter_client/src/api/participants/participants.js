import { DefaultAPIInstance } from '@/api';


export const ParticipantsAPI = {
    GetAll() {
        return DefaultAPIInstance.get('/participants/');
    },
    GetById(id) {
        return DefaultAPIInstance.get(`/participants/${id}/`);
    },
    Add(participant) {
        return DefaultAPIInstance.post('/participants/', participant);
    },
    Update(participant) {
        const data = {
            name: participant.name
        }
        return DefaultAPIInstance.put(`/participants/${participant.id}/`, data);
    },
    Delete(id) {
        return DefaultAPIInstance.delete(`/participants/${id}/`);
    }
}