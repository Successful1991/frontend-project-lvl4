import React, {useEffect, useState} from 'react';

const Chat = () => {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    setPageContent('страница чата')
  }, []);

  return pageContent &&  <div>{pageContent}</div>;
};

export default Chat;
