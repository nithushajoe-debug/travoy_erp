import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageThread = ({ 
  conversation, 
  messages, 
  onSendMessage,
  onLoadMore,
  hasMoreMessages 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const templates = [
    {
      id: 1,
      name: "Welcome Message",
      content: "Hello {{clientName}}, welcome to Travoy! We're excited to help you with your {{visaType}} visa application for {{country}}.",
      category: "greeting"
    },
    {
      id: 2,
      name: "Document Request",
      content: "Hi {{clientName}}, we need the following documents to proceed with your application:\n\n{{documentList}}\n\nPlease upload them at your earliest convenience.",
      category: "request"
    },
    {
      id: 3,
      name: "Status Update",
      content: "Good news {{clientName}}! Your {{visaType}} visa application has been {{status}}. Next steps: {{nextSteps}}",
      category: "update"
    },
    {
      id: 4,
      name: "Appointment Reminder",
      content: "Reminder: You have an appointment scheduled for {{date}} at {{time}}. Please bring all required documents.",
      category: "reminder"
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage?.trim() || attachments?.length > 0) {
      onSendMessage({
        content: newMessage,
        attachments: attachments,
        channel: conversation?.channel
      });
      setNewMessage('');
      setAttachments([]);
      setSelectedTemplate(null);
    }
  };

  const handleTemplateSelect = (template) => {
    const processedContent = template?.content?.replace('{{clientName}}', conversation?.clientName)?.replace('{{visaType}}', conversation?.caseInfo?.type || 'visa')?.replace('{{country}}', conversation?.caseInfo?.country || 'your destination')?.replace('{{status}}', 'processed')?.replace('{{nextSteps}}', 'We will contact you with further instructions')?.replace('{{documentList}}', '• Passport\n• Photos\n• Application form')?.replace('{{date}}', new Date()?.toLocaleDateString())?.replace('{{time}}', '10:00 AM');
    
    setNewMessage(processedContent);
    setSelectedTemplate(template);
    setShowTemplates(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(attachments?.filter(att => att?.id !== attachmentId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatusIcon = (message) => {
    if (message?.channel === 'whatsapp') {
      switch (message?.status) {
        case 'sent': return <Icon name="Check" size={12} className="text-muted-foreground" />;
        case 'delivered': return <Icon name="CheckCheck" size={12} className="text-muted-foreground" />;
        case 'read': return <Icon name="CheckCheck" size={12} className="text-blue-500" />;
        default: return <Icon name="Clock" size={12} className="text-muted-foreground" />;
      }
    }
    return null;
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="text-muted-foreground mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={conversation?.avatar}
              alt={conversation?.clientName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{conversation?.clientName}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon 
                  name={conversation?.channel === 'whatsapp' ? 'MessageCircle' : 'Mail'} 
                  size={14} 
                  className={conversation?.channel === 'whatsapp' ? 'text-green-600' : 'text-blue-600'} 
                />
                <span>{conversation?.channel === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
                {conversation?.channel === 'whatsapp' && (
                  <>
                    <span>•</span>
                    <span className={conversation?.whatsappOptIn ? 'text-green-600' : 'text-red-600'}>
                      {conversation?.whatsappOptIn ? 'Opted In' : 'Opted Out'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {hasMoreMessages && (
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={onLoadMore}>
              <Icon name="ChevronUp" size={16} className="mr-2" />
              Load older messages
            </Button>
          </div>
        )}

        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message?.sender === 'You' ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-3 rounded-lg ${
                  message?.sender === 'You' ?'bg-primary text-primary-foreground' :'bg-card border border-border'
                }`}
              >
                {message?.content && (
                  <p className="whitespace-pre-wrap text-sm">{message?.content}</p>
                )}
                
                {message?.attachments && message?.attachments?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message?.attachments?.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                        <Icon name="Paperclip" size={16} />
                        <span className="text-sm truncate">{attachment?.name}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Icon name="Download" size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className={`flex items-center mt-1 space-x-2 ${
                message?.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-muted-foreground">
                  {formatMessageTime(message?.timestamp)}
                </span>
                {message?.sender === 'You' && getMessageStatusIcon(message)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Composer */}
      <div className="p-4 border-t border-border bg-card">
        {/* Templates */}
        {showTemplates && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Message Templates</h4>
              <Button variant="ghost" size="icon" onClick={() => setShowTemplates(false)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {templates?.map((template) => (
                <button
                  key={template?.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-2 text-left bg-background border border-border rounded hover:bg-muted transition-smooth"
                >
                  <div className="font-medium text-sm text-foreground">{template?.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">
                    {template?.content?.substring(0, 60)}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachments Preview */}
        {attachments?.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments?.map((attachment) => (
              <div key={attachment?.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} />
                  <span className="text-sm">{attachment?.name}</span>
                  <span className="text-xs text-muted-foreground">({formatFileSize(attachment?.size)})</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="h-6 w-6"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Message Input */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              placeholder={`Type a message to ${conversation?.clientName}...`}
              className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              onKeyPress={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTemplates(!showTemplates)}
              className={showTemplates ? 'bg-muted' : ''}
            >
              <Icon name="FileText" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
            >
              <Icon name="Paperclip" size={20} />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage?.trim() && attachments?.length === 0}
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>

        {/* Rate Limiting Warning for WhatsApp */}
        {conversation?.channel === 'whatsapp' && (
          <div className="mt-2 text-xs text-muted-foreground flex items-center space-x-1">
            <Icon name="Info" size={12} />
            <span>WhatsApp rate limits apply. 24-hour window for responses.</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MessageThread;