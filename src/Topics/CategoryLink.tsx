import { Tag } from 'antd';
import format_title_string from '../utils/formats';
import { CategoryType } from './topicTypes';
import './Topics.css';

type CategoryLinkProps = { category: CategoryType, isMobile: boolean };

const CategoryLink = ({ category, isMobile }:CategoryLinkProps) => {
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

export default CategoryLink;