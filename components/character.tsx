import React, {
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import useCharacterMovement from "@/app/hooks/useCharacterMovement";
import CharacterPart from "./characterPart";
import CharacterText from "./characterText";

interface CharacterProps {
  containerRef: RefObject<HTMLDivElement>;
  onCharacterStop: (rect: DOMRect) => void;
  characterRef: RefObject<HTMLDivElement>;
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
const Character = ({
  containerRef,
  onCharacterStop,
  characterRef,
}: CharacterProps) => {
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

  useEffect(() => {
    if (isIdle && characterRef.current) {
      onCharacterStop(characterRef.current.getBoundingClientRect());
    }
  }, [isIdle, characterRef, onCharacterStop]);
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
