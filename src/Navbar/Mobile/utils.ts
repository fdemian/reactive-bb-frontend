import { ReactElement } from 'react';

type GetItemReturnProps = {
    label: ReactElement;
    key: string;
    icon: any;
    children?: any[];
    disabled?: boolean;
};

export function getItem(
    label: ReactElement,
    key: string,
    icon: any,
    children?: any[],
    disabled?: boolean
): GetItemReturnProps {
    return {
        key,
        icon,
        children,
        label,
        disabled,
    };
}
