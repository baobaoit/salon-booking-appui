import React from "react";
import { NavigateOptions, Path, useNavigate } from "react-router-dom";

type TNavigationContext = {
  navigate: (to: string | Partial<Path>, options?: NavigateOptions) => void;
  getBackUrl: () => string | undefined;
};
const NavigationContext = React.createContext<TNavigationContext>(
  {} as TNavigationContext,
);
export const useNavigation = () => React.useContext(NavigationContext);
type NavigationProviderProps = {
  children: React.ReactNode;
};
export const NavigationProvider: React.FC<NavigationProviderProps> = React.memo(
  ({ children }) => {
    const backUrl = React.useRef<string>();
    const originNavigate = useNavigate();
    const navigate = React.useCallback(
      (to: string | Partial<Path>, options?: NavigateOptions) => {
        const currentUrl = window.location.href;
        backUrl.current = currentUrl;
        originNavigate(to, options);
      },
      [originNavigate],
    );
    const getBackUrl = React.useCallback(() => {
      return backUrl.current;
    }, []);
    return (
      <NavigationContext.Provider value={{ navigate, getBackUrl }}>
        {children}
      </NavigationContext.Provider>
    );
  },
);
