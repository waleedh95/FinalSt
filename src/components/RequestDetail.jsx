import React from 'react'
import { useParams } from 'react-router-dom'

const RequestDetail = () => {
  const { id } = useParams()
  return (
    <div>
      <h3>Request Detail: {id}</h3>
      {/* TODO: Show request info and donor commitments */}
    </div>
  )
}

export default RequestDetail