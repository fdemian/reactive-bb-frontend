import { Input } from 'antd';
import '../Navbar.css';

interface SearchBarProps {
  searchText: string;
  setSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  enterPress: () => void;
  t: (key: string) => string;
}

const SearchBarComponent = ({
  searchText,
  setSearchValue,
  enterPress,
  t,
}: SearchBarProps) => {
  return (
    <span className="search-bar-navbar">
      <Input
        value={searchText}
        className="search-input-input"
        placeholder={t('searchTopics')}
        onChange={setSearchValue}
        onPressEnter={enterPress}
      />
    </span>
  );
};

export default SearchBarComponent;
