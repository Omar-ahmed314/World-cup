import axios from 'axios';
import { config } from '../../config';

const MatchController = () => {
  async function remove(id) {
    try {
      const response = await axios.delete(`${config.url}/match/${id}`);
    } catch (error) {}
  }

  async function add(data) {
    try {
      const response = await axios.post(`${config.url}/match`, data);
      console.log(response?.status);
    } catch (error) {}
  }

  async function getMatches() {
    try {
      const response = await axios.get(`${config.url}/match`);
      return response?.data;
    } catch (err) {}
  }

  async function getMatchesWithStadium() {
    try {
      const response = await axios.get(`${config.url}/matchWithStadium`);
      return response?.data;
    } catch (err) {}
  }

  async function getMatchById(id) {
    try {
      const response = await axios.get(`${config.url}/match/${id}`);
      return response?.data;
    } catch (err) {}
  }

  async function update(data) {
    try {
      const response = await axios.put(`${config.url}/match`, data);
    } catch (error) {}
  }

  return {
    remove,
    add,
    getMatches,
    getMatchById,
    getMatchesWithStadium,
    update,
  };
};

export default MatchController;
