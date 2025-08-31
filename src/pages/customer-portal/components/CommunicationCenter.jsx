import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationCenter = () => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('consultant');

  const conversations = [
    {
      id: 'consultant',
      name: 'Sarah Johnson',
      role: 'Visa Consultant',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I\'ve reviewed your documents and they look good. Just need the bank statement.',
      lastMessageTime: '2025-08-30T14:30:00',
      unreadCount: 2,
      online: true
    },
    {
      id: 'support',
      name: 'Customer Support',
      role: 'Support Team',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Your appointment has been confirmed for tomorrow at 2 PM.',
      lastMessageTime: '2025-08-29T16:45:00',
      unreadCount: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'consultant',
      content: 'Hello! I\'ve started reviewing your visa application. Everything looks good so far.',
      timestamp: '2025-08-30T10:00:00',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Thank you! When do you think I\'ll hear back about the next steps?',
      timestamp: '2025-08-30T10:15:00',
      type: 'text'
    },
    {
      id: 3,
      sender: 'consultant',
      content: 'I\'ve reviewed your documents and they look good. Just need the bank statement to complete the review.',
      timestamp: '2025-08-30T14:30:00',
      type: 'text'
    },
    {
      id: 4,
      sender: 'consultant',
      content: 'Once I receive that, I can submit your application to the embassy within 24 hours.',
      timestamp: '2025-08-30T14:31:00',
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date?.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex h-96">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Messages</h3>
          </div>
          
          <div className="overflow-y-auto h-full">
            {conversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => setSelectedConversation(conversation?.id)}
                className={`w-full p-4 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0 ${
                  selectedConversation === conversation?.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    {conversation?.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">{conversation?.name}</p>
                      {conversation?.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {conversation?.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{conversation?.role}</p>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation?.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(conversation?.lastMessageTime)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {conversations?.find(c => c?.id === selectedConversation)?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversations?.find(c => c?.id === selectedConversation)?.role}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" iconName="Phone" />
                <Button size="sm" variant="ghost" iconName="Video" />
                <Button size="sm" variant="ghost" iconName="MoreVertical" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{message?.content}</p>
                  <p className={`text-xs mt-1 ${
                    message?.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" iconName="Paperclip" />
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button 
                size="sm" 
                onClick={handleSendMessage}
                disabled={!newMessage?.trim()}
                iconName="Send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationCenter;