const ErrorFallback = ({ error }: any) => (
  <div role="alert" className="alert">
    <p>Something went wrong</p>
    <pre>{error.message}</pre>
  </div>
);

export default ErrorFallback;
