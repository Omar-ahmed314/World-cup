import { config } from "../config"
import axios from "axios"
/**
 * 
 */

const url = config.url;

export const login = async (userData) => {
    // send the login request to server
    const path = url + '/login';
    const response = await axios.post(path, userData);
    if(response.status != 200){
        return Promise<undefined>;
    }
    
}