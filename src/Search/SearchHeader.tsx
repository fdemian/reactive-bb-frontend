import PropTypes from 'prop-types';
import { Divider, Input, Select, Form } from 'antd';

const { Option } = Select;
const { Search } = Input;

type SearchHeaderProps = {
  setSearchIn: (value: string[]) => void;
  searchIn: string[];
  search: string;
  onSearch: (value: string) => void;
  t: (key: string) => string;
};

const SearchHeader = ({
  setSearchIn,
  searchIn,
  search,
  onSearch,
  t,
}: SearchHeaderProps) => {
  const handleChange = (value: string[]) => setSearchIn(value);
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const options = [
    { value: 'titles', label: t('topicTitles') },
    { value: 'posts', label: t('postSearch') },
  ];

  return (
    <>
      <Form
        role="form"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('searchIn')}
          name="searchin"
          rules={[{ required: true, message: 'Error!' }]}
        >
          <Select
            defaultValue={searchIn}
            aria-label="Search dropdown"
            key="search-option-select"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t('searchInDetail')}
            onChange={handleChange}
            optionLabelProp="label"
          >
            {options.map((p) => (
              <Option key={p.value} value={p.value}>
                {p.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={t('searchTerm')}
          name="searchterm"
          rules={[{ required: true, message: t('error') }]}
        >
          <Search
            defaultValue={search}
            name="searchterm"
            key="search-input"
            aria-label="Search input"
            placeholder={t('searchTermDetail')}
            onSearch={onSearch}
            enterButton
          />
        </Form.Item>
      </Form>
      <Divider />
    </>
  );
};

SearchHeader.propTypes = {
  setSearchIn: PropTypes.func.isRequired,
  searchIn: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default SearchHeader;
