import React, { useEffect, useState } from 'react';

const ExampleComponent = () => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  return (
    <div>
      <p>Current Time: {currentTime}</p>
    </div>
  );
};

export default ExampleComponent;
