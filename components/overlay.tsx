import { useState } from "react";
import HealthBar from "./healthBar";

interface OverlayProps {
  health: number;
}
const Overlay = ({ health }: OverlayProps) => {
  return (
    <div className="w-full h-full pointer-events-none bg-transparent absolute top-0 left-0 z-10">
      <HealthBar health={health} />
    </div>
  );
};

export default Overlay;
