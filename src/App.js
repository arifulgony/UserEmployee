import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import UserTab from './Components/Pages/UserTab';
import EmployeeTab from './Components/Pages/EmployeeTab';

function App() {

  const router = createBrowserRouter([
    {
      path :"/",
      element: <Home/>
    },
    {
      path: '/user',
      element: <UserTab/>
    },
    {
      path: '/employee',
      element: <EmployeeTab/>
    }
  ])

  return (
    <div className="">
      <RouterProvider router={router} />
      

    </div>
  );
}

export default App;
