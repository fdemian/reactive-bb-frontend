import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';

type ModeratorPostControlsProps = {
    t: (key: string) => string;
    onDelete: () => void;
    onEdit: () => void;
    isEditing: boolean;
};

const ModeratorPostControls = ({
    t,
    onDelete,
    onEdit,
    isEditing,
}: ModeratorPostControlsProps) => {
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

export default ModeratorPostControls;
