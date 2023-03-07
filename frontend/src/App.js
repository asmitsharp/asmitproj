import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom"
import "./App.css"
import Home from "./pages/Home/Home"
import Navigation from "./components/shared/Navigation/Navigation"
import Authenticate from "./pages/authenticate/Authenticate"
import Activate from "./pages/activate/Activate"
import userEvent from "@testing-library/user-event"
import Rooms from "./pages/Rooms/Rooms"
import { useSelector } from "react-redux"

// const isAuth = false
// const user = {
//   activated: false,
// }
let location = useLocation

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth)
  return isAuth ? <Navigate to="/rooms" /> : children
}

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth)
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location },
      }}
    />
  )
}

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth)
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    <Navigate
      to={{
        pathname: "/activate",
        state: { from: location },
      }}
    />
  ) : (
    children
  )
}

export default App

{
  /*<Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

                <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        
        
};
        
        
        
        */
}
