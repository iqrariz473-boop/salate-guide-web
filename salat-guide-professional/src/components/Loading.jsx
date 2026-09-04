import "./Loading.css";

/** Consistent loading indicator used across prayer-time and calendar views. */
function Loading({ label = "Loading prayer times..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loading;
