import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClientContextPanel = ({ conversation, onUpdatePreferences }) => {
  const [activeTab, setActiveTab] = useState('case');

  if (!conversation) {
    return (
      <div className="h-full bg-card border-l border-border p-4">
        <div className="text-center text-muted-foreground">
          <Icon name="User" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select a conversation to view client details</p>
        </div>
      </div>
    );
  }

  const clientData = {
    personalInfo: {
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1985-03-15",
      nationality: "American",
      passportNumber: "US123456789",
      passportExpiry: "2028-03-15"
    },
    caseDetails: {
      caseId: "TV-2024-001234",
      visaType: "Tourist Visa",
      country: "United Kingdom",
      applicationDate: "2024-08-15",
      expectedDecision: "2024-09-15",
      status: "Document Review",
      priority: "Standard",
      assignedConsultant: "Sarah Johnson"
    },
    documents: [
      { name: "Passport Copy", status: "approved", uploadDate: "2024-08-15", required: true },
      { name: "Bank Statement", status: "pending", uploadDate: "2024-08-16", required: true },
      { name: "Employment Letter", status: "rejected", uploadDate: "2024-08-14", required: true },
      { name: "Travel Insurance", status: "missing", uploadDate: null, required: true },
      { name: "Hotel Booking", status: "approved", uploadDate: "2024-08-15", required: false }
    ],
    communications: {
      totalMessages: 24,
      lastContact: "2024-08-30",
      responseTime: "2.5 hours",
      preferredChannel: "whatsapp",
      optInStatus: {
        email: true,
        whatsapp: true,
        sms: false
      }
    },
    timeline: [
      { date: "2024-08-30", event: "Document review completed", type: "update" },
      { date: "2024-08-29", event: "Bank statement uploaded", type: "document" },
      { date: "2024-08-28", event: "Follow-up email sent", type: "communication" },
      { date: "2024-08-25", event: "Employment letter rejected", type: "document" },
      { date: "2024-08-20", event: "Initial consultation completed", type: "meeting" }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'missing': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'document': return 'FileText';
      case 'communication': return 'MessageSquare';
      case 'meeting': return 'Calendar';
      case 'update': return 'Bell';
      default: return 'Circle';
    }
  };

  const tabs = [
    { id: 'case', label: 'Case Info', icon: 'Briefcase' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'preferences', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={conversation?.avatar}
            alt={conversation?.clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{conversation?.clientName}</h3>
            <p className="text-sm text-muted-foreground">{clientData?.personalInfo?.email}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-foreground">{clientData?.communications?.totalMessages}</div>
            <div className="text-xs text-muted-foreground">Messages</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-foreground">{clientData?.communications?.responseTime}</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 py-3 px-2 text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden lg:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'case' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-3">Case Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Case ID:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.caseDetails?.caseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Visa Type:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.caseDetails?.visaType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Country:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.caseDetails?.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-sm font-medium text-primary">{clientData?.caseDetails?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Priority:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.caseDetails?.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Consultant:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.caseDetails?.assignedConsultant}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.personalInfo?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nationality:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.personalInfo?.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Passport:</span>
                  <span className="text-sm font-medium text-foreground">{clientData?.personalInfo?.passportNumber}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground mb-3">Document Status</h4>
            {clientData?.documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{doc?.name}</div>
                    {doc?.uploadDate && (
                      <div className="text-xs text-muted-foreground">
                        Uploaded: {new Date(doc.uploadDate)?.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {doc?.required && (
                    <Icon name="AlertCircle" size={12} className="text-red-500" />
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc?.status)}`}>
                    {doc?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground mb-3">Recent Activity</h4>
            {clientData?.timeline?.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={getEventIcon(event?.type)} size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{event?.event}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground mb-3">Communication Preferences</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-foreground">Email Notifications</span>
                </div>
                <div className={`w-10 h-6 rounded-full ${clientData?.communications?.optInStatus?.email ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${clientData?.communications?.optInStatus?.email ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-foreground">WhatsApp Messages</span>
                </div>
                <div className={`w-10 h-6 rounded-full ${clientData?.communications?.optInStatus?.whatsapp ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${clientData?.communications?.optInStatus?.whatsapp ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Smartphone" size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-foreground">SMS Notifications</span>
                </div>
                <div className={`w-10 h-6 rounded-full ${clientData?.communications?.optInStatus?.sms ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${clientData?.communications?.optInStatus?.sms ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h5 className="font-medium text-foreground mb-3">Quick Actions</h5>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Flag for Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientContextPanel;