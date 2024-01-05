import PropTypes from 'prop-types';
import { Input } from 'antd';
import '../Navbar.css';

const SearchBarComponent = ({ searchText, setSearchValue, enterPress, t }) => {
    return(
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
}

SearchBarComponent.propTypes = {
    searchText: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    enterPress: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default SearchBarComponent;