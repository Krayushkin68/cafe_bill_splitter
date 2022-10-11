import {DefaultAPIInstance} from '@/api';


export const PositionsAPI = {
    GetAll() {
        return DefaultAPIInstance.get('/positions/');
    },
    GetById(id) {
        return DefaultAPIInstance.get(`/positions/${id}/`);
    },
    Add(position) {
        return DefaultAPIInstance.post('/positions/', position);
    },
    Update(position) {
        const data = { 
            name: position.name,
            price: position.price,
            count: position.count 
        }
        return DefaultAPIInstance.put(`/positions/${position.id}/`, data);
    },
    Delete(id){
        return DefaultAPIInstance.delete(`/positions/${id}/`);
    }
}