import PropTypes from "prop-types";
import Badge from 'antd/es/badge';
import Select from 'antd/es/select';
import './Composer.css';

const Option = Select.Option;

const colors = ['success', 'error', 'default', 'warning'];

const CategoriesDropdown = ({ category, updateCategoryFn, categories }) => {
    const handleChange = (value) => updateCategoryFn(value);
    return (
        <Select
            aria-label="Categories"
            showSearch
            className="categories-dropdown-container"
            disabled={categories.length === 0}
            placeholder={
                categories.length === 0 ? 'No categories available' : 'Select a category'
            }
            optionFilterProp="children"
            onChange={handleChange}
            value={category}
        >
            {categories.map((category, i) => (
                <Option aria-label={category.name} value={category.id} key={category.id}>
                    <Badge status={colors[i % colors.length]} text={category.name} />
                </Option>
            ))}
        </Select>
    );
};

CategoriesDropdown.propTypes = {
    category: PropTypes.shape({
       id: PropTypes.number.isRequired,
       name: PropTypes.string.isRequired,
       description: PropTypes.string.isRequired
    }),
    updateCategoryFn: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    )
}

export default CategoriesDropdown;
