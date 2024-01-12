import { ReactNode, RefObject, useEffect, useRef } from "react";

interface AppContainerProps {
  children: ReactNode;
  setContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
}

const AppContainer = ({ children, setContainerRef }: AppContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRef(containerRef);
    }
  }, [containerRef, setContainerRef]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full relative z-10" ref={containerRef}>
        {children}
      </div>
      {/* Items at random locations inside beach, not overlapping */}
      <div className="w-full h-full beach z-0" />
    </div>
  );
};

export default AppContainer;
