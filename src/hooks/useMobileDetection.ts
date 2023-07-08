import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isMobileAction } from '../store/ui/action';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768; // Adjust the value based on your mobile breakpoint

      setIsMobile(isMobileView);
      dispatch(isMobileAction({isMobile: isMobileView}))
    };

    // Add event listener to window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useMobileDetection;
