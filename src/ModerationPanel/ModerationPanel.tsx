import { useState } from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import FlaggedMessages from './Flag/FlaggedMessages';
import UserbanPanel from './Ban/UserBanPanel';
import './ModerationPanel.css';

export const Component = () => {
  const { t } = useTranslation('modcp', { keyPrefix: 'modcp' });

  const menuMap = [
    {
      key: 'banned',
      name: t('bannedUsers'),
      component: <UserbanPanel t={t} />,
    },
    {
      key: 'flagged',
      name: t('flaggedMsg'),
      component: <FlaggedMessages t={t} />,
    },
  ];

  const [selectKey, setSelectKey] = useState('banned');
  const items = menuMap.map((item) => ({
    key: item.key,
    label: (
      <div
        role="button"
        aria-label={item.key}
        onClick={() => { setSelectKey(item.key); }}
      >
        {item.name}
      </div>
    ),
  }));

  const menuItem = menuMap.find((k) => k.key === selectKey);
  const title = menuItem !== undefined ? menuItem.name : '';
  const childComponent = menuItem !== undefined ? menuItem.component : '';

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
