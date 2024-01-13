import { Progress } from 'antd';
import { getExpirationTime } from './utils';
import { differenceInMilliseconds } from 'date-fns';

interface BanClockProps {
  lockoutTime: string | null | undefined;
  t: (key: string) => string;
}

const BanExpirationClock = ({ lockoutTime, t }: BanClockProps) => {
  if (lockoutTime === null || lockoutTime === undefined)
    return <h3>{t('permanentlyBanned')}</h3>;

  const dateDiffString = getExpirationTime(lockoutTime);
  const msDiff = differenceInMilliseconds(new Date(lockoutTime), new Date());

  return (
    <Progress
      type="circle"
      percent={msDiff}
      format={() => `${dateDiffString}`}
    />
  );
};

export default BanExpirationClock;
