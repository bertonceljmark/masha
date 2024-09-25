import { useState } from "react";
import HealthBar from "./healthBar";
import AiInput from "./AiInput";

interface OverlayProps {
  health: number;
}
const Overlay = ({ health }: OverlayProps) => {
  return (
    <div className="w-full h-full pointer-events-none bg-transparent absolute top-0 left-0 z-50">
      <HealthBar health={health} />
      <AiInput />
    </div>
  );
};

export default Overlay;
