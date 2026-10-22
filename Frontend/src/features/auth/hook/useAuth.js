import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { registerApi, loginApi, getMe } from "../services/auth.api.js";
import { useDispatch } from "react-redux";


const useAuth = () => {

    const dispatch = useDispatch();

    async function handleRegister({ email, contact, fullname, password, isSeller = false }) {
        const data = await registerApi({ email, contact, fullname, password, isSeller });

        dispatch(setUser(data.user));
    }

    async function handleLogin({ email, password }) {
        try {
            const data = await loginApi({ email, password })
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            throw error
        }
    }

    async function handlegetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe();
            dispatch(setUser(data.user))
        } catch (error) {
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }


    return { handleRegister, handleLogin, handlegetMe };

}

export default useAuth;