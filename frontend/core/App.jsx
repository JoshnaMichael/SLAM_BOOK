import { HashRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SlamForm from "./pages/SlamForm";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/form" element={<SlamForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}