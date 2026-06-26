import HomeMain from './Home/HomeMain'
import Login from './Login&signup/Login.jsx'
import Signup from './Login&signup/Signup.jsx'
import Verifyemail from './Login&signup/verifyemail.jsx'
import Navbar from './Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Login&signup/Dashboard.jsx'
import PrivateRoute from './Login&signup/PrivateRoute.jsx'
import Editprofile from "./Login&signup/Editprofile.jsx"
// import Catalog from "./Home/Catalog.jsx"
import About from './Home/About.jsx'
import Contact from './Home/Contact.jsx'
import Forgotpassword from './Login&signup/Forgotpassword.jsx'
import Catalog from "./Home/Catalog.jsx"

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
          path: "Forgotpassword/:token",
          element: <Forgotpassword />
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
          path: "edit-profile/:id",
          element:<Editprofile/>
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
