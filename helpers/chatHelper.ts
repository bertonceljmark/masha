export const TEXT_SPEED = 50;

export const getDelay = (text: string) => {
  const dotsDuration = 5 * TEXT_SPEED;
  const messageDisplayDuration = text.length * TEXT_SPEED;
  const pauseDuration = 2000;
  const reverseDuration = text.length * TEXT_SPEED;
  const totalDuration =
    dotsDuration + messageDisplayDuration + pauseDuration + reverseDuration;

  return totalDuration;
};
