'use client'
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIAgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu agente IA especializado en Data Domain. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callAIAgent = async (question: string): Promise<string> => {
    try {
      const response = await fetch('https://451mknt4hg.execute-api.us-east-1.amazonaws.com/default/Agente-de-Consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.answer) {
        return data.answer;
      } else {
        return 'No se recibió una respuesta válida del agente.';
      }
    } catch (error) {
      console.error('Error calling AI agent:', error);
      return 'Error al comunicarse con el agente. Por favor, intenta de nuevo.';
    }
  };

  // Test function to check endpoint accessibility
  const testEndpoint = async () => {
    try {
      const response = await fetch('https://451mknt4hg.execute-api.us-east-1.amazonaws.com/default/Agente-de-Consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: "test"
        })
      });
      
      console.log('Test response status:', response.status);
      const data = await response.json();
      console.log('Test response data:', data);
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  // Test on component mount
  useEffect(() => {
    testEndpoint();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await callAIAgent(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Error al procesar tu mensaje. Por favor, intenta de nuevo.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Función para formatear el texto del agente IA
  function formatAIText(text: string) {
    // Negrita para **texto**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    // Borde tipo botón para [texto]
    formatted = formatted.replace(/\[(.*?)\]/g, '<span class="inline-block border border-blue-500 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold bg-white dark:bg-gray-800 mr-1 mb-1 align-middle" style="margin-right:2px;">$1</span>');
    // Saltos de línea a <br />
    formatted = formatted.replace(/\n/g, '<br />');
    return formatted;
  }

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg shadow-lg border border-purple-200 dark:border-purple-800 relative overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 relative">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg relative">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-white flex items-center">
            Agente IA
          </h3>
          <p className="text-sm text-purple-100">Asistente inteligente</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-white to-purple-50 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white shadow-md border border-purple-100 dark:border-purple-700'
              }`}
            >
              <p
                className="text-sm whitespace-pre-line font-normal"
                dangerouslySetInnerHTML={{ __html: formatAIText(message.text) }}
              />
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white px-4 py-3 rounded-lg shadow-md border border-purple-200 dark:border-purple-700 relative max-w-xs lg:max-w-md">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Consultando base de conocimiento...</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">Esperando respuesta del servidor</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 border border-purple-300 dark:border-purple-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 