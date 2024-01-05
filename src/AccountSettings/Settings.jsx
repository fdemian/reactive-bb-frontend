import { useState } from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import ProfileView from './Views/Profile/ProfileView';
import SecurityView from './Views/SecurityView';
//import BindingView from './Views/BindingView';
//import NotificationView from './Views/NotificationView'
import './Settings.css';

export const Settings = () => {
    const { t } = useTranslation('accountSettings', { keyPrefix: 'settings.options' });

    const menuMap = [
        { key: 'profile', name: t('profile'), component: <ProfileView /> },
        { key: 'securityView', name: t('securityView'), component: <SecurityView /> },
    ];

    /*,
     * binding: { name:"Binding Accounts", component:  <BindingView /> },
     *notification: { name: "Notification View", component:  <NotificationView /> },
     */

    const [selectKey, setSelectKey] = useState('profile');
    const items = menuMap.map((item) => ({
        key: item.key,
        label: <div onClick={() => setSelectKey(item.key)}>{item.name}</div>,
    }));

    const menuItem = menuMap.find((k) => k.key === selectKey);
    const title = menuItem.name;
    const childComponent = menuItem.component;

    return (
        <div className="info-main">
            <div className="leftmenu">
                <Menu mode="inline" selectedKeys={[selectKey]} items={items} />
            </div>
            <div className="right">
                <div className="title">{title}</div>
                {childComponent}
            </div>
        </div>
    );
};
