import { Breadcrumb } from "antd";
import { Link, RouteObject, useMatches } from "react-router-dom";

export const Breadcrumbs: React.FC = () => {
  
  const matches: RouteObject[] = useMatches();
  const crumbs = matches.map((match) => match.handle?.crumbs);
  const routesInfos = crumbs.reduce((acc, crumb) => {
    if (crumb) {
      acc.push(...crumb);
    }
    return acc;
  }
  , []);
  
  return (
    <div className="flex items-start">
      <Breadcrumb style={{ margin: '16px' }} items={routesInfos}>
        {
          routesInfos.map((routeInfo: any, index: number) => {
            return (
              <Breadcrumb.Item key={index}>
                <Link to={routeInfo.path}>{routeInfo.label}</Link>
              </Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
    </div>
  );
};
