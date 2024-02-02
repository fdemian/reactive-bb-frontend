import { Suspense } from 'react';
import { Select, Button, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { TopicsHeaderParams } from './topicTypes';

import './Topics.css';

const Option = Select.Option;

interface OptionType {
  children: string; 
  key:string; 
  value:string;
}

const filterOption = (input: string, option?: OptionType):boolean =>
  (option?.value ?? '').toLowerCase().includes(input.toLowerCase());


const TopicsHeader = (props: TopicsHeaderParams) => {
  const {
    isMobile,
    categories,
    categoryFilter,
    setCategoryFilter,
    toggleCategoriesDrawer,
    tr,
    isLoggedIn,
    banStatus,
  } = props;

  if (isMobile)
    return (
      <Suspense fallback={<Spin />}>
        <div className="mobile-header-buttons">
          <Button
            size="large"
            aria-label={tr('categories')}
            onClick={toggleCategoriesDrawer}
            className="mobile-categories-icon"
          >
            <FontAwesomeIcon icon={faAddressBook} />
          </Button>
          {isLoggedIn && !banStatus.banned ? (
            <Link to="/topics/new">
              <Button type="primary" size="large">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; {tr('newTopic')}
              </Button>
            </Link>
          ) : null}
        </div>
      </Suspense>
    );

  return (
    <Suspense fallback={<Spin />}>
      <div className="topics-header">
        <Link to="/categories">
          <Button className="categories-button" type="primary">
            <FontAwesomeIcon icon={faAddressBook} size="1x" />
            &nbsp; {tr('categories')}
          </Button>
        </Link>
        <Select
          showSearch
          aria-label={tr('categories')}
          className="categories-select"
          style={{ width: 150 }}
          placeholder={tr('categories')}
          optionFilterProp="children"
          defaultValue={categoryFilter}
          filterOption={filterOption}
          onChange={setCategoryFilter}
        >
          <Option value="all">{tr('allCategories')}</Option>
          {categories.map((c) => (
            <Option value={c.name} key={c.name}>
              {c.name}
            </Option>
          ))}
        </Select>
        {isLoggedIn && !banStatus.banned ? (
          <Link to="/topics/new">
            <Button className="new-topic-button" key="add" type="primary">
              + {tr('newTopic')}
            </Button>
          </Link>
        ) : null}
      </div>
    </Suspense>
  );
};

export default TopicsHeader;
