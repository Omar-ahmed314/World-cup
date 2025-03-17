import axios from '../axios';
import useAuth from './useAuth';
import { decodeToken } from 'react-jwt';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/user/refresh', undefined, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    const accessToken = response.data['accessToken'];
    const { userID, userName, role, roleApproved } = decodeToken(accessToken);
    // set the auth value to the userid and username
    setAuth({ userID, userName, role, roleApproved, accessToken });

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
