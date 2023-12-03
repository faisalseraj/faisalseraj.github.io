import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

type LoadingIndicatorProps = {
  immediate?: boolean;
  render?: () => JSX.Element;
};

export const LoadingIndicator = ({
  immediate = false,
  render
}: LoadingIndicatorProps) => {
  const [showSpinner, setShowSpinner] = useState(immediate);
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 1000);
    return () => clearTimeout(timer);
  });

  if (!showSpinner) {
    return null;
  }

  return render ? render() : <Spinner />;
};
