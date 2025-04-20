import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComment, 
  faTimes, 
  faPaperPlane, 
  faRobot,
  faUser
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your car rental assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses based on keywords
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Car booking related queries
    if (lowerMessage.includes('book') || lowerMessage.includes('rent') || lowerMessage.includes('hire')) {
      if (lowerMessage.includes('car')) {
        return "To book a car, please visit our Cars page and select your preferred vehicle. You can choose your dates and complete the booking process there. Would you like me to tell you more about our booking process?";
      }
      return "I can help you with booking. Are you interested in renting a car? Please let me know what type of vehicle you're looking for.";
    }

    // Price related queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Our car rental rates vary depending on the vehicle model and duration. We offer competitive prices starting from ₹2000 per day. Would you like to know the rates for specific car models?";
    }

    // Location related queries
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
      return "We are located in Mumbai, Maharashtra. You can find our detailed address and map on the Contact page. Would you like directions to our location?";
    }

    // Payment related queries
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept various payment methods including credit/debit cards, UPI, and net banking. All payments are processed securely. Would you like to know more about our payment process?";
    }

    // Documents required
    if (lowerMessage.includes('document') || lowerMessage.includes('license') || lowerMessage.includes('id')) {
      return "To rent a car, you'll need: \n1. Valid driving license\n2. Government ID proof\n3. Address proof\nDo you have any specific questions about the documentation?";
    }

    // Cancellation related queries
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return "Our cancellation policy allows free cancellation up to 24 hours before the pickup time. Would you like to know more about our cancellation and refund policy?";
    }

    // Contact related queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "You can reach us at:\nPhone: +91 98765 43210\nEmail: info@rentorbits.com\nOr visit our Contact page for more options. How would you like to get in touch with us?";
    }

    // Available cars
    if (lowerMessage.includes('available') || lowerMessage.includes('cars') || lowerMessage.includes('vehicles')) {
      return "We have a wide range of vehicles including:\n- Luxury cars (BMW, Mercedes)\n- SUVs (Toyota Fortuner, Honda CR-V)\n- Sedans (Honda City, Maruti Ciaz)\n- Hatchbacks (Swift, i20)\nWhat type of car are you interested in?";
    }

    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you with car rentals today?";
    }

    // Thank you messages
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    // Default response
    return "I understand you're asking about " + userMessage + ". Could you please provide more details so I can better assist you? You can ask about car bookings, prices, locations, or any other services.";
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate bot typing and response
      setTimeout(() => {
        const botMessage: Message = {
          text: getBotResponse(userMessage.text),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-colors duration-300"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faComment} className="text-xl" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary-600 p-4 text-white">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faRobot} />
              <div>
                <h3 className="font-bold">Car Rental Assistant</h3>
                <p className="text-sm text-white/80">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <FontAwesomeIcon 
                      icon={msg.sender === 'user' ? faUser : faRobot} 
                      className="text-sm"
                    />
                    <span className="text-xs opacity-75">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-neutral-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
                  message.trim()
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-neutral-400 cursor-not-allowed'
                }`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 