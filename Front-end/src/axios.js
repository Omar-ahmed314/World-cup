import axios from 'axios'
import { config } from './config'

export default axios.create({
    baseURL: config.url
});

export const axiosPrivate = axios.create({
    baseURL: config.url,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});