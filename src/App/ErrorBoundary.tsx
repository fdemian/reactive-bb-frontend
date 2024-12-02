import { Result, Typography } from 'antd';
import { isRouteErrorResponse } from 'react-router-dom';
const { Paragraph, Text } = Typography;

const ErrorBoundary = ({ error }: any) => {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
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
    // Unknown error.
    return <h1>Error</h1>;
  }
};

export default ErrorBoundary;
