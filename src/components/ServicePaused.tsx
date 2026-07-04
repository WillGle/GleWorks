// Static notice for the paused commission surface.
import React from "react";
import { Link } from "react-router-dom";
import "./ServicePaused.css";

const ServicePaused: React.FC = () => {
  return (
    <main className="service-paused">
      <section className="service-paused-content">
        <h1>Commissions are paused</h1>
        <p>
          Keyboard commissions are currently paused while GleWorks is being
          rebuilt as a system engineering portfolio and project journal.
        </p>
        <p>
          Past work remains available in the archive. New service requests are
          not being accepted through this site.
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
