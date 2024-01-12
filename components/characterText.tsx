import useChat from "@/app/hooks/useChat";
import { TypeAnimation } from "react-type-animation";

const CharacterText = () => {
  const { sequence, message } = useChat();

  return (
    <div className="absolute m-auto left-0 right-0 text-black text-center text-2xl top-0">
      <TypeAnimation key={message} sequence={sequence} cursor={false} />
    </div>
  );
};

export default CharacterText;
