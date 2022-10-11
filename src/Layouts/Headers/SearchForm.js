import React, {useEffect} from 'react'
import searchSlice, {doSearch, searchSelector} from './searchSlice'
import { useDispatch, useSelector } from "react-redux";
import HttpClient from '../../Services/Helpers/Api/HttpClient';
import Token from '../../Services/Helpers/Token/Token';

export default function SearchForm() {

  // const dispatch = useDispatch();

  // const songs = useSelector(searchSelector);

  // console.log(songs);

  const client = new HttpClient();

  const tokenObj = new Token();

  const showData = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY2NTQ2MTc2MCwiZXhwIjoxNjY1NDY1MzYwLCJzdWIiOiIyIn0.mKZjx0CnnwUAQmJhvT4DNLk8S0lOWb3oFp2075UfUcQ';
    const res = await client.get('http://localhost:3004/660/categories');
    if (res.response.status===401){
      console.log('Bạn phải login ngay');
      tokenObj.setToken('123');
    }
  }

  useEffect(() => {
    //dispatch(doSearch('a'));
    showData();
  }, []);

  return (
    <h2>SearchForm</h2>
  )
}
