import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { config } from '../../config';

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

  return { getUsers, deleteUser, userApprove };
};

export default AdminController;
