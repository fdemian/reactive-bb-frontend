import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

const ModeratorPostControls = ({ t, onDelete, onEdit, isEditing }) => {
    if (isEditing) return null;

    return (
        <div className="post-mod-controls">
            <Tooltip placement="bottom" title={t('posts.mod.edit')}>
                <FontAwesomeIcon
                    onClick={onEdit}
                    color="green"
                    icon={faEdit}
                    size="2x"
                />
            </Tooltip>
            &nbsp;
            <Tooltip placement="bottom" title={t('posts.mod.delete')}>
                <FontAwesomeIcon
                    onClick={onDelete}
                    color="green"
                    icon={faTimes}
                    size="2x"
                />
            </Tooltip>
        </div>
    );
};

ModeratorPostControls.propTypes = {
    t: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
};

export default ModeratorPostControls;
