import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ApplicationProgress from './components/ApplicationProgress';
import DocumentManager from './components/DocumentManager';
import CommunicationCenter from './components/CommunicationCenter';
import AppointmentBooking from './components/AppointmentBooking';
import PaymentInvoices from './components/PaymentInvoices';
import ProfileSettings from './components/ProfileSettings';
import SupportCenter from './components/SupportCenter';

const CustomerPortal = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock application data
  const applicationData = {
    id: 'APP-2025-001',
    country: 'United States',
    visaType: 'Tourist Visa (B-2)',
    submittedDate: '2025-08-15',
    status: 'In Progress',
    consultant: 'Sarah Johnson',
    estimatedCompletion: '2025-09-15'
  };

  const quickStats = [
    {
      label: 'Applications',
      value: '3',
      change: '+1 this month',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Documents',
      value: '12',
      change: '3 pending upload',
      icon: 'Upload',
      color: 'text-warning'
    },
    {
      label: 'Messages',
      value: '8',
      change: '2 unread',
      icon: 'MessageSquare',
      color: 'text-success'
    },
    {
      label: 'Appointments',
      value: '2',
      change: 'Next: Sep 2',
      icon: 'Calendar',
      color: 'text-secondary'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'document',
      title: 'Document approved',
      description: 'Your passport copy has been approved by Sarah Johnson',
      timestamp: '2025-08-31T10:30:00',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message received',
      description: 'Sarah Johnson sent you a message about your application',
      timestamp: '2025-08-31T09:15:00',
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment reminder',
      description: 'Invoice INV-2025-002 is due in 3 days',
      timestamp: '2025-08-30T16:45:00',
      icon: 'DollarSign',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment confirmed',
      description: 'Your document review session on Sep 2 at 2:00 PM has been confirmed',
      timestamp: '2025-08-30T14:20:00',
      icon: 'Calendar',
      color: 'text-success'
    }
  ];

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'progress', label: 'Application Progress', icon: 'TrendingUp' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'communication', label: 'Messages', icon: 'MessageSquare' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'payments', label: 'Payments', icon: 'DollarSign' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = (now - time) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, John!</h2>
            <p className="text-muted-foreground mb-4">
              Here's an overview of your visa applications and recent activity.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-foreground">Current Application: {applicationData?.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-foreground">Est. Completion: {new Date(applicationData.estimatedCompletion)?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Download Report
            </Button>
            <Button size="sm" iconName="Plus">
              New Application
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={stat?.icon} size={24} className={stat?.color} />
              <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
            </div>
            <h3 className="font-medium text-foreground mb-1">{stat?.label}</h3>
            <p className="text-sm text-muted-foreground">{stat?.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Application Status */}
        <div className="lg:col-span-2">
          <ApplicationProgress application={applicationData} />
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
          
          <div className="space-y-4">
            {recentActivity?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full bg-muted`}>
                  <Icon name={activity?.icon} size={16} className={activity?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{activity?.title}</p>
                  <p className="text-sm text-muted-foreground">{activity?.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimeAgo(activity?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" fullWidth className="mt-4">
            View All Activity
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('documents')}
            iconName="Upload"
            iconPosition="left"
            fullWidth
          >
            Upload Document
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('communication')}
            iconName="MessageSquare"
            iconPosition="left"
            fullWidth
          >
            Send Message
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('appointments')}
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('payments')}
            iconName="CreditCard"
            iconPosition="left"
            fullWidth
          >
            Make Payment
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'progress':
        return <ApplicationProgress application={applicationData} />;
      case 'documents':
        return <DocumentManager />;
      case 'communication':
        return <CommunicationCenter />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'payments':
        return <PaymentInvoices />;
      case 'profile':
        return <ProfileSettings />;
      case 'support':
        return <SupportCenter />;
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Customer Portal</h1>
              <p className="text-muted-foreground">
                Manage your visa applications, documents, and communications
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" iconName="Bell" />
              <Button variant="outline" iconName="Settings" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-lg border border-border mb-6 overflow-x-auto">
            <div className="flex space-x-1 p-1 min-w-max">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => handleTabChange(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomerPortal;