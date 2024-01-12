import {
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UseCharacterMovementProps {
  characterRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
}

const MOVE_SPEED = 80;

const useCharacterMovement = ({
  characterRef,
  containerRef,
}: UseCharacterMovementProps) => {
  const [lastMoveTime, setLastMoveTime] = useState<number>(Date.now());
  const [isIdle, setIsIdle] = useState<boolean>(true);
  const [twitch, setTwitch] = useState<boolean>(false);
  const [destinationCoordinates, setDestinationCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const destinationCoordinatesWithOffset = useMemo(() => {
    if (!destinationCoordinates || !characterRef.current) {
      return null;
    }

    const characterRect = characterRef.current.getBoundingClientRect();

    return {
      x: destinationCoordinates.x - characterRect.width / 2,
      y: destinationCoordinates.y - characterRect.height / 2,
    };
  }, [destinationCoordinates, characterRef]);

  const handleContainerClick = useCallback(
    (e: MouseEvent): void => {
      if (
        characterRef.current &&
        characterRef.current.contains(e.target as Node)
      ) {
        setTwitch(true);
        setTimeout(() => {
          setTwitch(false);
        }, 1000);
      } else if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        setTimeout(() => {
          setIsIdle(false);
          setLastMoveTime(Date.now());
        });

        setDestinationCoordinates({ x, y });
      }
    },
    [characterRef, containerRef]
  );

  const handleContainerScreenPress = useCallback(
    (e: TouchEvent): void => {
      if (
        characterRef.current &&
        characterRef.current.contains(e.target as Node)
      ) {
        setTwitch(true);
        setTimeout(() => {
          setTwitch(false);
        }, 1000);
      } else if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        const x = e.touches[0].clientX - containerRect.left;
        const y = e.touches[0].clientY - containerRect.top;

        setDestinationCoordinates({ x, y });
      }
    },
    [containerRef, characterRef]
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener(
        "click",
        handleContainerClick as unknown as EventListener
      );
      containerRef.current.addEventListener(
        "touchstart",
        handleContainerScreenPress
      );
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "click",
          handleContainerClick as unknown as EventListener
        );
        containerRef.current.removeEventListener(
          "touchstart",
          handleContainerScreenPress
        );
      }
    };
  }, [containerRef, handleContainerClick, handleContainerScreenPress]);

  const transitionDuration = useMemo(() => {
    if (!destinationCoordinates) {
      return 0;
    }

    if (!characterRef.current) {
      return 0;
    }

    const characterRect = characterRef.current.getBoundingClientRect();

    const distance = Math.sqrt(
      Math.pow(destinationCoordinates.x - characterRect.left, 2) +
        Math.pow(destinationCoordinates.y - characterRect.top, 2)
    );

    return distance / MOVE_SPEED;
  }, [destinationCoordinates, characterRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTime > 5000 + transitionDuration * 1000) {
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();

          const x = Math.random() * containerRect.width;
          const y = Math.random() * containerRect.height;

          setDestinationCoordinates({ x, y });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastMoveTime, containerRef, transitionDuration]);

  const action: "left" | "right" | "up" | "down" | "idle" = useMemo(() => {
    if (!destinationCoordinatesWithOffset || !characterRef.current)
      return "idle";

    const { x, y } = destinationCoordinatesWithOffset;
    const { x: characterX, y: characterY } =
      characterRef.current.getBoundingClientRect();
    const angle = Math.atan2(y - characterY, x - characterX) * (180 / Math.PI);
    if (angle > -45 && angle < 45) return "right";
    if (angle > 45 && angle < 135) return "down";
    if (angle > 135 || angle < -135) return "left";
    if (angle < -45 && angle > -135) return "up";
    return "down";
  }, [destinationCoordinatesWithOffset, characterRef]);

  const idle = useMemo(() => {
    if (twitch) return false;
    if (action == "idle") return true;
    return isIdle;
  }, [twitch, action, isIdle]);

  const handleAnimationEnd = () => {
    setIsIdle(true);
    setLastMoveTime(Date.now());
  };

  const handleAnimationStart = () => {
    setIsIdle(false);
    setLastMoveTime(Number.MAX_SAFE_INTEGER);
  };

  return {
    destinationCoordinates: destinationCoordinatesWithOffset,
    transitionDuration,
    isIdle: idle,
    action,
    twitch,
    handleAnimationEnd,
    handleAnimationStart,
  };
};

export default useCharacterMovement;
