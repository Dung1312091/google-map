/*global google*/

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
  Polygon,
  Polyline,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import MyLocationIcon from "./access/images/my-location.png";
import Draw, { OnDrawData } from "./addPostion";
import {
  Mask,
  MASKS,
  CENTER,
  POLYGON_OPTIONS,
  POLYGON_PATHS,
  POLYLINE_OPTIONS,
  POLYLINE_PATHS,
  Coordinates,
} from "./mockData";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [positionInfo, setPositionInfo] = useState<Mask | null>(null);
  const [masks, setMasks] = useState<Mask[]>(MASKS);
  const [polygons, setPolygons] = useState<Coordinates[][]>(POLYGON_PATHS);
  const [polylines, setPolylines] = useState<Coordinates[][]>(POLYLINE_PATHS);
  const handleClickMarker = useCallback(
    (e: google.maps.MapMouseEvent, mask: Mask) => {
      setPositionInfo(mask);
    },
    []
  );
  if (!isLoaded) {
    return <div>loading...</div>;
  }
  const handleDraw = (data: OnDrawData) => {
    switch (data.type) {
      case "Marker": {
        const mask: Mask = {
          name: data.location!,
          position: {
            lat: Number.parseFloat(data.lat),
            lng: Number.parseFloat(data.lng),
          },
        };
        const newMask = [...masks, mask];
        setMasks(newMask);
        console.log(newMask);
        map?.panTo(mask.position);
        break;
      }

      case "Polygon": {
        const polygon = [
          {
            lat: Number.parseFloat(data.lat1),
            lng: Number.parseFloat(data.lng1),
          },
          {
            lat: Number.parseFloat(data.lat2),
            lng: Number.parseFloat(data.lng2),
          },
          {
            lat: Number.parseFloat(data.lat3),
            lng: Number.parseFloat(data.lng3),
          },
          {
            lat: Number.parseFloat(data.lat1),
            lng: Number.parseFloat(data.lng1),
          },
        ];

        const newPolygon = [...polygons, polygon];
        setPolygons(newPolygon);
        map?.panTo(polygon[0]);
        break;
      }

      case "Polyline": {
        const polyline = [
          {
            lat: Number.parseFloat(data.lat1),
            lng: Number.parseFloat(data.lng1),
          },
          {
            lat: Number.parseFloat(data.lat2),
            lng: Number.parseFloat(data.lng2),
          },

          {
            lat: Number.parseFloat(data.lat3),
            lng: Number.parseFloat(data.lng3),
          },
        ];

        const newPolyline = [...polylines, polyline];
        setPolylines(newPolyline);
        map?.panTo(polyline[0]);
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className="flex min-h-screen">
      <Draw onDraw={handleDraw} />

      <GoogleMap
        center={CENTER}
        zoom={15}
        mapContainerStyle={{ width: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
        onClick={() => setPositionInfo(null)}
      >
        {masks.map((mask, index) => {
          const icon = mask.name === "New York" ? MyLocationIcon : "";
          const animation =
            mask.name === "New York"
              ? google.maps.Animation.BOUNCE
              : google.maps.Animation.DROP;

          return (
            <Marker
              position={mask.position}
              key={index}
              icon={icon}
              animation={animation}
              onClick={(e: google.maps.MapMouseEvent) => {
                handleClickMarker(e, mask);
              }}
            />
          );
        })}

        {positionInfo && (
          <InfoWindow
            position={positionInfo.position}
            onUnmount={() => {
              setPositionInfo(null);
            }}
          >
            <div style={{ maxWidth: 280 }}>
              <h3 className="my-0 text-base font-bold text-black-400 pb-2">
                {positionInfo.name}
              </h3>
              <div className="mb-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <a
                href={`https://maps.google.com/maps?ll=${positionInfo.position.lat},${positionInfo.position.lng}&z=15&t=m&hl=en-US&gl=US&mapclient=apiv3`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline "
              >
                View on Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
        {polygons.map((polygon, index) => {
          return (
            <Polygon key={index} paths={polygon} options={POLYGON_OPTIONS} />
          );
        })}
        {polylines.map((polyline, index) => {
          return (
            <Polyline key={index} path={polyline} options={POLYLINE_OPTIONS} />
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default App;
