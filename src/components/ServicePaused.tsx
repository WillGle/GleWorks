// Static notice for the temporarily closed commission surface.
import React from "react";
import { Link } from "react-router-dom";
import "./ServicePaused.css";

const ServicePaused: React.FC = () => {
  return (
    <main className="service-paused">
      <section className="service-paused-content">
        <h1>Commissions are temporarily closed</h1>
        <p>
          Commissions and service requests are temporarily closed while the site
          and service pages are updated.
        </p>
        <p>
          Past work remains available in the archive.
        </p>
        <div className="service-paused-links">
          <Link to="/archive">View archive</Link>
          <Link to="/home">Back home</Link>
        </div>
      </section>
    </main>
  );
};

export default ServicePaused;
