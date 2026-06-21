import React from "react";

export default function Stadium3D() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/estadio3d/index.html"
        title="Estadio 3D"
        width="100%"
        height="100%"
        style={{
          border: "none",
          background: "#000"
        }}
      />
    </div>
  );
}