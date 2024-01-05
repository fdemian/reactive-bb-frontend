import PropTypes from 'prop-types';
import { Drawer, Button, Badge } from 'antd';

const MobileCategoryDrawer = (props) => {
    const {
        categoriesData,
        categoriesDrawer,
        toggleCategoriesDrawer,
        selectCategoriesMobile,
        t
    } = props;

    return (
        <Drawer
            title="Pick a category"
            placement="bottom"
            size="70%"
            onClose={() => {}}
            open={categoriesDrawer}
            extra={
                <Button type="primary" onClick={toggleCategoriesDrawer}>
                    Close
                </Button>
            }
        >
            <>
                <Button onClick={() => selectCategoriesMobile('all')}>
                    <Badge status="processing" />
                    &nbsp; {t('allCategories')}
                </Button>
                <br />
                <br />
                {categoriesData.map((c) => (
                    <div key={`container-${c.name}`}>
                        <Button onClick={() => selectCategoriesMobile(c.name)} key={c.name}>
                            <Badge status="default" />
                            &nbsp; {c.name}
                        </Button>
                        <br />
                        <br />
                    </div>
                ))}
            </>
        </Drawer>
    );
};


MobileCategoryDrawer.propTypes = {
  categoriesData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
    })
  ),
  categoriesDrawer: PropTypes.bool.isRequired,
  toggleCategoriesDrawer: PropTypes.func.isRequired,
  selectCategoriesMobile: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default MobileCategoryDrawer;