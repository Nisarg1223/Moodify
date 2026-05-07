import axios from 'axios'

const api = axios.create({
    baseURL:'https://moodify-2he8.onrender.com',
    withCredentials: true
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function register({username,email,password}){
  const response = await api.post("/api/auth/register",{
        username,
        email,
        password
    })
  setAuthToken(response.data.token);
  return response.data;
}

export async function login({email,password}){
   const response = await api.post("/api/auth/login",{
    email,
    password
   })
   setAuthToken(response.data.token);
   return response.data;
}

export async function getMe(){
    const response = await api.get("/api/auth/get-me");
    return response.data;
}

export async function logout(){
    const response = await api.get('/api/auth/logout');
    return response.data;
}
