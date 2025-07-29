import { useState, useEffect } from "react";

export function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    function handler(event) {
      setCoordinates({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }

    window.addEventListener("mousemove", handler);

    return function cleanup() {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return coordinates;
}

export default function MyComponent() {
  const { clientX, clientY } = useMouseCoordinates();

  return (
    <div style={{ cursor: "none", width: "100%", height: "100%" }}>
      <h2>Mouse X: {clientX}</h2>
      <h2>Mouse Y: {clientY}</h2>
      <div
        style={{
          position: "fixed",
          top: clientY,
          left: clientX,
          height: "45px",
          width: "45px",
          borderRadius: "50%",
          background: "blue",
          zIndex: 1,
        }}
      />
    </div>
  );
}