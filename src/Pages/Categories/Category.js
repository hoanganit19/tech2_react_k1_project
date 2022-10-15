import React from 'react'
import { useParams } from 'react-router-dom'

export default function Category() {
    const params = useParams();
    const {id} = params;
  return (
    <div>Category: {id}</div>
  )
}
