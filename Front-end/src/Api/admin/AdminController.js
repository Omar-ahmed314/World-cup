import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { config } from '../../config';
import axios from 'axios';

const AdminController = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async () => {
    const response = await axiosPrivate.get(`${config.url}/user`);
    return response?.data;
  };

  const deleteUser = async (userId) => {
    const response = await axiosPrivate.delete(`${config.url}/user/${userId}`);
    return response;
  };

  const userApprove = async (userId) => {
    const response = await axiosPrivate.put(`${config.url}/user-approve`, {
      userId,
    });
    return response;
  };

  const logout = async () => {
    const response = await axios.post(`${config.url}/user/logout`, undefined, {
      withCredentials: true,
    });
    return response;
  };

  return { getUsers, deleteUser, userApprove, logout };
};

export default AdminController;
