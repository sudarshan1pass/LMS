import HomeMain from './Home/HomeMain'
import Login from './Login&signup/Login.jsx'
import Signup from './Login&signup/Signup.jsx'
import Verifyemail from './Login&signup/verifyemail.jsx'
import Navbar from './Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Login&signup/Dashboard.jsx'
import PrivateRoute from './Login&signup/PrivateRoute.jsx'
import Catalog from './Home/Catalog.jsx'
import About from './Home/About.jsx'
import Contact from './Home/Contact.jsx'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <HomeMain />
        },
        {
          path: "Signup",
          element: <Signup />
        },
        {
          path: "verify-email",
          element: <Verifyemail />
        },
         {
          path: "about",
          element: <About />
        },
        {
          path: "Catalog",
          element: <Catalog />
        },
        {
          path: "contact",
          element: <Contact />
        },

        {
          path: "Login",
          element: <Login />
        },
        {
          path: "dashboard/:id",
          element: (
            <PrivateRoute>
             { <Dashboard />}
            </PrivateRoute>
          )
        }
      ]
    },
  ])

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
