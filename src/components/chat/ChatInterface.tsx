'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Chief of Staff. I've analyzed your emails across all connected accounts. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I've checked your inbox. You have 2 urgent emails from investors and 1 meeting in 30 minutes. Would you like me to draft replies?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-slate-500">Ask me anything about your emails</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="size-8">
                {message.type === 'ai' ? (
                  <>
                    <AvatarFallback className="bg-violet-100 text-violet-700">
                      <Bot className="size-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarFallback className="bg-slate-100">
                      <User className="size-4" />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.type === 'ai'
                    ? 'bg-slate-100 text-slate-900'
                    : 'bg-violet-600 text-white ml-auto'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your emails..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} className="gap-2">
            <Send className="size-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}