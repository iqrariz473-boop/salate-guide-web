import { AlertIcon } from "./Icons.jsx";
import "./ErrorMessage.css";

/** Consistent error/empty-state banner used across prayer-time views. */
function ErrorMessage({ message = "Something went wrong. Please try again.", onRetry }) {
  return (
    <div className="error-message" role="alert">
      <AlertIcon aria-hidden="true" />
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
