import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

const useIntersection = (threshold: number) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const { ref, entry } = useIntersectionObserver({ threshold });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setIsIntersected(true);
    }
  }, [entry]);

  return { ref, isIntersected };
};

export default useIntersection;