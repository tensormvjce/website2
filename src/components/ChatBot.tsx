import React, { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': any;
      'df-messenger-chat-bubble': any;
    }
  }
}

const ChatBot: React.FC = () => {
  useEffect(() => {
    // Load DialogFlow scripts
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    document.head.appendChild(linkElement);

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    document.body.appendChild(scriptElement);

    // Add custom styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      df-messenger {
        z-index: 999;
        position: fixed;
        --df-messenger-font-color: #000;
        --df-messenger-font-family: Google Sans;
        --df-messenger-chat-background: #f3f6fc;
        --df-messenger-message-user-background: #d3e3fd;
        --df-messenger-message-bot-background: #fff;
        bottom: 16px;
        right: 16px;
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      document.head.removeChild(linkElement);
      document.body.removeChild(scriptElement);
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <df-messenger
      location="us-central1"
      project-id="compelling-weft-445204-a6"
      agent-id="3be1dc55-82fe-4ae4-882d-df89e9aa79d2"
      language-code="en"
      max-query-length="-1"
    >
      <df-messenger-chat-bubble chat-title="TensorMVJCE - Assistant">
      </df-messenger-chat-bubble>
    </df-messenger>
  );
};

export default ChatBot;
