interface HealthBarProps {
  health: number;
}

const HealthBar = ({ health }: HealthBarProps) => {
  const healthWithMaxValue = Math.min(health, 8);
  const positionFromHealth = `-${healthWithMaxValue * 16}px`;

  return (
    <div
      className="health-bar"
      style={{ backgroundPositionY: positionFromHealth }}
    />
  );
};

export default HealthBar;
