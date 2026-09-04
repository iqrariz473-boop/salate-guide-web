import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./pages.css";

function NotFound() {
  return (
    <div className="page static-page">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="container" style={{ textAlign: "center" }}>
        <h2>Page not found</h2>
        <p style={{ margin: "14px 0 24px" }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
