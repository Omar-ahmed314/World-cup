import axios from "axios";
import { config } from "../../config";

export default class MatchController {
    async remove (id) {
        try {
            const response = await axios.delete(`${config.url}/match/${id}`)
        } catch (error) {
            
        }
    }

    async add (data) {
        try {
            const response = await axios.post(`${config.url}/match`, data)
            console.log(response?.status)
        } catch (error) {
            
        }

    }

    async getMatches () {
        try {
            const response = await axios.get(`${config.url}/match`)
            return response?.data;
        } catch (err) {
            
        }
    }

    async getMatchesWithStadium () {
        try {
            const response = await axios.get(`${config.url}/matchWithStadium`)
            return response?.data;
        } catch (err) {
            
        }
    }

    async update (data) {
        try {
            const response = await axios.put(`${config.url}/match`, data)
        } catch (error) {
            
        }
    }
}