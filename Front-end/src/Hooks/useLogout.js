import useAuth from "./useAuth";
import axios from "../axios";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        try {
            setAuth({});
            const response = await axios.post('/user/logout', undefined, {
                withCredentials: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout;