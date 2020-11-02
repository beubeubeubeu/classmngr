import axios, {AxiosPromise} from 'axios';

import {UserModel} from './models/User';

export interface Api {
    getUsers(): Promise<UserModel[]>
}

export interface ApiError {
    code: string;
    name?: string;
    error: string;
    message: string;
    statusCode: number;
}

export const backend = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const forward = async <T extends {}>(t: AxiosPromise<T>): Promise<T> => {
    return (await t).data;
};


export const api: Api = {
    getUsers: async () => {
        return (await backend.get('/users')).data;
    }
}