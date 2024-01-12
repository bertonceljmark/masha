"use client";
import AppContainer from "@/components/appContainer";
import Character from "@/components/character";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

export default function Home() {
  const [containerRef, setContainerRef] =
    useState<RefObject<HTMLDivElement> | null>(null);

  return (
    <AppContainer setContainerRef={setContainerRef}>
      {containerRef && <Character containerRef={containerRef} />}
    </AppContainer>
  );
}
