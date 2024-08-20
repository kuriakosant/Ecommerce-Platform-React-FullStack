import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return { notification, showNotification };
};

export default useNotification;
