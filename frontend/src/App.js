import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Layout } from "./components/jadori/Layout";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Product from "./pages/Product";
import Lend from "./pages/LendWorld";
import Closet from "./pages/Closet";
import Creators from "./pages/Creators";
import RentWorld from "./pages/RentWorld";
import BuyWorld from "./pages/BuyWorld";
import HowRentingWorks from "./pages/HowRentingWorks";
import HowLendingWorks from "./pages/HowLendingWorks";
import HowBuyingWorks from "./pages/HowBuyingWorks";
import CreateListing from "./pages/CreateListing";
import Register from "./pages/Register";
import RenterDashboard from "./pages/RenterDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import Saved from "./pages/Saved";
import Support from "./pages/Support";
import Authenticity from "./pages/AuthenticityExperience";
import StyleGuide from "./pages/StyleGuide";
import InfoPage from "./pages/InfoPage";

const INFO = ["about", "press", "faq", "privacy", "terms", "legal"];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<RentWorld />} />
          <Route path="/how-renting-works" element={<HowRentingWorks />} />
          <Route path="/how-lending-works" element={<HowLendingWorks />} />
          <Route path="/how-buying-works" element={<HowBuyingWorks />} />
          <Route path="/rent/all" element={<Catalogue />} />
          <Route path="/buy" element={<BuyWorld />} />
          <Route path="/buy/all" element={<Catalogue />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/bag/:id" element={<Product />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/closet/:slug" element={<Closet />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/lend/new" element={<CreateListing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/renter" element={<RenterDashboard />} />
          <Route path="/account/lender" element={<LenderDashboard />} />
          <Route path="/account/saved" element={<Saved />} />
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
