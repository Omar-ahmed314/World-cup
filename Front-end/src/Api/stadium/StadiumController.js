import axios from 'axios';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { config } from '../../config';

const Stadium = () => {
  const axiosPrivate = useAxiosPrivate();

  async function addStadium(stadiumData) {
    const response = await axiosPrivate.post(
      `${config.url}/stadium`,
      stadiumData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  }

  async function deleteStadium(stadiumID) {
    const response = await axiosPrivate.delete(
      `${config.url}/stadium/${stadiumID}`
    );
    return response;
  }

  async function getStadiums() {
    const response = await axiosPrivate.get(`${config.url}/stadium`);
    return response?.data;
  }

  return { addStadium, getStadiums, deleteStadium };
};

export default Stadium;
