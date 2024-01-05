import PropTypes from "prop-types";
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Renderer from '../Editor/Renderer';

const SearchResults = ({ data, t }) => {
    return (
        <List
            header={<div>Search results</div>}
            itemLayout="vertical"
            dataSource={data}
            locale={{
                emptyText: t('noMatch')
            }}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        description={
                            <h2>
                                <FontAwesomeIcon icon={faComment} /> &nbsp;
                                <Link aria-label="Result post link" to={`/postlink/${item.id}`}>
                                    {item.topic}
                                </Link>
                            </h2>
                        }
                    />
                    <Renderer content={item.text} />
                </List.Item>
            )}
        />
    );
};

SearchResults.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
       id: PropTypes.number.isRequired,
       text: PropTypes.string.isRequired,
       topicId: PropTypes.number.isRequired,
       topic: PropTypes.string.isRequired
      })
    ),
    t: PropTypes.func.isRequired
};

export default SearchResults;
