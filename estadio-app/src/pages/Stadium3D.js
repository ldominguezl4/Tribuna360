import React from "react";

export default function Stadium3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 140px)",
        overflow: "hidden",
      }}
    >
      <iframe
        src={`${process.env.PUBLIC_URL}/estadio3d/index.html`}
        title="Estadio 3D"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}