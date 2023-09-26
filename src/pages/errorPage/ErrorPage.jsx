import React from 'react'
import { useRouteError } from 'react-router-dom'
import './errorPage.css'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  return (
    <div className='error-page'>
        <h4>VisionVault</h4>
        <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
