import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useAuth } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

function App() {
  const { isSignedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isSignedIn ? <HomePage /> : <LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;