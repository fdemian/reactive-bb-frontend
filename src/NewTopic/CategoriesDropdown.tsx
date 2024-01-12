import Badge from 'antd/es/badge';
import Select from 'antd/es/select';
import './Composer.css';
import { CategoryType } from "../Topics/topicTypes";

const Option = Select.Option;

const colors:BadgeStatusTypes[] = ['success', 'error', 'default', 'warning'];

type CategoriesDropdownProps = {
    category: CategoryType;
     updateCategoryFn: (val:CategoryType) => void;
     categories: CategoryType[];
};

type BadgeStatusTypes = "success" | "error" | "default" | "warning" | "processing" | undefined;

const getBadgeStatus = (colors:BadgeStatusTypes[], i:number):BadgeStatusTypes => {
    const status:BadgeStatusTypes = colors[i % colors.length];
    if(status !== undefined){
        return status;
    }

    return "error";
}

const CategoriesDropdown = ({ category, updateCategoryFn, categories }:CategoriesDropdownProps) => {
    
    const handleChange = (value:CategoryType) => updateCategoryFn(value);
    
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
                    <Badge status={getBadgeStatus(colors, i)} text={category.name} />
                </Option>
            ))}
        </Select>
    );
};

export default CategoriesDropdown;
