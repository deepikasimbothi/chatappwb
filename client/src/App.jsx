import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  AuthContextProvider,
  useAuthContext,
} from "./context/authContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import "./index.css";
import store from "./app/store"
import { Provider } from "react-redux";
function App() {
  const { user } = useAuthContext();

  const routes = [
    {
      path: "/",
      element: user ? (
        <Home />
      ) : (
        <Navigate to='/login' />
      ),
    },
    {
      path: "/login",
      element: !user ? (
        <Login />
      ) : (
        <Navigate to='/' />
      ),
    },
    {
      path: "/signup",
      element: !user ? (
        <SignUp />
      ) : (
        <Navigate to='/' />
      ),
    },
    {
      path: "*",
      element: <Navigate to='/login' />,
    },
  ];

  const router =
    createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <div className='app-container'>
        <Toaster />
        <RouterProvider
          router={router}
        />
      </div>
    </Provider>
  );
}

export default App;
