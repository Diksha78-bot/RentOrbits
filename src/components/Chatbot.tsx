import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your property assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I understand your query. Let me help you find the perfect property that matches your requirements.",
          sender: 'bot'
        }]);
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-forest-600 text-white p-4 rounded-full shadow-lg hover:bg-forest-700 transition-colors duration-300 z-50"
      >
        <FontAwesomeIcon icon={faComment} className="text-xl" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="bg-forest-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Property Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-forest-600 text-white'
                      : 'bg-sage-100 text-forest-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-sage-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-sage-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-forest-600 text-white p-2 rounded-lg hover:bg-forest-700 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 