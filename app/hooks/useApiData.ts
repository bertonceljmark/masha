import { useEffect, useState } from "react";

const useApiData = () => {
  const [health, setHealth] = useState(0);
  const [wineGlassesNumber, setWineGlassesNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/stats", { cache: "no-cache" });
      const data = await response.json();

      setHealth(data.data.hungerLevel);
      setWineGlassesNumber(data.data.itemCount);
    };

    fetchData();
  }, []);

  const feed = async () => {
    setHealth((prev) => prev + 1);
    await fetch("/api/feed", { cache: "no-cache" });
  };

  return {
    health,
    wineGlassesNumber,
    feed,
  };
};

export default useApiData;
