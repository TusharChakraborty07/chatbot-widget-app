import { render } from 'preact';
import Chatbot from './components/Chatbot';
import chatbotCSS from './components/Chatbot.css?inline';

export function mountChatbot(selector: string = '#chatbot-root') {
  let container = document.querySelector(selector);

  if (!container) {
    container = document.createElement('div');
    container.id = 'chatbot-root';
    document.body.appendChild(container);
  }

  const shadow = container.attachShadow({ mode: 'open' });

  // Inject CSS
  const styleTag = document.createElement('style');
  styleTag.textContent = chatbotCSS;
  shadow.appendChild(styleTag);

  // Wrapper for Preact render
  const wrapper = document.createElement('div');
  shadow.appendChild(wrapper);

  render(<Chatbot />, wrapper); // 👈 Ensure Chatbot returns one root element
}

// Make globally available
(window as any).mountChatbot = mountChatbot;
