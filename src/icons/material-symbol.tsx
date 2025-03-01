import 'material-symbols';

type MaterialSymbolProps = {
  icon: string;
}
export const ICMaterialSymbol: React.FC<MaterialSymbolProps> = ({
  icon,
}) => {
  return (
    <span className="material-symbols-rounded text-[#676472]">{icon}</span>
  );
}