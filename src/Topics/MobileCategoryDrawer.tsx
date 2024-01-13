import { Drawer, Button, Badge } from 'antd';
import { MobileCategoryDrawerProps } from './topicTypes';

const MobileCategoryDrawer = (props: MobileCategoryDrawerProps) => {
  const {
    categoriesData,
    categoriesDrawer,
    toggleCategoriesDrawer,
    selectCategoriesMobile,
    t,
  } = props;

  return (
    <Drawer
      title="Pick a category"
      placement="bottom"
      onClose={() => {}}
      open={categoriesDrawer}
      extra={
        <Button type="primary" onClick={toggleCategoriesDrawer}>
          Close
        </Button>
      }
    >
      <>
        <Button onClick={() => { selectCategoriesMobile('all'); }}>
          <Badge status="processing" />
          &nbsp; {t('allCategories')}
        </Button>
        <br />
        <br />
        {categoriesData.map((c) => (
          <div key={`container-${c.name}`}>
            <Button onClick={() => { selectCategoriesMobile(c.name); }} key={c.name}>
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

export default MobileCategoryDrawer;
