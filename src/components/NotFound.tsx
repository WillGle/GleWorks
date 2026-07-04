// Catch-all page for unknown routes.
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <main className="not-found-container" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Page not found</h1>
      <p>
        We couldn't find the page you were looking for. This is either because:
      </p>
      <ul>
        <li>
          There is an error in the URL entered into your web browser. Please
          check the URL and try again.
        </li>
        <li>The page you are looking for has been moved or deleted.</li>
      </ul>
      <p>
        You can return to our homepage by{" "}
        <Link to="/home">clicking here</Link>, or browse the archive by{" "}
        <Link to="/archive">clicking here</Link>.
      </p>
    </main>
  );
};

export default NotFound;
