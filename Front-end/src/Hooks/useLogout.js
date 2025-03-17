import useAuth from './useAuth';
import axios from '../axios';
import AdminController from '../Api/admin/AdminController';

const useLogout = () => {
  const { setAuth } = useAuth();
  const adminAPI = AdminController();

  const logout = async () => {
    try {
      setAuth({});
      const response = await adminAPI.logout();
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
