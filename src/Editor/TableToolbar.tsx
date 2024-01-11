import { useState } from 'react';
import { Button, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

type TableSizeProps = {
    rows: number;
    columns: number;
};

type TableToolbarProps = {
    toggleToolbar: () => void;
    insertTable: (t:TableSizeProps) => void;
    t: (key:string) => string;
};

const TableToolbar = ({ toggleToolbar, insertTable, t }:TableToolbarProps) => {

    const [tableSize, setTableSize] = useState({ rows: 1, columns: 1 });
    const setRowValue = (value:number| null) =>
        setTableSize({ rows: value ?? 1, columns: tableSize.columns });
    const setColValue = (value:number| null) =>
        setTableSize({ rows: tableSize.rows, columns: value  ?? 1 });

    return (
    <div className="toolbar">
        <div className="toolbar-single">
            <span className="editor-table-input">
              <strong className="table-input-text">ROWS</strong>
                &nbsp;
                <InputNumber
                    aria-label="ROWS INPUT"
                    value={tableSize.rows}
                    onChange={setRowValue}
                    min={1}
                />
                &nbsp;
                <strong className="table-input-text">COLS</strong>
                &nbsp;
                <InputNumber
                    aria-label="COLS INPUT"
                    value={tableSize.columns}
                    onChange={setColValue}
                    min={1}
                />
            </span>
            <span className="table-toolbar-buttons">
              <Button
                  role="button"
                  danger
                  type="primary"
                  onClick={toggleToolbar}
                  aria-label={t('toolbar.cancel')}
                  className="cancel-darkred-btn"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
                  &nbsp; {t('toolbar.cancel')}
              </Button>
              &nbsp;
              <Button
                 role="button"
                 type="primary"
                 aria-label={t('toolbar.confirm')}
                 onClick={() => {
                     insertTable(tableSize);
                     toggleToolbar();
                 }}
              >
                 <FontAwesomeIcon icon={faCheck} size="lg" />
                 &nbsp; {t('toolbar.confirm')}
              </Button>
            </span>
        </div>
    </div>
    );
};

export default TableToolbar;
