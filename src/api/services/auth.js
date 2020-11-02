import axios from 'axios';

const API_URL = "http://localhost:8080/v1/auth/";

export class Auth {
    async login(email, password) {
        const response = await axios
            .post(API_URL + 'sign_in', {
                email,
                password
            });
        // Check where is the token in devise response here
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(API_URL + 'sign_up', {            
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new Auth();