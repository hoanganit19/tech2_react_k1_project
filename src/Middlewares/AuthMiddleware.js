import React, {useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Url from '../Services/Helpers/Url/Url'

const url = new Url();

export const isLogin = () => {
  if (localStorage.getItem('isLogin')){
    return localStorage.getItem('isLogin')==1?true:false;
  }
 
  return false;
}

export default function AuthMiddleware() {
 
  return isLogin() ? <Outlet /> : <Navigate to={url.login} />
}
