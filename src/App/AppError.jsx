import { Result, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Paragraph, Text } = Typography;

const AppError = ({ error }) => {
    const stackStr = error.stack.split('\n');

    return (
        <Result status="error" title="Error" subTitle={error.message} extra={[]}>
            <div className="desc" key="error-desc">
                <Paragraph key="error-desc-paragraph">
                    <Text strong style={{ fontSize: 16 }} key="error-desc-paragraph-text">
                        {stackStr.map((s) => (
                            <p key={s}>{s}</p>
                        ))}
                    </Text>
                </Paragraph>
            </div>
        </Result>
    );
};

AppError.propTypes = {
    error: PropTypes.shape({
        stack: PropTypes.string,
        message: PropTypes.string
    })
};

export default AppError;