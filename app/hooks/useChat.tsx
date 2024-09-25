import { AIChatContext } from "@/contexts/AIChatContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { getDelay, TEXT_SPEED } from "@/helpers/chatHelper";
const possibleRandomMessages = ["čuj", "kuuuuuurba", "pikolino"];

const useChat = () => {
  const [message, setMessage] = useState("");
  const { message: aiMessage, setMessage: setAIMessage } =
    useContext(AIChatContext);

  useEffect(() => {
    if (aiMessage) {
      setMessage(aiMessage);
      const totalDuration = getDelay(aiMessage);

      // Set a timeout to clear aiMessage after the animation completes
      const timeout = setTimeout(() => {
        setAIMessage("");
      }, totalDuration);

      return () => clearTimeout(timeout);
    } else {
      const interval = setInterval(() => {
        const randomMessage =
          possibleRandomMessages[
            Math.floor(Math.random() * possibleRandomMessages.length)
          ];

        setMessage(randomMessage);
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [aiMessage, setAIMessage]);

  const sequence = useMemo(() => {
    if (!message) return [];

    const words = message.split(/\s+/);
    const chunks =
      words.length > 5
        ? Array.from({ length: Math.ceil(words.length / 5) }, (_, i) =>
            words.slice(i * 5, i * 5 + 5).join(" ")
          )
        : [message];

    const delay = TEXT_SPEED;
    const finalSequence: (string | number)[] = [];

    ["", ".", "..", "...", "..", "."].forEach((dot) => {
      finalSequence.push(dot, delay);
    });

    chunks.forEach((chunk) => {
      const letters = chunk.split("");

      const gradualMessageArray = letters.map((letter, index) =>
        letters.slice(0, index + 1).join("")
      );

      gradualMessageArray.forEach((message) => {
        finalSequence.push(message, delay);
      });

      finalSequence.push(1000);

      gradualMessageArray.reverse().forEach((message) => {
        finalSequence.push(message, delay / 10);
      });

      finalSequence.push("", delay);
    });

    return finalSequence;
  }, [message]);

  return { sequence, message };
};

export default useChat;
