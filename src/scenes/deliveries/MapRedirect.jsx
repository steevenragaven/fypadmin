// MapRedirect.js
import React from "react";

const MapRedirect = ({ points }) => {
  const handleRedirect = () => {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const destinations = points.map(point => `${point.latitude},${point.longitude}`).join("/");
    const url = `${baseUrl}&destination=${destinations}`;

    window.location.href = url;
  };

  return (
    <button onClick={handleRedirect}>
      Redirect to Map
    </button>
  );
};

export default MapRedirect;
