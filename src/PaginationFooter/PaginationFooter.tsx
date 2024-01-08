import PropTypes from 'prop-types';
import { useState, Suspense } from 'react';
import { Button, Radio, InputNumber, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronRight, faChevronLeft, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { getIsMobile } from '../App/utils';
import { useTranslation } from 'react-i18next';
import './PaginationFooter.css';

type PaginationFooterProps = {
    lastPage:number; 
    currentPage:number;
    onChangePage: (p:number) => void;
};

const PaginationFooter = ({ lastPage, currentPage, onChangePage }:PaginationFooterProps) => {
    const [shortCutBtnPage, setShortCutBtnPage] = useState(1);
    const [showGoToPage, setShowGoToPage] = useState(false);

    const increasePageNumber = () => {
        if (currentPage === lastPage) return;
        onChangePage(currentPage + 1);
    };

    const decreasePageNumber = () => {
        if (currentPage === 1) return;
        onChangePage(currentPage - 1);
    };

    const toggleGoTo = () => setShowGoToPage(!showGoToPage);
    const goToFirstPage = () => onChangePage(1);
    const goToLastPage = () => onChangePage(lastPage);
    const pageShortcutChangeBtn = (value:number | null) => setShortCutBtnPage(value ?? 0);
    const pageShortCutClick = () => {
        setShowGoToPage(false);
        onChangePage(shortCutBtnPage);
    };

    const isMobile = getIsMobile();
    const cssClass = isMobile ? 'footer-mobile' : 'footer-desktop';

    const { t } = useTranslation('paginationFooter', { keyPrefix: 'paginationFooter' });

    if (showGoToPage)
        return (
            <Suspense fallback={<Spin />}>
        <span className={cssClass}>
          <InputNumber
              className="input-pagination-select"
              min={1}
              max={lastPage}
              value={shortCutBtnPage}
              onChange={pageShortcutChangeBtn}
          />
          <Button
              danger
              type="primary"
              size="middle"
              onClick={toggleGoTo}
              className="cancel-go-page-button"
          >
            <FontAwesomeIcon icon={faClose} />
              &nbsp; {t('back')}
          </Button>
          <Button
              type="primary"
              size="middle"
              onClick={pageShortCutClick}
              className="go-to-button"
          >
            {t('go')} &nbsp;
              <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </span>
            </Suspense>
        );

    return (
        <Suspense fallback={<Spin />}>
            <div className={cssClass}>
                <Radio.Group
                    size="large"
                    buttonStyle="solid"
                    disabled={lastPage === 1}
                    value={null}
                >
                    <Radio.Button
                        aria-label="first-page-jump"
                        value="left1"
                        disabled={currentPage === 1}
                        onClick={goToFirstPage}
                    >
                        <FontAwesomeIcon icon={faFastBackward} size="1x" />
                    </Radio.Button>
                    <Radio.Button
                        aria-label="previous-page-jump"
                        value="left2"
                        disabled={currentPage === 1}
                        onClick={decreasePageNumber}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size="1x" />
                    </Radio.Button>
                    <Radio.Button aria-label="page-count-button" value="input" onClick={toggleGoTo}>
                        <h4>
                            {currentPage}/{lastPage}
                        </h4>
                    </Radio.Button>
                    <Radio.Button
                        aria-label="next-page-jump"
                        value="right1"
                        disabled={currentPage === lastPage}
                        onClick={increasePageNumber}
                    >
                        <FontAwesomeIcon icon={faChevronRight} size="1x" />
                    </Radio.Button>
                    <Radio.Button
                        aria-label="last-page-jump"
                        value="right2"
                        disabled={currentPage === lastPage}
                        onClick={goToLastPage}
                    >
                        <FontAwesomeIcon icon={faFastForward} size="1x" />
                    </Radio.Button>
                </Radio.Group>
            </div>
        </Suspense>
    );
};

PaginationFooter.propTypes = {
    lastPage: PropTypes.number,
    currentPage: PropTypes.number,
    onChangePage: PropTypes.func
};

export default PaginationFooter;
