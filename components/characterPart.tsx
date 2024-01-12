interface CharacterPartProps {
  action: string;
  part: string;
  idle: boolean;
  twitch: boolean;
}

const CharacterPart = ({ action, part, idle, twitch }: CharacterPartProps) => {
  return (
    <div
      className={`w-64 h-64 ${part} absolute ${action} absolute m-auto left-0 right-0 top-0 bottom-0 ${
        idle ? "idle" : ""
      } ${twitch ? "twitch" : ""}`}
    />
  );
};

export default CharacterPart;
