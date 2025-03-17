import axios from 'axios';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { config } from '../../config';

const MatchController = () => {
  const axiosPrivate = useAxiosPrivate();

  async function remove(id) {
    try {
      const response = await axiosPrivate.delete(`${config.url}/match/${id}`);
      return response;
    } catch (error) {}
  }

  async function add(data) {
    try {
      const response = await axiosPrivate.post(`${config.url}/match`, data);
      console.log(response?.status);
    } catch (error) {}
  }

  async function getMatches() {
    try {
      const response = await axiosPrivate.get(`${config.url}/match`);
      return response?.data;
    } catch (err) {}
  }

  async function getMatchesWithStadium() {
    try {
      const response = await axiosPrivate.get(`${config.url}/matchWithStadium`);
      return response?.data;
    } catch (err) {}
  }

  async function getMatchById(id) {
    try {
      const response = await axiosPrivate.get(`${config.url}/match/${id}`);
      return response?.data;
    } catch (err) {}
  }

  async function update(data) {
    try {
      const response = await axiosPrivate.put(`${config.url}/match`, data);
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
