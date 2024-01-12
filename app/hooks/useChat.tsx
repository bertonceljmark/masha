import { useEffect, useMemo, useState } from "react";

const possibleRandomMessages = ["čuj", "kuuuuuurba", "pikolino"];

const useChat = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        possibleRandomMessages[
          Math.floor(Math.random() * possibleRandomMessages.length)
        ];

      setMessage(randomMessage);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const sequence = useMemo(() => {
    if (!message) return [];

    const dots = [".", "..", "...", "..", "."];
    const delay = 150;

    const dotsWithDelay = dots.map((dot, index) => [dot, delay]).flat();

    const messageArray = message.split("");

    const gradualMessageArray = messageArray.map((letter, index) =>
      messageArray.slice(0, index + 1).join("")
    );

    const messageArrayWithDelay = gradualMessageArray
      .map((letter) => [letter, delay])
      .flat();

    const finalSequence = [
      ...dotsWithDelay,
      ...messageArrayWithDelay,
      3000,
      ...messageArrayWithDelay.reverse(),
      "",
    ];

    return finalSequence;
  }, [message]);

  return { sequence, message };
};

export default useChat;
