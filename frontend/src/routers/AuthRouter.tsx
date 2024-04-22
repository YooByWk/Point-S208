import { Route, Routes } from "react-router-dom";
import MyCard from "../pages/MyCard";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<MyCard />} />
    </Routes>
  );
};

export default AuthRouter;
