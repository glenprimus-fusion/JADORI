import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Layout } from "./components/jadori/Layout";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Product from "./pages/Product";
import Lend from "./pages/Lend";
import CreateListing from "./pages/CreateListing";
import Register from "./pages/Register";
import RenterDashboard from "./pages/RenterDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import Support from "./pages/Support";
import Authenticity from "./pages/Authenticity";
import StyleGuide from "./pages/StyleGuide";
import InfoPage from "./pages/InfoPage";

const INFO = ["about", "press", "faq", "privacy", "terms", "legal"];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Catalogue />} />
          <Route path="/buy" element={<Catalogue />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/bag/:id" element={<Product />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/lend/new" element={<CreateListing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/renter" element={<RenterDashboard />} />
          <Route path="/account/lender" element={<LenderDashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/authenticity" element={<Authenticity />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          {INFO.map((s) => <Route key={s} path={`/${s}`} element={<InfoPage slug={s} />} />)}
          <Route path="*" element={<InfoPage slug="about" />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
