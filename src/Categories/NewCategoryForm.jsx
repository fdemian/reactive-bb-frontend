import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from './Mutations';
import './Categories.css';

const NewCategoryForm = ({ isLoggedIn, t }) => {
    const [editing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [createCategory] = useMutation(CREATE_CATEGORY, {
        update(cache, { data: { createCategory } }) {
            cache.modify({
                fields: {
                    categories(existingCategories = []) {
                        return existingCategories.concat(createCategory);
                    }
                }
            });
        }
    });

    // Finished checking login values.
    const onFinish = (values) => {
        form.resetFields();
        setIsEditing(false);

        // Submit form
        const { name, description } = values;

        createCategory({
            variables: {
                name: name,
                description: description
            },
            optimisticResponse: {
                createCategory: {
                    id: 0,
                    name: name,
                    description: description
                }
            }
        });
    };

    const clearForm = () => {
        // Reset fields.
        form.resetFields();
        setIsEditing(false);
    };

    if (!isLoggedIn) return null;

    if (!editing)
        return (
            <Button
                onClick={() => setIsEditing(true)}
                type="primary"
                className="new-category-button"
                aria-label={t('newCategory')}
            >
                {t('newCategory')} &nbsp;
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        );

    return (
        <div className="category-form-container">
            <h1>{t('createCategory')}</h1>
            <Form
                form={form}
                name="new-category-form"
                role="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={() => console.log('FAILED!')}
            >
                <Form.Item
                    label={t('name')}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: t('nameMessage')
                        }
                    ]}
                >
                    <Input
                        aria-label={t('namePlaceholder')}
                        style={{ width: 500 }}
                        name="name"
                        className="input-field"
                        placeholder={t('namePlaceholder')}
                    />
                </Form.Item>
                <Form.Item
                    label={t('description')}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: t('descriptionMessage')
                        }
                    ]}
                >
                    <Input
                        aria-label={t('descriptionPlaceholder')}
                        style={{ width: 500 }}
                        className="input-field"
                        placeholder={t('descriptionPlaceholder')}
                        name="description"
                        role="textbox"
                    />
                </Form.Item>
                <br />
                <Form.Item>
                    <Button
                        className="category-cancel-btn"
                        type="primary"
                        onClick={clearForm}
                        danger
                    >
                        {t('discard')}
                        &nbsp;
                        <FontAwesomeIcon icon={faClose} />
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {t('create')}
                        &nbsp;
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

NewCategoryForm.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default NewCategoryForm;