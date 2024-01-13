import { Radio, List } from 'antd';

const NotificationView = () => {
  const Action = (
    <Radio.Group onChange={() => { console.log('change!'); }} value={1}>
      <Radio value={1}>Dont notify</Radio>
      <Radio value={2}>email</Radio>
      <Radio value={3}>popup</Radio>
    </Radio.Group>
  );

  const data = [
    {
      title: 'Private message',
      description: 'Notify me when someone sends a message to my inbox.',
      actions: [Action],
    },
    {
      title: 'Mention',
      description: 'Notify me when someone mentions me on a thread.',
      actions: [Action],
    },
    {
      title: 'Watched topic',
      description: 'Notify me when a watched topic gets new replies.',
      actions: [Action],
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default NotificationView;
