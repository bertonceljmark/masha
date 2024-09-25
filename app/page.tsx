"use client";
export const dynamic = "force-dynamic";
import Character from "@/components/character";
import Overlay from "@/components/overlay";
import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import PlaygroundContainer from "@/components/playgroundContainer";
import WineGlasses from "@/components/wineGlasses";
import useApiData from "./hooks/useApiData";
import AiInput from "@/components/AiInput";
import { AIChatProvider } from "@/contexts/AIChatContext";

export default function Home() {
  const characterRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<RefObject<HTMLDivElement>[]>([]);
  const [containerRef, setContainerRef] =
    useState<RefObject<HTMLDivElement> | null>(null);

  const { wineGlassesNumber, feed, health, loading } = useApiData();

  const onCharacterMove = useCallback(() => {
    if (itemsRef.current && characterRef?.current) {
      const characterRect = characterRef.current.getBoundingClientRect();
      itemsRef.current.forEach((item) => {
        if (item.current) {
          const itemRect = item.current.getBoundingClientRect();

          if (
            itemRect.x < characterRect.x + characterRect.width &&
            itemRect.x + itemRect.width > characterRect.x &&
            itemRect.y < characterRect.y + characterRect.height &&
            itemRect.y + itemRect.height > characterRect.y
          ) {
            feed();
            item.current.remove();
          }
        }
      });
    }
  }, [characterRef, feed]);

  const getWineGlassPosition = useCallback(() => {
    const x =
      (
        Math.random() *
        (containerRef?.current ? containerRef.current.offsetWidth - 40 : 0)
      ).toFixed(1) + 20;
    const y =
      (
        Math.random() *
        (containerRef?.current ? containerRef.current.offsetHeight - 80 : 0)
      ).toFixed(1) + 40;

    return { x, y };
  }, [containerRef]);

  const wineGlassesPositions = useMemo(() => {
    return [...Array(wineGlassesNumber > 0 ? wineGlassesNumber : 0)].map(
      (_, i) => ({
        ...getWineGlassPosition(),
        id: i,
      })
    );
  }, [wineGlassesNumber, getWineGlassPosition]);

  return (
    <AIChatProvider>
      <PlaygroundContainer setContainerRef={setContainerRef}>
        <WineGlasses
          wineGlassesNum={wineGlassesNumber}
          itemsRef={itemsRef}
          wineGlassesPositions={wineGlassesPositions}
        />
        {containerRef && (
          <Character
            containerRef={containerRef}
            onCharacterMove={onCharacterMove}
            characterRef={characterRef}
          />
        )}
      </PlaygroundContainer>
      <Overlay health={health} />
      <AiInput />
    </AIChatProvider>
  );
}
