import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';

export const ErrorScreen: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <h1>Error boundary hit</h1>

      <strong>{String(error)}</strong>
      <pre>{error?.stack}</pre>

      <button type="button" onClick={() => {
        resetErrorBoundary();
      }}>
        Reset error boundary
      </button>

      <button type="button" onClick={() => {
        location.reload();
      }}>
        Reload page
      </button>
    </>
  );
};
