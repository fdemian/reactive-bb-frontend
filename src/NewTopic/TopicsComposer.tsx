import { useState, useRef, useEffect } from 'react';
import format_title_string from '../utils/formats.js';
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Input } from 'antd';
import CategoriesDropdown from './CategoriesDropdown.jsx';
import EditableTagGroup from './EditableTagGroup.jsx';
import Loading from '../Loading/LoadingIndicator.js';
import Editor from '../Editor/Editor.js';
import { Helmet } from 'react-helmet-async';
import ConfirmButtons from './ConfirmButtons.jsx';
import { CREATE_POST } from './Mutations.js';
import { GET_CATEGORIES } from '../Categories/Queries.js';
import { getUserId } from '../Login/authUtils.js';
import { getPostReplyContent, clearPostReplyContent } from '../Posts/utils';
import { getIsMobile } from '../App/utils.js';
import { getQuoteStateFromProps } from './utils';
import './Composer.css';
import { CategoryType } from '../Topics/topicTypes.js';

const defaultCategory = {
    id: -1,
    name: 'Uncategorized',
    description: 'Default category.',
};

export const Component = () => {
    const editing = false;

    const { t } = useTranslation('topicsComposer', { keyPrefix: 'topicsComposer' });

    //
    const mobile = getIsMobile();
    const [createTopic, { loading, error, data }] = useMutation(CREATE_POST);
    const categoriesQuery = useQuery(GET_CATEGORIES);
    const editorContainer = useRef(null);

    //
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState<CategoryType>(defaultCategory);
    const [tags, setTags] = useState<string[] | []>([]);

    const postStoryFn = () => {
        const id = getUserId();
        const editor:any = editorContainer.current;
        const _content = editor.getContent();
        const _category = category.id === -1 ? null : category;

        const queryOpts = {
            variables: {
                name: title,
                content: JSON.stringify(_content),
                user: id,
                category: _category,
                tags: tags ? tags.join(',') : '',
            },
        };
        createTopic(queryOpts);
    };

    const clearEditorContent = () => {
        const editor:any = editorContainer.current; 
        if(editor){
            editor.clear();
        }
    }

    const postReplyProps = getPostReplyContent();
    const initialState = getQuoteStateFromProps(postReplyProps);

    useEffect(() => {
        // Scroll to the top of the window.
        window.scrollTo(0, 0);

        return function cleanup() {
            clearPostReplyContent();
            clearEditorContent();
        };
    }, []);

    const postStoryContent = (/*isDraft*/) => {
        postStoryFn();
    };

    const updateTitleFn = (evt:any) => setTitle(evt.target.value);
    const updateTags = (tags:string[]) => setTags(tags);

    if (loading || categoriesQuery.loading) return <Loading />;

    if (data && data.createTopic && data.createTopic.ok && title !== null) {
        return (
            <Navigate to={`/topics/${data.createTopic.id}/${format_title_string(title)}`} />
        );
    }

    const mobileClass = mobile ? 'Mobile' : 'Desktop';
    const isDraft = !editing; //(!editing || story.isDraft === true);
    const postStoryAdDraft = () => postStoryContent(/*true*/);
    const postContentFn = () => postStoryContent(/*false*/);

    if (error || categoriesQuery.error) return <p>Error :(</p>;

    const { categories } = categoriesQuery.data;
    const categoriesData = [defaultCategory].concat(categories);

    return (
    <>
    <Helmet>
        <title>{t('createTopic')}</title>
    </Helmet>
    <div className="composer-container">
            <div className="ComposerTitle">
                <p
                    className="composer-title-text"
                    aria-label={t('createTopic')}
                    aria-level={1}
                    role="heading"
                >
                    {t('createTopic')}
                </p>
            </div>

            <div className={'ComposerHeadContainer ' + mobileClass}>
        <span className="TitleInputContainer">
          <Input
              placeholder={t('titlePlaceholder')}
              className="TitleInput"
              defaultValue={title === null ? '' : title}
              onChange={(value) => updateTitleFn(value)}
              aria-label="Title Input"
          />
        </span>
                <span className="CategoriesContainer">
          <CategoriesDropdown
              category={category}
              updateCategoryFn={setCategory}
              categories={categoriesData}
          />
        </span>
            </div>
            <br />
            <br />
            <div className="PostEditorContainer">
                <Editor
                    initialState={initialState}
                    containerRef={editorContainer}
                    user={null}
                    mentions={[]}
                    setMentions={(m) => console.log(m)}
                    isMobile={mobile}
                />
            </div>
            <br />
            <div className="tags-container">
                <p className="TagChooseText">{t('chooseTags')}</p>
                <EditableTagGroup initialState={tags} updateFn={updateTags} t={t} />
            </div>

            <div className="confirm-buttons">
                <ConfirmButtons
                    isDraft={isDraft}
                    editing={editing}
                    postStoryContent={postContentFn}
                    postAsDraftFn={postStoryAdDraft}
                    t={t}
                />
            </div>
        </div>
    </>
      
    );
};