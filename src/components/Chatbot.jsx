import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  font-family: 'Arial', sans-serif;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: #1d4ed8;
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 320px;
  height: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0)')};
  transform-origin: bottom right;
  transition: transform 0.3s ease;
  
  @media (max-width: 480px) {
    width: 280px;
    height: 70vh;
    max-height: 500px;
    bottom: 80px;
    right: 10px;
  }
`;

const ChatHeader = styled.div`
  background-color: #2563eb;
  color: white;
  padding: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  line-height: 1.4;
  font-size: 0.9rem;
  position: relative;
  word-wrap: break-word;
  
  ${({ isBot }) => isBot 
    ? `
      background-color: #f0f4f8;
      border-bottom-left-radius: 0.25rem;
      align-self: flex-start;
      color: #1e293b;
    ` 
    : `
      background-color: #2563eb;
      color: white;
      border-bottom-right-radius: 0.25rem;
      align-self: flex-end;
    `
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #2563eb;
  }
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  padding: 0 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

// Chatbot responses based on keywords
const responses = {
  'hola': '¡Hola! Soy tu asistente de Panamá Compra. ¿En qué puedo ayudarte hoy?',
  'ayuda': 'Puedo ayudarte con: \n- Navegar por el sitio\n- Información sobre cotizaciones\n- Preguntas frecuentes\n- Contactar con soporte',
  'cotiza': 'Para realizar una cotización, ve a la sección de Cotización en el menú principal. Allí podrás llenar el formulario con los detalles de tu solicitud.',
  'contact': 'Puedes contactar a soporte a través de:\n- Teléfono: (507) 123-4567\n- Email: soporte@panamacompra.com\n- Horario de atención: Lunes a Viernes de 8:00 AM a 5:00 PM',
  'gracias': '¡De nada! Si tienes más preguntas, no dudes en preguntar.',
  'default': 'Lo siento, no entendí tu consulta. ¿Podrías reformularla? Estoy aquí para ayudarte con información sobre el sitio, cotizaciones y más.'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy tu asistente de Panamá Compra. ¿En qué puedo ayudarte hoy?', isBot: true }
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setMessage('');

    // Generate bot response
    setTimeout(() => {
      const userMessage = message.toLowerCase();
      let response = responses.default;

      // Check for keywords in the user's message
      Object.keys(responses).forEach(key => {
        if (userMessage.includes(key) && key !== 'default') {
          response = responses[key];
        }
      });

      // Add bot response
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <span>Asistente Virtual</span>
          <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
        </ChatHeader>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} isBot={msg.isBot}>
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
          />
          <SendButton onClick={handleSendMessage}>Enviar</SendButton>
        </InputContainer>
      </ChatWindow>
      <ChatButton onClick={() => setIsOpen(!isOpen)}>
        🤖
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot;
