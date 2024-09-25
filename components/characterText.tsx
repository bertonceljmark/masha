import useChat from "@/app/hooks/useChat";
import { TypeAnimation } from "react-type-animation";

const CharacterText = () => {
  const { sequence, message } = useChat();

  return (
    <div className="absolute m-auto left-0 right-0 text-black text-center text-xl top-0 flex items-center justify-center overflow-visible">
      <TypeAnimation
        key={message}
        sequence={sequence}
        cursor={false}
        wrapper="span"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "inherit",
        }}
      />
    </div>
  );
};

export default CharacterText;
