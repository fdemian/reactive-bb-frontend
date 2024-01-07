import { Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AccountAvatar from "../../UserAvatar/UserAvatar";

type DrawerUserType = {
    avatar: string;
    username: string;
};

type DrawerToggleButtonProps = {
    openDrawer: () => void; 
    isLoggedIn: boolean; 
    user: DrawerUserType | null, 
    showBadge: boolean;
    t: (key: string) => string;
};

const DrawerToggleButton = (props: DrawerToggleButtonProps) => {
    const { openDrawer, isLoggedIn, user, showBadge, t } = props;

    return (
    <span
      aria-label={t("menuTrigger")}
      role="button"
      onClick={openDrawer}
      className="avatar-class"
    >
      {isLoggedIn && user ? (
          <Badge dot={showBadge}>
              <AccountAvatar
                  size={50}
                  shape="square"
                  avatar={user.avatar}
                  username={user.username}
              />
          </Badge>
      ) : (
          <FontAwesomeIcon icon={faBars} size="2x" color="gainsboro" aria-label={t("menuTrigger")}/>
      )}
    </span>
    );
};

export default DrawerToggleButton;