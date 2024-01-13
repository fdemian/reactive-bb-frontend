import { useState, useRef } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';
import './Composer.css';

type EditableTagGroupProps = {
  initialState: string[];
  t: (key: string) => string;
  updateFn: (tags: string[]) => void;
};

const initialTags = (initialState: null | string[]) =>
  initialState === null ? [] : initialState;

const EditableTagGroup = (props: EditableTagGroupProps) => {
  const { initialState, t, updateFn } = props;
  const [tags, setTags] = useState(initialTags(initialState));
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const input = useRef(null);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== removedTag);
    setTags(newTags);
    updateFn(tags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags;

    if (
      inputValue.trim() !== '' &&
      inputValue &&
      tags.indexOf(inputValue) === -1
    ) {
      newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');
    }

    setInputVisible(false);

    if (newTags !== undefined) {
      props.updateFn(newTags);
    }
  };

  return (
    <div className="TagContainer">
      {tags.map((tag) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="ant-tag"
            key={tag}
            closable={true}
            onClose={() => handleClose(tag)}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );

        return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
      })}
      {inputVisible && (
        <Input
          aria-label="Topic tags"
          ref={input}
          type="text"
          size="large"
          role="textbox"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Button
          aria-label={t('newTag')}
          size="large"
          type="dashed"
          onClick={showInput}
          style={{ fontWeight: '600' }}
        >
          + {t('newTag')}
        </Button>
      )}
    </div>
  );
};

export default EditableTagGroup;
