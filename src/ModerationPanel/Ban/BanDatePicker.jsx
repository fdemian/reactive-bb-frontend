import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { endOfDay } from 'date-fns';

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < endOfDay(new Date());
};

const BanDatePicker = ({ onChange, disabled }) => {
    return (
        <DatePicker
            disabled={disabled}
            format="DD-MM-YYYY"
            disabledDate={disabledDate}
            onChange={onChange}
        />
    );
};

BanDatePicker.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BanDatePicker;