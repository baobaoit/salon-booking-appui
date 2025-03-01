import React from "react";

type TScrollData = {
  scrollYPosition: number;
  scrollHeight: number;
  innerHeight: number;
};
export function useScroll(): TScrollData | undefined {
  const [scrollData, setScrollData] = React.useState<TScrollData | undefined>();

  // const debouncedScroll = _.debounce(
  //   () => {
  //     setScrollData({
  //       innerHeight: window.innerHeight,
  //       scrollHeight: Math.max(
  //         document.body.scrollHeight,
  //         document.documentElement.scrollHeight,
  //         document.body.offsetHeight,
  //         document.documentElement.offsetHeight,
  //         document.body.clientHeight,
  //         document.documentElement.clientHeight,
  //       ),
  //       scrollYPosition: window.scrollY,
  //     });
  //   },
  //   50,
  //   {
  //     trailing: true,
  //   },
  // );

  const debouncedScroll = React.useCallback(() => {
    setScrollData({
      innerHeight: window.innerHeight,
      scrollHeight: Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ),
      scrollYPosition: window.scrollY,
    });
  } , []);

  function scrollHandler(e: Event): void {
    debouncedScroll();
  }

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return scrollData;
}
