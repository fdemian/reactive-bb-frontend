import { faUnlink, faLink } from '@fortawesome/free-solid-svg-icons';

const CAN_USE_DOM = typeof window.document.createElement !== 'undefined';
const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform); //navigator.userAgentData.platform
export const SIGN = IS_APPLE ? '⌘' : 'Ctrl';

export const getLinkIcon = (isLink: boolean) => {
  if (isLink) return faUnlink;
  return faLink;
};

export interface ColorVal {
  toHexString: () => string;
}

export interface TableType {
  columns: number;
  rows: number;
}

/* TOOLBAR HELPERS */
