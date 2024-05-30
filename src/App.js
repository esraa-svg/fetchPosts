import './App.css';
import Home from './components/Home.js';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Details from './components/Details';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
    },{
      path: "/:id",
      element: (
        <Details />
      ),
 
    }
  ]);
  return <>
   <RouterProvider router={router} />
 
  </>
}
export default App;
