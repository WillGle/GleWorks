// Defines the app shell and top-level routes.
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Eager: part of the shell, or the first route users land on. Loaded upfront.
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing/Landing";

// Lazy: each route is split into its own chunk and fetched on navigation.
// Ordered high → low by how much weight they keep off the initial load.
const Archive = lazy(() => import("./components/Archive/Archive"));
const Policies = lazy(() => import("./components/Policies/Policies"));
const ServicePaused = lazy(() => import("./components/ServicePaused"));
const NotFound = lazy(() => import("./components/NotFound"));

// Component responsible for rendering the static layout and routes.
function AppLayout() {
  return (
    <>
      <Header />
      {/* Suspense catches lazily-loaded routes while their chunk is fetched */}
      <Suspense fallback={<div className="route-loading">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/service" element={<ServicePaused />} />
          <Route path="/policies/" element={<Policies />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

// Main router for the application that wraps everything inside a Router
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
