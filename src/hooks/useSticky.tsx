import React from "react";

export const useSticky = () => {
  const [isSticky, setSticky] = React.useState(false);
  const element = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback(() => {
    if (element.current) {
      if (window.scrollY > element.current.getBoundingClientRect().bottom) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  }, [element]);

  React.useEffect(() => {
    // window.addEventListener("scroll", _.debounce(handleScroll, 20));
    // debounce in es6
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, [handleScroll]);

  return { isSticky, element };
};
