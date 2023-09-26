import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import Login from './components/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CreateGallery from './components/createGallery/CreateGallery';
import SignUp from './components/signUp/SignUp';
import EditGallery from './components/editGallery/EditGallery';
import GuestLogin from './pages/guestLogin/GuestLogin';
import Reports from './pages/Reports/Reports';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'creategallery',
        element: <CreateGallery />
      },
      {
        path: 'editgallery/:id',
        element: <EditGallery />
      },
      {
        path: 'reports',
        element: <Reports />
      }
    ]
  },
  {
    path: '/guestlogin/:id',
    element: <GuestLogin />,
    errorElement: <ErrorPage />
  }
  
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
