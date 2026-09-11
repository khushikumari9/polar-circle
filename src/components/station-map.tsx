import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { stations } from "@/lib/portal-data";

export default function StationMap() {
  return (
    <MapContainer
      center={[10, 30]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((s) => (
        <CircleMarker
          key={s.slug}
          center={s.coords}
          radius={9}
          pathOptions={{ color: "#1d4ed8", fillColor: "#38bdf8", fillOpacity: 0.85 }}
        >
          <Popup>
            <strong>{s.name}</strong>
            <br />
            {s.region}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
