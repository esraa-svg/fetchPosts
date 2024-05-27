import './App.css';
import Home from './Home.js'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Details from './Details.js';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
    },{
      path: "/details",
      element: (
        <Details />
      ),
    }
  ]);
  return <RouterProvider router={router} />
}

export default App;
