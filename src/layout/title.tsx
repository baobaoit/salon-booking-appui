import React from "react";
import { RouteObject, useMatches } from "react-router-dom";

export const Title: React.FC = () => {
  const matches: RouteObject[] = useMatches();
  const infos = matches.map((match) => match.handle?.info);
  const dataTitle = React.useMemo(() => {
    return infos[0];
  } , [infos]);
  
  return (
    <div className="flex items-start">
      <h1 className="text-heading-6-semi-bold">{dataTitle?.title}</h1>
    </div>
  );
};
