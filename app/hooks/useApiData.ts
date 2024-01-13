import { useEffect, useState } from "react";

const useApiData = () => {
  const [health, setHealth] = useState(0);
  const [wineGlassesNumber, setWineGlassesNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch("/api/stats", { cache: "no-cache" });
      const data = await response.json();

      setHealth(data.data.hungerLevel);
      setWineGlassesNumber(data.data.itemCount);
    };

    fetchData();
    setLoading(false);
  }, []);

  const feed = async () => {
    setHealth((prev) => prev + 1);
    await fetch("/api/feed", { cache: "no-cache" });
  };

  return {
    health,
    wineGlassesNumber,
    loading,
    feed,
  };
};

export default useApiData;
