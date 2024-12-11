import { Result, Typography } from 'antd';
import { isRouteErrorResponse } from 'react-router-dom';
const { Paragraph, Text } = Typography;

const ErrorBoundary = ({ error }: any) => {
  if (isRouteErrorResponse(error)) {
    return (
      <Result status="error" title="Error" subTitle={error.status} extra={[]}>
        <Paragraph key="error-desc-paragraph">
          <Text strong style={{ fontSize: 16 }} key="error-desc-paragraph-text">
            {error.status}
          </Text>
        </Paragraph>
        <Paragraph key="error-desc-paragraph">
          <Text strong style={{ fontSize: 16 }} key="error-desc-paragraph-text">
            {error.statusText}
          </Text>
        </Paragraph>
      </Result>
    );
  } else if (error instanceof Error) {
    return (
      <Result status="error" title="Error" subTitle={error.message} extra={[]}>
        <div className="desc" key="error-desc">
          <Paragraph key="error-desc-paragraph">
            <Text
              strong
              style={{ fontSize: 16 }}
              key="error-desc-paragraph-text"
            >
              {error.stack!.split('\n').map((s: string) => (
                <p key={s}>{s}</p>
              ))}
            </Text>
          </Paragraph>
        </div>
      </Result>
    );
  } else {
    console.log('@@@@@@@@@@@@@');
    console.log(error);
    // Unknown error.
    return (
      <Result
        status="error"
        title="Error"
        subTitle="A non-standard eror ocurred"
        extra={[]}
      >
        <div className="desc" key="error-desc">
          <Paragraph key="error-desc-paragraph">
            <Text
              strong
              style={{ fontSize: 16 }}
              key="error-desc-paragraph-text"
            >
              Error{' '}
              {error === undefined ? '(Unknown cause)' : error.toISOString()}
            </Text>
          </Paragraph>
        </div>
      </Result>
    );
  }
};

export default ErrorBoundary;
