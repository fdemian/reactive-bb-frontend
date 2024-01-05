import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AccountAvatar from "../../UserAvatar/UserAvatar";

const DrawerToggleButton = (props) => {
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

DrawerToggleButton.propTypes = {
    t: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }),
    showBadge: PropTypes.bool.isRequired
}

export default DrawerToggleButton;