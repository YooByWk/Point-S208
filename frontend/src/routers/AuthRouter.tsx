import { Route, Routes } from "react-router-dom";
import MyCard from "../pages/MyCard";
import MyAlbum from "../pages/MyAlbum";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/tercero" element={<MyAlbum />} />
      <Route path="/newTab" element={<MyAlbum />} />
      <Route path="*" element={<MyCard />} />
    </Routes>
  );
};

export default AuthRouter;
