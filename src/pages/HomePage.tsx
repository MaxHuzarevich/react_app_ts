import {Navigate} from 'react-router-dom'
import {useAuth} from "../hooks/use-auth";
import {removeUser} from '../store/slices/userSlice';
import {useAppDispatch} from "../hooks/redux-hooks";
import {Reorder} from 'framer-motion';
import {useState} from "react";

type nameType = {
    id: number,
    title: string
}

const defaultNames: Array<nameType> = [
    {id: 1, title: 'Max'},
    {id: 2, title: 'Kat'},
    {id: 3, title: 'Rodi'}
];

export const HomePage = () => {

    const dispatch = useAppDispatch();
    const {isAuth, email} = useAuth();

    const [elements, setElements] = useState<Array<nameType>>(defaultNames)

    return isAuth ? (
            <div>
                <h1>Welcome</h1>
                <Reorder.Group as={'ol'} axis={"y"} values={elements} onReorder={setElements}>
                    {elements.map((el) => (
                        <Name key={el.id} title={el.title} id={el.id}/>
                    ))}
                </Reorder.Group>
                <button onClick={() => dispatch(removeUser())}>
                    Log out from {email}
                </button>
            </div>
        ) :
        (<Navigate to={'/login'}/>)
}

const Name = ({title}: nameType) => {
    return (
        <Reorder.Item value={title}>
            <span style={{width: '150px', height: '100%', backgroundColor: 'red', margin: '10px'}}>{title}</span>
        </Reorder.Item>
    )
}
