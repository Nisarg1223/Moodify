import {
    login,
    register,
    getMe,
    logout
} from '../services/auth.api.js'
import { useContext } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { useEffect } from 'react'
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {user,setuser,loading,setloading} = context;

    async function handleRegister({username,email,password}){
        setloading(true)
        const data = await register({
            username,
            email,
            password
        })

        setuser(data.user);
        setloading(false);

    }
    async function handleLogin({username,email,password}){
        setloading(true);
        const data = await login({
            username,
            email,
            password
        })
        setuser(data.user);
        setloading(false);
    }
    async function handlegetme(){
        setloading(true);
        const data = await getMe();
        setuser(data.user);
        setloading(false);
    }
    async function handlelogout(){
        setloading(true);
        const data = await logout();
        setuser(null);
        setloading(false);
    }
   useEffect(()=>{
     handlegetme();
   },[])
    return ({
        user,
        loading,
        handleLogin,
        handleRegister,
        handlegetme,
        handlelogout
    })
}