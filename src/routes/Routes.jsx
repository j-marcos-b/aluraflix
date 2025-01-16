import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NewVideo from "../pages/newVideo/NewVideo";
import Header from "../componentes/header/Header";
import Footer from "../componentes/footer/Footer";
import NotFound from "../pages/notFound/NotFound";
import Popup from "../componentes/popup/Popup";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />
      <Route
        path="/new-video"
        element={
          <>
            <Header />
            <NewVideo />
            <Footer />
          </>
        }
      />
      <Route
        path="/edit-video/:id"
        element={
          <>
            <Header />
            <Popup />
            <Footer />
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
