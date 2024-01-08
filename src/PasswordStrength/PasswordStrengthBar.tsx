import { Progress } from 'antd';
import {
  getPasswordScore,
  translateStrings,
  PASSWORD_COLORS
} from './utils';

type TranslationFn = (key:string) => string;

type PasswordStrengthBarTypes = {
    password: string;
    t: TranslationFn;
};

const PasswordStrengthBar = ({password, t}:PasswordStrengthBarTypes) => {
    if(!password)
        return <br />;

    const score:number = getPasswordScore(password);
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

export default PasswordStrengthBar;
