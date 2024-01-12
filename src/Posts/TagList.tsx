import Tag from 'antd/es/tag';

type TagListProps = {
    tags: string;
};

const TagList = ({ tags }:TagListProps) => {
    if (!tags) return null;

    return (
        <span className="posts-tags">
      {tags.split(',').map((t) => (
          <Tag color="blue" className="posts-tag" key={t}>
              {t}
          </Tag>
      ))}
    </span>
    );
};

export default TagList;
