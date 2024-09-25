import { useState, useContext } from "react";
import { AIChatContext } from "@/contexts/AIChatContext";

const AiInput = () => {
  const [input, setInput] = useState("");
  const { message, sendMessage } = useContext(AIChatContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (input.trim() === "") return;
    setInput("");

    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="md:w-96 pointer-events-auto absolute bottom-10 left-0 right-0 m-auto w-fit flex flex-col gap-2 md:flex-row items-center content-center">
      <input
        type="text"
        className="text-black rounded-md p-2 border-2 border-black bg-[#f5f5f530] bg-opacity-30"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-black rounded-md text-white p-2 ml-2 hover:bg-gray-800 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={message !== ""}
        type="submit"
      >
        Talk to Maša
      </button>
    </div>
  );
};

export default AiInput;
