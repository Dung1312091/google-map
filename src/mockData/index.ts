export type Mask = {
  position: Coordinates;
  name: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
export const CENTER = { lat: 40.7127281, lng: -74.0060152 };

export const MASKS: Mask[] = [
  {
    name: "New York",
    position: { lat: 40.7127281, lng: -74.0060152 },
  },

  {
    name: "Museum at Eldridge Street",
    position: { lat: 40.712978, lng: -74.002236 },
  },
  {
    name: "New Museum",
    position: { lat: 40.715108, lng: -74.006066 },
  },
  {
    name: "Hudson Square",
    position: { lat: 40.728738, lng: -74.006015 },
  },
  {
    name: "Chambers St",
    position: { lat: 40.717878, lng: -73.99194 },
  },
  {
    name: "John V. Lindsay East River Park",
    position: { lat: 40.717978, lng: -73.97194 },
  },
  {
    name: "Fulton St",
    position: { lat: 40.710728, lng: -74.006015 },
  },
  {
    name: "Canal Street",
    position: { lat: 40.720728, lng: -74.006015 },
  },
];

export const POLYGON_PATHS: Coordinates[][] = [
  [
    { lat: 40.722536, lng: -73.991864 },
    { lat: 40.720112, lng: -74.010132 },
    { lat: 40.71674, lng: -74.00207 },
    { lat: 40.722536, lng: -73.991864 },
  ],
];

export const POLYGON_OPTIONS = {
  fillColor: "lightblue",
  fillOpacity: 0.4,
  strokeColor: "yellow",
  strokeOpacity: 0.5,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

export const POLYLINE_PATHS: Coordinates[][] = [
  [
    { lat: 40.712978, lng: -74.002236 },
    { lat: 40.717878, lng: -73.99194 },
    { lat: 40.717978, lng: -73.97194 },
  ],
];

export const POLYLINE_OPTIONS = {
  strokeColor: "orange",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  // paths: POLYLINE_PATHS,
  zIndex: 1,
};
