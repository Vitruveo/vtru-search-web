import { useEffect, useState } from "react";

export const useMediaScreen = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [is4k, setIs4k] = useState(false);
  const [isHd, setIsHd] = useState(false);
  const [isFullHd, setIsFullHd] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 2160px)");
    setIs4k(media.matches);

    const listener = () => {
      setIs4k(media.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1080px)");
    setIsFullHd(media.matches);

    const listener = () => {
      setIsFullHd(media.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 720px)");
    setIsHd(media.matches);

    const listener = () => {
      setIsHd(media.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    setIsMobile(media.matches);

    const listener = () => {
      setIsMobile(media.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  return { is4k, isFullHd, isHd, isMobile };
};
