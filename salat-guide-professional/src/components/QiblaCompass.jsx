import { useEffect, useState } from "react";

import { getCurrentPosition } from "../services/locationService.js";
import { CompassIcon } from "./Icons.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

import "./QiblaCompass.css";

/* =========================================
   KAABA LOCATION
========================================= */

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

/* =========================================
   HELPERS
========================================= */

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function calculateQiblaBearing(latitude, longitude) {
  const phi1 = toRadians(latitude);
  const phi2 = toRadians(KAABA_LAT);

  const deltaLambda = toRadians(KAABA_LNG - longitude);

  const y =
    Math.sin(deltaLambda) * Math.cos(phi2);

  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) *
      Math.cos(phi2) *
      Math.cos(deltaLambda);

  const bearing = toDegrees(
    Math.atan2(y, x)
  );

  return normalizeDegrees(bearing);
}

/* =========================================
   DEVICE ORIENTATION PERMISSION
========================================= */

async function requestDeviceOrientationPermission() {
  if (typeof window === "undefined") {
    return false;
  }

  const OrientationEvent =
    window.DeviceOrientationEvent;

  if (!OrientationEvent) {
    return false;
  }

  if (
    typeof OrientationEvent.requestPermission ===
    "function"
  ) {
    try {
      const permission =
        await OrientationEvent.requestPermission();

      return permission === "granted";
    } catch {
      return false;
    }
  }

  return true;
}

/* =========================================
   COMPONENT
========================================= */

function QiblaCompass() {
  const [status, setStatus] =
    useState("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [bearing, setBearing] =
    useState(null);

  const [coords, setCoords] =
    useState(null);

  const [deviceHeading, setDeviceHeading] =
    useState(null);

  const [isCompassLive, setIsCompassLive] =
    useState(false);

  /* =========================================
     DEVICE ORIENTATION
  ========================================= */

  useEffect(() => {
    if (!isCompassLive) {
      return;
    }

    function handleOrientation(event) {
      let heading = null;

      if (
        typeof event.webkitCompassHeading ===
        "number"
      ) {
        heading =
          event.webkitCompassHeading;
      } else if (
        typeof event.alpha === "number"
      ) {
        heading = 360 - event.alpha;
      }

      if (heading !== null) {
        setDeviceHeading(
          normalizeDegrees(heading)
        );
      }
    }

    window.addEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );
    };
  }, [isCompassLive]);

  /* =========================================
     FIND QIBLA
  ========================================= */

  async function handleFindQibla() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const { latitude, longitude } =
        await getCurrentPosition();

      const qiblaBearing =
        calculateQiblaBearing(
          latitude,
          longitude
        );

      setCoords({
        latitude,
        longitude,
      });

      setBearing(qiblaBearing);

      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error?.message ||
          "Unable to determine your location. Please allow location access and try again."
      );

      setStatus("error");
    }
  }

  /* =========================================
     ENABLE LIVE COMPASS
  ========================================= */

  async function handleEnableDeviceCompass() {
    setErrorMessage("");

    const granted =
      await requestDeviceOrientationPermission();

    if (!granted) {
      setErrorMessage(
        "Your browser or device did not allow compass access. You can still use the calculated Qibla bearing with a separate compass."
      );

      return;
    }

    setDeviceHeading(null);
    setIsCompassLive(true);
  }

  /* =========================================
     ARROW ROTATION
  ========================================= */

  let arrowRotation = 0;

  if (bearing !== null) {
    if (
      isCompassLive &&
      deviceHeading !== null
    ) {
      arrowRotation =
        bearing - deviceHeading;
    } else {
      arrowRotation = bearing;
    }
  }

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="qibla-compass">

      {/* =====================================
          IDLE
      ===================================== */}

      {status === "idle" && (
        <div className="qibla-compass__prompt">

          <div className="qibla-compass__prompt-icon">
            <CompassIcon
              width={32}
              height={32}
              aria-hidden="true"
            />
          </div>

          <h3>
            Find Your Qibla
          </h3>

          <p>
            Share your location to calculate
            the Qibla direction from where
            you are.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFindQibla}
          >
            Find My Qibla Direction
          </button>

        </div>
      )}

      {/* =====================================
          LOADING
      ===================================== */}

      {status === "loading" && (
        <Loading
          label="Finding your location..."
        />
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {status === "error" && (
        <ErrorMessage
          message={errorMessage}
          onRetry={handleFindQibla}
        />
      )}

      {/* =====================================
          SUCCESS
      ===================================== */}

      {status === "success" &&
        bearing !== null && (
          <div className="qibla-compass__result">

            {/* Compass Dial */}

            <div
              className="qibla-compass__dial"
              aria-label={`Qibla direction ${bearing.toFixed(
                1
              )} degrees from true north`}
            >

              {/* Directions */}

              <div className="qibla-compass__marks">

                <span className="qibla-compass__mark qibla-compass__mark--n">
                  N
                </span>

                <span className="qibla-compass__mark qibla-compass__mark--e">
                  E
                </span>

                <span className="qibla-compass__mark qibla-compass__mark--s">
                  S
                </span>

                <span className="qibla-compass__mark qibla-compass__mark--w">
                  W
                </span>

              </div>

              {/* Center */}

              <div className="qibla-compass__center">
                <span className="qibla-compass__kaaba">
                  🕋
                </span>
              </div>

              {/* Qibla Arrow */}

              <div
                className="qibla-compass__arrow"
                style={{
                  transform: `rotate(${arrowRotation}deg)`,
                }}
                aria-hidden="true"
              >
                ↑
              </div>

            </div>

            {/* Bearing */}

            <p className="qibla-compass__bearing">
              {bearing.toFixed(1)}
              &deg; from true north
            </p>

            {/* Coordinates */}

            {coords && (
              <p className="qibla-compass__coords">
                Based on your location:{" "}
                {coords.latitude.toFixed(2)},{" "}
                {coords.longitude.toFixed(2)}
              </p>
            )}

            {/* Enable Compass */}

            {!isCompassLive && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={
                  handleEnableDeviceCompass
                }
              >
                Enable Live Device Compass
              </button>
            )}

            {/* Live Compass */}

            {isCompassLive && (
              <>
                {deviceHeading === null ? (
                  <p className="qibla-compass__live-note">
                    Waiting for your device compass...
                    Move or rotate your phone slightly
                    to activate the sensor.
                  </p>
                ) : (
                  <p className="qibla-compass__live-note">
                    Live device compass active —
                    rotate your phone until the
                    arrow points toward the top.
                  </p>
                )}
              </>
            )}

            {/* Error */}

            {errorMessage && (
              <p className="qibla-compass__error">
                {errorMessage}
              </p>
            )}

            {/* Disclaimer */}

            <p className="qibla-compass__disclaimer">
              {isCompassLive
                ? "This uses your device's built-in orientation sensor. Accuracy may vary depending on your device and nearby magnetic interference."
                : "This is a calculated bearing, not a live sensor reading. Use a compass to find true north, then follow the angle shown above."}
            </p>

          </div>
        )}
    </div>
  );
}

export default QiblaCompass;
