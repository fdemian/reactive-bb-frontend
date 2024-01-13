import { DatePicker } from 'antd';
import { endOfDay } from 'date-fns';

/* eslint-disable @typescript-eslint/no-explicit-any */
const disabledDate = (current: any):boolean => {
  // Can not select days before today and today
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  return current && current < endOfDay(new Date());
};

interface BanDatePickerProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onChange: (v: any) => void;
  disabled: boolean;
}

const BanDatePicker = ({ onChange, disabled }: BanDatePickerProps) => {
  return (
    <DatePicker
      disabled={disabled}
      format="DD-MM-YYYY"
      disabledDate={disabledDate}
      onChange={onChange}
    />
  );
};

export default BanDatePicker;
