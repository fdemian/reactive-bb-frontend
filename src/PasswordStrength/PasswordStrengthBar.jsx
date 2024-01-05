import PropTypes from 'prop-types';
import { Progress } from 'antd';
import {
  getPasswordScore,
  translateStrings,
  PASSWORD_COLORS
} from './utils';

const PasswordStrengthBar = ({password, t}) => {
    if(!password)
        return <br />;

    const score = getPasswordScore(password);
    const percent = (score/4)*100;

    return (
        <div>
            <Progress
                percent={percent}
                steps={4}
                size={[123, 10]}
                format={() => ""}
                strokeColor={PASSWORD_COLORS[score]}
            />
            <div>
                <strong>{t(translateStrings[score])}</strong>
            </div>
        </div>
    );
}

PasswordStrengthBar.propTypes = {
    password: PropTypes.string,
    t: PropTypes.func
};

export default PasswordStrengthBar;
