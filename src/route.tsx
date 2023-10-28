import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/chat",
    element: <Chats/>,
  },
]);

export default router;