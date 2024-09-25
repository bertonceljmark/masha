import {
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRef } from "react";

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
  } | null>({
    x: containerRef.current?.clientWidth || 0 / 2,
    y: containerRef.current?.clientHeight || 0 / 2,
  });

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTime > 5000 && isIdle) {
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();

          const x = Math.random() * containerRect.width;
          const y = Math.random() * containerRect.height;

          setDestinationCoordinates({ x, y });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastMoveTime, containerRef, isIdle]);

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

  const handleAnimationEnd = useCallback(() => {
    setIsIdle(true);
    setLastMoveTime(Date.now());
  }, []);

  const animationFrameId = useRef<number | null>(null);

  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: containerRef.current?.clientWidth
      ? containerRef.current.clientWidth / 2
      : 0,
    y: containerRef.current?.clientHeight
      ? containerRef.current.clientHeight / 2
      : 0,
  });

  const updatePosition = useCallback(() => {
    if (destinationCoordinatesWithOffset) {
      const { x, y } = destinationCoordinatesWithOffset;
      setCurrentPosition((prev) => {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // character reached destination
        if ((!distance || distance < 1) && !isIdle) {
          handleAnimationEnd();
          return { x: prev.x, y: prev.y };
        }

        // character is idle
        if (!distance || distance < 1) {
          return { x: prev.x, y: prev.y };
        }

        // character is moving
        if (distance && distance >= 2 && isIdle) {
          setIsIdle(false);
        }

        const angle = Math.atan2(dy, dx);
        return {
          x: prev.x + MOVE_SPEED * Math.cos(angle) * (1 / 60),
          y: prev.y + MOVE_SPEED * Math.sin(angle) * (1 / 60),
        };
      });
    }

    animationFrameId.current = requestAnimationFrame(updatePosition);
  }, [destinationCoordinatesWithOffset, handleAnimationEnd, isIdle]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(updatePosition);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updatePosition]);

  return {
    isIdle: idle,
    action,
    twitch,
    currentPosition,
  };
};

export default useCharacterMovement;
