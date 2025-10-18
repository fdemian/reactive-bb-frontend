import { List } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Renderer from '../Editor/Renderer';
import { ReactElement } from 'react';

type ResultType =
  | {
      __typename?: 'SearchResult' | undefined;
      id?: number | undefined;
      text?: string | undefined;
      topicId?: number | undefined;
      topic?: string | undefined;
    }
  | undefined;

interface SearchResultsType {
  __typename?: 'SearchResponse' | undefined;
  total?: number | undefined;
  results?: ResultType[] | null | undefined;
}

interface SearchResultsData {
  data: SearchResultsType | undefined;
  t: (key: string) => string;
}

const SearchResults = ({ data, t }: SearchResultsData): ReactElement => {
  if (!data || !data.results || data.results.length === 0)
    return <h1>{t('noMatch')}</h1>;

  return (
    <List
      header={<div>Search results</div>}
      itemLayout="vertical"
      dataSource={data.results}
      renderItem={(item) => (
        <List.Item key={item?.id ?? -1}>
          <List.Item.Meta
            description={
              <h2>
                <FontAwesomeIcon icon={faComment} /> &nbsp;
                <Link
                  aria-label="Result post link"
                  to={`/postlink/${item?.id}`}
                >
                  {item?.topic ?? ''}
                </Link>
              </h2>
            }
          />
          <Renderer content={item?.text ?? ''} />
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
