import PropTypes from "prop-types";
import Tag from 'antd/es/tag';

const TagList = ({ tags }) => {
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

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default TagList;
