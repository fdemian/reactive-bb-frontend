import { useState } from 'react';
import { Menu } from 'antd';
import ModerationLog from './ModerationLog';
import { useTranslation } from 'react-i18next';
import './AdminPanel.css';

/*
 { key: 'ipBans', name: t('ipBans'), component: <p>IP Bans</p> },
 { key: 'socialSites', name: t('socialSites'), component: <p>Social Sites</p> }
*/

export const Component = ():React.ReactElement => {
    const { t } = useTranslation('modcp', { keyPrefix: 'admincp' });

    const menuMap = [
        {
            key: 'editedPosts',
            name: t('editedPosts'),
            component: <ModerationLog t={t} />
        }
    ];

    const [selectKey, setSelectKey] = useState('editedPosts');
    const items = menuMap.map(
        (item) => ({
            key: item.key,
            label: (
                <div
                    role="button"
                    aria-label={item.key}
                    onClick={() => setSelectKey(item.key)}
                >
                    {item.name}
                </div>
            )
        })
    );

    let menuItem = menuMap.find((k) => k.key === selectKey);
    if(menuItem === undefined)
        menuItem = menuMap[0];

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
