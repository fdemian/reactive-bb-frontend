import { List } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Renderer from '../Editor/Renderer';

type SearchResultsType = {
  id: number;
  text: string;
  topicId: number;
  topic: string;
  total: number;
};

type SearchResultsData = {
  data: SearchResultsType[];
  t: (key: string) => string;
};

const SearchResults = ({ data, t }: SearchResultsData) => {
  if (data.length === 0) return <h1>{t('noMatch')}</h1>;

  return (
    <List
      header={<div>Search results</div>}
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item: SearchResultsType) => (
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

export default SearchResults;
