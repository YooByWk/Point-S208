import { Route, Routes } from "react-router-dom";
import MyCard from "../pages/MyCard";
import MyAlbum from "../pages/MyAlbum";
import MyTeam from "../pages/MyTeam";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyCard />} />
      <Route path="/myAlbum" element={<MyAlbum />} />
      <Route path="/myTeam" element={<MyTeam />} />
      <Route path="*" element={<MyCard />} />
    </Routes>
  );
};

export default AuthRouter;
