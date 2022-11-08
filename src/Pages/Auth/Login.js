import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const {loginWithRedirect, isLoading, isAuthenticated} = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated){
      loginWithRedirect({ui_locales: 'vi'});
    }else{
      navigate('/');
    }
    
  }, []);
  
}
