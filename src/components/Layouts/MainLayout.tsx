import { Outlet } from "react-router-dom";
import Footer from "../Ui/Footer";
import Header from "../Ui/Header";

const MainLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/> 
    <Footer/>
    </>
  );
};

export default MainLayout;