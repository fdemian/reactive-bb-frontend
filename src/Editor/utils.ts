import { 
    faUnlink, 
    faLink
} from '@fortawesome/free-solid-svg-icons';

const CAN_USE_DOM =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined';
const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform); //navigator.userAgentData.platform
export const SIGN = IS_APPLE ? '⌘' : 'Ctrl';

export const getLinkIcon = (isLink:boolean) => {
    if (isLink) return faUnlink;
    return faLink;
};

export type ColorVal = {
    toHexString: () => string;
};