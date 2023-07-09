import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Form} from "./Form";
import {setUser} from "../store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux-hooks";

export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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


    return <div>
        <Form title={'Sign in'} handleClick={handleLogin}/>
    </div>
}
