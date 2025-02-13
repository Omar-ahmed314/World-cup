import axios from "axios"
import { config } from "../../config"

export default class Stadium {
    async add () {

    }

    async getStadiums () {
        try {
            const response = await axios.get(`${config.url}/stadium`)
            return response?.data;

        } catch (err) {

        }
    }
}