import PropTypes from 'prop-types';
import { Tag } from 'antd';
import format_title_string from '../utils/formats.js';
import './Topics.css';

const CategoryLink = ({ category, isMobile }) => {
    const categoryItem = category == null ? { id: '-1', name: 'Uncategorized' } : category;
    const categoryLink = `/categories/${categoryItem.id}/${format_title_string(
        categoryItem.name
    )}`;

    return (
        <a href={categoryLink}>
            <Tag color="darkgreen" className={isMobile ? '' : 'categories-link'}>
                {isMobile ? (
                    <p className={`categories-link${isMobile ? '-mobile' : ''}`}>
                        {categoryItem.name}
                    </p>
                ) : (
                    <>{categoryItem.name}</>
                )}
            </Tag>
        </a>
    );
};

CategoryLink.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    isMobile: PropTypes.bool.isRequired
};

export default CategoryLink;