import './index.css'
import { Outlet } from 'react-router'
import axios from 'axios';
import { useUserProfile } from './hooks/useUser';
axios.defaults.withCredentials = true;


function App() {
  useUserProfile();

 return (
  <>
    <Outlet/>
  </>
 )
}

export default App
