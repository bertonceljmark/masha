import React, { RefObject, useEffect } from "react";
import useCharacterMovement from "@/app/hooks/useCharacterMovement";
import CharacterPart from "./characterPart";
import CharacterText from "./characterText";

interface CharacterProps {
  containerRef: RefObject<HTMLDivElement>;
  onCharacterMove: (rect: DOMRect) => void;
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
  characterRef,
  onCharacterMove,
}: CharacterProps) => {
  const { action, isIdle, twitch, currentPosition } = useCharacterMovement({
    characterRef,
    containerRef,
  });

  useEffect(() => {
    if (currentPosition.x && currentPosition.y && characterRef.current) {
      onCharacterMove(characterRef.current.getBoundingClientRect());
    }
  }, [currentPosition.x, currentPosition.y, characterRef, onCharacterMove]);

  return (
    <div
      className="w-32 h-32 absolute cursor-pointer"
      style={{
        transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
      }}
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
    </div>
  );
};

export default Character;
