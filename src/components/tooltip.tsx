import { Tooltip, TooltipProps } from "antd"
import { ICAlertCircle } from "../icons/index";
import classNames from "classnames";
import styled from "styled-components";

const WrapperTooltip = styled(Tooltip)`
`;

type BookingTooltipProps = TooltipProps & {
    content: string;
    childNode: React.ReactNode;
    hasInfoIcon?: boolean;
    theme?: 'gray' | 'black',
    level?: 'low' | 'high',
    sign?: 'info' | 'error'
}

export const BookingTooltip: React.FC<BookingTooltipProps> = ({ 
    content, 
    childNode, 
    hasInfoIcon = false, 
    theme = 'gray', 
    style,
    level = 'low',
    sign = 'info',
    ...props 
}) => {
    return (
        <WrapperTooltip placement="bottom"
            overlayClassName={theme}
            // open={true}
            overlayStyle={{ maxWidth: '358px', maxHeight: '300px' }}
            overlayInnerStyle={{ 
                padding: '8px 16px', 
                background: level === 'low' ? 'var(--tc-system-info-50)' : 'var(--hr-surface-info)',
                borderRadius: '4px',
                overflow: 'auto',
                boxShadow: '0px 1px 2px -1px rgba(17, 12, 34, 0.08)',
            }}
            title={
                <span className="grid grid-cols-[auto_auto] gap-[10px] items-center text-left">
                    {hasInfoIcon && <ICAlertCircle fill={sign === 'info' ? "var(--text-info)" : "var(--system-error-500)"} />}
                    <span 
                        className={classNames([
                            'text-sub',
                            {
                                'text-info': level === 'low',
                                'text-white': level === 'high',
                                'text-error': sign === 'error'
                            }
                        ])}
                    >
                        {content}
                    </span>
                </span>
            } {...props}>
            {childNode}
        </WrapperTooltip>
    )
}
