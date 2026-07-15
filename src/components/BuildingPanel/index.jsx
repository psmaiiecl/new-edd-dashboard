import { HammerIcon } from "lucide-react";

export default function BuildingPanel() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "0 10px",
      }}
    >
      <h2>En construcción ...</h2>
      <HammerIcon />
    </div>
  );
}
