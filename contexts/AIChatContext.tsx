import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AIChatContextProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (message: string) => void;
}

export const AIChatContext = createContext<AIChatContextProps>({
  message: "",
  setMessage: () => {},
  sendMessage: () => {},
});

export const AIChatProvider = ({ children }: { children: ReactNode }) => {
  const [messageHistory, setMessageHistory] = useState<OpenAiMessageType[]>([]);
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (message: string) => {
    const newMessageHistory: OpenAiMessageType[] = [
      ...messageHistory,
      { role: "user", content: message },
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessageHistory }),
    });

    const data: { reply: string } = await response.json();

    setMessage(data.reply);
    setMessageHistory(() => {
      newMessageHistory.push({ role: "assistant", content: data.reply });
      return newMessageHistory.slice(-6);
    });
  };

  return (
    <AIChatContext.Provider value={{ message, setMessage, sendMessage }}>
      {children}
    </AIChatContext.Provider>
  );
};
