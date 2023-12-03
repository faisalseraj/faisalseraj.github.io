import { Button } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ProgressButton = (props: {
  isLoadingState: boolean;
  submitHandler: () => void;
  children?: any;
  isSubmitted?: boolean;
}) => {
  const { isLoadingState, submitHandler, children, isSubmitted } = props;
  const [progressValue, setProgressValue] = useState(0);
  const progressBarRef = useRef() as any;

  useEffect(() => {
    if (!isLoadingState || progressValue === 80) {
      clearInterval(progressBarRef.current);
    }
    if (!isLoadingState) setProgressValue(0);
  }, [isLoadingState, progressValue]);

  return (
    <Button
      variant="lg-primary"
      loadingText="In Progress..."
      disabled={isLoadingState}
      style={{ backgroundColor: isLoadingState ? '#DEE3ED' : '#F1AE3C' }}
      onClick={() => {
        progressBarRef.current = setInterval(
          () => setProgressValue((prev) => prev + 20),
          1500
        );

        submitHandler();
      }}
    >
      <div
        style={{
          width: isLoadingState ? `${progressValue}%` : '0%',
          borderBottomColor: 'blue',
          borderBottomWidth: '3px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          position: 'absolute',
          left: '0px',
          bottom: '0px'
        }}
      ></div>
      {children}
    </Button>
  );
};

export default ProgressButton;
