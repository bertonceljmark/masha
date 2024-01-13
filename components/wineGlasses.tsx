import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import NoSsr from "./noSsr";

interface WineGlassesProps {
  wineGlassesNum: number;
  wineGlassesPositions: { x: string; y: string; id: number }[];
  itemsRef: MutableRefObject<RefObject<HTMLDivElement>[]>;
}

const WineGlasses = ({
  wineGlassesNum,
  wineGlassesPositions,
  itemsRef,
}: WineGlassesProps) => {
  return (
    <NoSsr>
      {wineGlassesNum > 0 &&
        [...Array(wineGlassesNum)].map((_, i) => (
          <div
            key={i}
            style={{
              left: `${wineGlassesPositions?.[i]?.x}px`,
              top: `${wineGlassesPositions?.[i]?.y}px`,
              zIndex: 5,
            }}
            ref={(el) => {
              if (el) {
                itemsRef.current[i] = { current: el };
              }
            }}
            className="wine-glass"
          />
        ))}
    </NoSsr>
  );
};

export default WineGlasses;
