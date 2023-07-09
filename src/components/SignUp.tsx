import {Form} from "./Form";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {setUser} from "../store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux-hooks";

export const SignUp = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
            navigate('/')
            })
            .catch(console.error)
    }

    return (
        <Form
            title={'register'}
            handleClick={handleRegister}
        />
    )
}
