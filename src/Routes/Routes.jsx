
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import ResetPassword from "../Components/Auth/ResetPassword";
import UserMainContainer from "../Components/userComponents/UserMainContainer";
import MyAccount from "../Components/userComponents/MyAccount";
import UpdateProfile from "../Components/userComponents/UpdateProfile";
import AddProfile from "../Components/userComponents/AddProfile";
import DeleteAccount from "../Components/userComponents/DeleteAccount";
import UpdatePassword from "../Components/userComponents/UpdatePassword";
import AdminMainContainer from "../AdminComponents/AdminMainContainer";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import CreateAlbum from "../AdminComponents/CreateAlbum";
import AllAlbums from "../AdminComponents/AllAlbums";
import AdminRoute from "./AdminRoute";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../Pages/Layout";
import AlbumDetails from "../Components/AlbumComponents/AlbumDetails";
import Favourites from "../Pages/Favourites";
import ComingSoon from "../Pages/ComingSoon";
import Trending from "../Pages/Trending";
import Playlists from "../Pages/Playlists";
import Artists from "../Pages/Artists";

let Myroutes = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/album-details",
        element:<AlbumDetails/>
      },
      {
        path: "favourites",
        element: <Favourites />
      },
      {
        path: "trending",
        element: <Trending />
      },
      {
        path: "playlists",
        element: <Playlists />
      },
      {
        path: "artists",
        element: <Artists />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "user-profile",
    element: <PrivateRoutes><UserMainContainer /></PrivateRoutes>,
    children: [
      {
        index: true,
        element: <MyAccount />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "add-profile",
        element: <AddProfile />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
      {
        path: "delete-account",
        element: <DeleteAccount />,
      }
    ],
  },
  {
    path: "admin",
    element: <AdminMainContainer />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "create-album",
        element: <CreateAlbum />,
      },
      {
        path: "all-albums",
        element: <AllAlbums />,
      },
    ],
  },
]);

export default Myroutes;
