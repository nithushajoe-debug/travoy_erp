import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

import Button from '../../components/ui/Button';
import ConversationList from './components/ConversationList';
import MessageThread from './components/MessageThread';
import ClientContextPanel from './components/ClientContextPanel';
import CommunicationStats from './components/CommunicationStats';
import BulkMessageModal from './components/BulkMessageModal';

const CommunicationCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});

  // Mock data
  const mockConversations = [
    {
      id: 1,
      clientName: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thank you for the update on my visa application. When should I expect the next step?",
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
      channel: "whatsapp",
      priority: "high",
      hasAttachment: false,
      whatsappOptIn: true,
      deliveryStatus: "read",
      caseInfo: {
        type: "Tourist Visa",
        country: "United Kingdom",
        status: "active"
      }
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I've uploaded the bank statements as requested. Please let me know if you need anything else.",
      lastMessageTime: new Date(Date.now() - 1800000),
      unreadCount: 0,
      channel: "email",
      priority: "medium",
      hasAttachment: true,
      whatsappOptIn: false,
      deliveryStatus: "delivered",
      caseInfo: {
        type: "Business Visa",
        country: "Canada",
        status: "pending"
      }
    },
    {
      id: 3,
      clientName: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Could you please clarify the document requirements for the student visa application?",
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1,
      channel: "whatsapp",
      priority: "low",
      hasAttachment: false,
      whatsappOptIn: true,
      deliveryStatus: "delivered",
      caseInfo: {
        type: "Student Visa",
        country: "Australia",
        status: "active"
      }
    },
    {
      id: 4,
      clientName: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "My appointment is scheduled for tomorrow. What documents should I bring?",
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 0,
      channel: "email",
      priority: "high",
      hasAttachment: false,
      whatsappOptIn: true,
      deliveryStatus: "sent",
      caseInfo: {
        type: "Tourist Visa",
        country: "Germany",
        status: "active"
      }
    },
    {
      id: 5,
      clientName: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I received the visa approval! Thank you so much for your excellent service.",
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      channel: "whatsapp",
      priority: "low",
      hasAttachment: false,
      whatsappOptIn: true,
      deliveryStatus: "read",
      caseInfo: {
        type: "Work Visa",
        country: "United States",
        status: "completed"
      }
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hi, I wanted to check on the status of my UK tourist visa application. It's been two weeks since I submitted all documents.",
      timestamp: new Date(Date.now() - 86400000),
      channel: "whatsapp",
      status: "read",
      attachments: null
    },
    {
      id: 2,
      sender: "You",
      content: "Hello John! Thank you for reaching out. I've checked your application status and everything is progressing well. Your documents are currently under review by the embassy. The typical processing time is 3-4 weeks, so you're right on track.",
      timestamp: new Date(Date.now() - 82800000),
      channel: "whatsapp",
      status: "read",
      attachments: null
    },
    {
      id: 3,
      sender: "John Smith",
      content: "That's great to hear! Is there anything else I need to do from my side?",
      timestamp: new Date(Date.now() - 82200000),
      channel: "whatsapp",
      status: "read",
      attachments: null
    },
    {
      id: 4,
      sender: "You",
      content: `Not at the moment, John. Just keep your phone handy as the embassy might call for a brief interview. I'll keep you updated on any developments.\n\nIn the meantime, you can start planning your itinerary. The visa, once approved, will be valid for 6 months with multiple entries allowed.`,
      timestamp: new Date(Date.now() - 81600000),
      channel: "whatsapp",
      status: "read",
      attachments: null
    },
    {
      id: 5,
      sender: "John Smith",
      content: "Perfect! I'll start looking at flights and accommodations. One more question - do I need travel insurance?",timestamp: new Date(Date.now() - 3600000),channel: "whatsapp",status: "read",
      attachments: null
    },
    {
      id: 6,
      sender: "You",content: "Yes, travel insurance is highly recommended and sometimes required. I can help you with that too. Let me send you some options.",timestamp: new Date(Date.now() - 1800000),channel: "whatsapp",status: "read",
      attachments: [
        { name: "Travel_Insurance_Options.pdf", size: "245KB", type: "pdf" }
      ]
    },
    {
      id: 7,
      sender: "John Smith",content: "Thank you for the update on my visa application. When should I expect the next step?",timestamp: new Date(Date.now() - 300000),channel: "whatsapp",status: "delivered",
      attachments: null
    }
  ];

  const mockStats = {
    totalMessages: "1,247",
    avgResponseTime: "2.3h",
    activeConversations: 23,
    whatsappOptIns: "89%"
  };

  useEffect(() => {
    setConversations(mockConversations);
    setStats(mockStats);
    if (mockConversations?.length > 0) {
      setSelectedConversation(mockConversations?.[0]);
      setMessages(mockMessages);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // In a real app, this would fetch messages for the selected conversation
    setMessages(mockMessages);
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: messages?.length + 1,
      sender: "You",
      content: messageData?.content,
      timestamp: new Date(),
      channel: messageData?.channel,
      status: "sent",
      attachments: messageData?.attachments
    };
    setMessages([...messages, newMessage]);
    
    // Update conversation's last message
    const updatedConversations = conversations?.map(conv => 
      conv?.id === selectedConversation?.id 
        ? { ...conv, lastMessage: messageData?.content, lastMessageTime: new Date() }
        : conv
    );
    setConversations(updatedConversations);
  };

  const handleLoadMoreMessages = () => {
    // In a real app, this would load older messages
    console.log('Loading more messages...');
  };

  const handleSendBulkMessage = (messageData) => {
    console.log('Sending bulk message:', messageData);
    // In a real app, this would send the bulk message
  };

  const handleUpdatePreferences = (preferences) => {
    console.log('Updating preferences:', preferences);
    // In a real app, this would update client preferences
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <div className="p-6">
          <div className="mb-6">
            <Breadcrumbs />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Communication Center</h1>
                <p className="text-muted-foreground">
                  Manage client communications across email and WhatsApp channels
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkModal(true)}
                  iconName="Send"
                  iconPosition="left"
                >
                  Bulk Message
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Conversation
                </Button>
              </div>
            </div>
          </div>

          <CommunicationStats stats={stats} />

          <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-[calc(100vh-280px)]">
            <div className="grid grid-cols-12 h-full">
              {/* Conversation List */}
              <div className="col-span-12 lg:col-span-3 h-full">
                <ConversationList
                  conversations={conversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={handleSelectConversation}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filterType={filterType}
                  onFilterChange={setFilterType}
                />
              </div>

              {/* Message Thread */}
              <div className="col-span-12 lg:col-span-6 h-full">
                <MessageThread
                  conversation={selectedConversation}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onLoadMore={handleLoadMoreMessages}
                  hasMoreMessages={true}
                />
              </div>

              {/* Client Context Panel */}
              <div className="col-span-12 lg:col-span-3 h-full">
                <ClientContextPanel
                  conversation={selectedConversation}
                  onUpdatePreferences={handleUpdatePreferences}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <BulkMessageModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSendBulkMessage={handleSendBulkMessage}
      />
    </div>
  );
};

export default CommunicationCenter;