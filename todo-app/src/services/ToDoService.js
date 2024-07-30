import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos';

class ToDoService {
    getAllToDos() {
        return axios.get(API_URL);
    }

    createToDo(toDo) {
        return axios.post(API_URL, toDo);
    }

    getToDoById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    updateToDo(id, toDo) {
        return axios.put(`${API_URL}/${id}`, toDo);
    }

    deleteToDo(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ToDoService();
