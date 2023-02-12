import { useMemo, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
type DrawType = "Marker" | "Polygon" | "Polyline";
export default function Draw() {
  const positionRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div>
        <Autocomplete>
          <input ref={positionRef} />
        </Autocomplete>
      </div>
    </div>
  );
}
