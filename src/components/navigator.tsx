import React from "react";

type NavigatorProps = {
    current: number;
    total: number;
}
const ActiveNavigator: React.FC = () => <div className='w-[41px] h-[10px] rounded-[50px] bg-surface-primary'></div>
const InactiveNavigator: React.FC = () => <div className='w-[10px] h-[10px] bg-surface-high rounded-full'></div>

export const Navigator = React.memo<NavigatorProps>(({
    current,
    total
}) => {
    const arr = React.useMemo(() => new Array(total).fill(0), [total])
    return (
        <div className='flex space-x-2 justify-center'>
            {
                arr.map((e, i) => <React.Fragment key={i}> {i + 1 === current ? <ActiveNavigator /> : <InactiveNavigator />} </React.Fragment>)
            }
        </div>
    )
})
