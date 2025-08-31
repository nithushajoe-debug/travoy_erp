import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ApprovalWorkflow = ({ onApprovalAction }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const pendingDocuments = [
    {
      id: 'doc-001',
      title: 'Tourist Visa Cover Letter - John Smith',
      client: 'John Smith',
      author: 'Sarah Johnson',
      submittedAt: '2025-08-31T09:30:00',
      priority: 'high',
      country: 'Germany',
      template: 'Tourist Visa Cover Letter',
      wordCount: 245,
      aiScore: 92,
      complianceScore: 88,
      status: 'pending',
      reviewers: ['Manager', 'Senior Consultant'],
      currentReviewer: 'Manager',
      estimatedTime: '15 min',
      changes: [
        'Updated client address',
        'Added travel insurance details',
        'Improved closing statement'
      ]
    },
    {
      id: 'doc-002',
      title: 'Business Invitation Letter - ABC Corp',
      client: 'Michael Chen',
      author: 'David Wilson',
      submittedAt: '2025-08-31T08:15:00',
      priority: 'medium',
      country: 'United States',
      template: 'Business Invitation Letter',
      wordCount: 312,
      aiScore: 85,
      complianceScore: 95,
      status: 'pending',
      reviewers: ['Manager'],
      currentReviewer: 'Manager',
      estimatedTime: '10 min',
      changes: [
        'Added company registration details',
        'Specified meeting agenda'
      ]
    },
    {
      id: 'doc-003',
      title: 'Student Support Letter - Emma Davis',
      client: 'Emma Davis',
      author: 'Lisa Anderson',
      submittedAt: '2025-08-30T16:45:00',
      priority: 'low',
      country: 'United Kingdom',
      template: 'Student Support Letter',
      wordCount: 189,
      aiScore: 78,
      complianceScore: 82,
      status: 'revision_requested',
      reviewers: ['Manager', 'Senior Consultant'],
      currentReviewer: 'Senior Consultant',
      estimatedTime: '20 min',
      changes: [
        'Need to add financial proof details',
        'Clarify relationship to student'
      ]
    }
  ];

  const reviewerOptions = [
    { value: 'manager', label: 'Manager' },
    { value: 'senior_consultant', label: 'Senior Consultant' },
    { value: 'legal_advisor', label: 'Legal Advisor' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'approved': return 'text-success bg-success/10';
      case 'revision_requested': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleApprove = (document) => {
    onApprovalAction('approve', document?.id);
  };

  const handleRequestRevision = (document) => {
    setSelectedDocument(document);
    setShowFeedbackDialog(true);
  };

  const handleReassign = (document) => {
    console.log('Reassign document:', document?.id);
  };

  const submitFeedback = () => {
    if (feedback?.trim() && selectedDocument) {
      onApprovalAction('revision', selectedDocument?.id, feedback);
      setFeedback('');
      setSelectedDocument(null);
      setShowFeedbackDialog(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date?.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Approval Workflow</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{pendingDocuments?.length} pending</span>
          </div>
        </div>
      </div>
      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {pendingDocuments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">All documents approved</p>
            <p className="text-sm text-muted-foreground">No pending approvals at this time</p>
          </div>
        ) : (
          pendingDocuments?.map((document) => (
            <div
              key={document?.id}
              className="p-4 border border-border rounded-lg bg-background hover:shadow-elevation-1 transition-smooth"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{document?.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>by {document?.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatDate(document?.submittedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Timer" size={12} />
                      <span>{document?.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(document?.priority)}`}>
                    <Icon name={getPriorityIcon(document?.priority)} size={12} className="inline mr-1" />
                    {document?.priority?.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document?.status)}`}>
                    {document?.status?.replace('_', ' ')?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  <span>{document?.country}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="FileText" size={12} />
                  <span>{document?.wordCount} words</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Bot" size={12} />
                  <span>AI: {document?.aiScore}%</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Shield" size={12} />
                  <span>Compliance: {document?.complianceScore}%</span>
                </div>
              </div>

              {/* Changes */}
              {document?.changes?.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-medium text-foreground mb-1">Recent Changes:</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {document?.changes?.map((change, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <Icon name="ArrowRight" size={10} />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApprove(document)}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestRevision(document)}
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Request Revision
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReassign(document)}
                    iconName="UserCheck"
                    iconPosition="left"
                  >
                    Reassign
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Feedback Dialog */}
      {showFeedbackDialog && selectedDocument && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Request Revision</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Document: {selectedDocument?.title}
            </p>
            
            <Input
              label="Feedback"
              description="Provide specific feedback for revision"
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e?.target?.value)}
              className="mb-4"
            />
            
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={submitFeedback}
                disabled={!feedback?.trim()}
                className="flex-1"
              >
                Send Feedback
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowFeedbackDialog(false);
                  setSelectedDocument(null);
                  setFeedback('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalWorkflow;