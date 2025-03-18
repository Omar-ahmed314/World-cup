import useAuth from './useAuth';
import AdminController from '../Api/admin/AdminController';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const adminAPI = AdminController();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await adminAPI.logout();
      const { role } = auth?.role;
      console.log('We are printing the role: ', role);
      setAuth({});
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
