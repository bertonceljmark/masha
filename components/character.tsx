import React, { MouseEvent, RefObject, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import useCharacterMovement from "@/app/hooks/useCharacterMovement";
import CharacterPart from "./characterPart";
import useChat from "@/app/hooks/useChat";
import CharacterText from "./characterText";

interface CharacterProps {
  containerRef: RefObject<HTMLDivElement>;
}

const parts = [
  "character",
  "shirt",
  "pants",
  "shoes",
  "hair",
  "lipstick",
  "eyes",
  "blush",
];
const Character = ({ containerRef }: CharacterProps) => {
  const characterRef = useRef<HTMLDivElement>(null);

  const {
    destinationCoordinates,
    transitionDuration,
    action,
    isIdle,
    twitch,
    handleAnimationEnd,
    handleAnimationStart,
  } = useCharacterMovement({
    characterRef,
    containerRef,
  });

  return (
    <motion.div
      className="w-32 h-32 absolute cursor-pointer"
      animate={{ x: destinationCoordinates?.x, y: destinationCoordinates?.y }}
      transition={{ duration: transitionDuration }}
      onAnimationComplete={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
      ref={characterRef}
    >
      {parts.map((part) => (
        <CharacterPart
          key={part}
          action={action}
          part={part}
          idle={isIdle}
          twitch={twitch}
        />
      ))}
      <div className="absolute m-auto left-0 right-0 top-0 bottom-0 char-shadow" />
      <CharacterText />
    </motion.div>
  );
};

export default Character;
