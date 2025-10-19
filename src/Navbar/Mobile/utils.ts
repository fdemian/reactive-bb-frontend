import { ReactElement } from 'react';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export interface GetItemReturnProps {
  label: ReactElement;
  key: string;
  icon: any;
  children?: MenuItem[];
  disabled?: boolean;
}

export function getItem(
  label: ReactElement,
  key: string,
  icon: any,
  _children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  const children = _children === undefined ? [] : _children;
  return {
    key,
    icon,
    children,
    label,
    disabled,
  };
}
