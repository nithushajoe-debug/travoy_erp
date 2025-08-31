import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange 
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredConversations = conversations?.filter(conv => {
    const matchesSearch = conv?.clientName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conv?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && conv?.unreadCount > 0) ||
                         (filterType === 'priority' && conv?.priority === 'high') ||
                         (filterType === 'email' && conv?.channel === 'email') ||
                         (filterType === 'whatsapp' && conv?.channel === 'whatsapp');
    return matchesSearch && matchesFilter;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime?.toLocaleDateString();
    }
  };

  const getChannelIcon = (channel) => {
    return channel === 'whatsapp' ? 'MessageCircle' : 'Mail';
  };

  const getChannelColor = (channel) => {
    return channel === 'whatsapp' ? 'text-green-600' : 'text-blue-600';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
          <div className="flex items-center space-x-2">
            <Icon name="Plus" size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
            <Icon name="Filter" size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', icon: 'MessageSquare' },
            { key: 'unread', label: 'Unread', icon: 'Circle' },
            { key: 'priority', label: 'Priority', icon: 'AlertCircle' },
            { key: 'email', label: 'Email', icon: 'Mail' },
            { key: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' }
          ]?.map(filter => (
            <button
              key={filter?.key}
              onClick={() => onFilterChange(filter?.key)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                filterType === filter?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={filter?.icon} size={12} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversations found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation)}
                onMouseEnter={() => setHoveredItem(conversation?.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                  selectedConversation?.id === conversation?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                      conversation?.channel === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      <Icon name={getChannelIcon(conversation?.channel)} size={8} color="white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground truncate">{conversation?.clientName}</h3>
                      <div className="flex items-center space-x-1">
                        {conversation?.priority === 'high' && (
                          <Icon name="AlertCircle" size={12} className={getPriorityColor(conversation?.priority)} />
                        )}
                        {conversation?.unreadCount > 0 && (
                          <NotificationBadge count={conversation?.unreadCount} size="sm" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conversation?.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation?.lastMessageTime)}
                      </span>
                      <div className="flex items-center space-x-1">
                        {conversation?.hasAttachment && (
                          <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                        )}
                        {conversation?.channel === 'whatsapp' && conversation?.deliveryStatus && (
                          <Icon 
                            name={conversation?.deliveryStatus === 'delivered' ? 'Check' : 'CheckCheck'} 
                            size={12} 
                            className={conversation?.deliveryStatus === 'read' ? 'text-blue-500' : 'text-muted-foreground'} 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Info */}
                {conversation?.caseInfo && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Case: {conversation?.caseInfo?.type} - {conversation?.caseInfo?.country}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-medium ${
                        conversation?.caseInfo?.status === 'active' ? 'bg-green-100 text-green-700' :
                        conversation?.caseInfo?.status === 'pending'? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {conversation?.caseInfo?.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {filteredConversations?.length} conversations
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                {conversations?.filter(c => c?.unreadCount > 0)?.length} unread
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                {conversations?.filter(c => c?.priority === 'high')?.length} priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;