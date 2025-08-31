import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DraftManager = ({ onDraftSelect, onDraftSave, currentDraft }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [draftName, setDraftName] = useState('');

  const drafts = [
    {
      id: 'draft-001',
      name: 'Tourist Visa - John Smith',
      status: 'draft',
      template: 'Tourist Visa Cover Letter',
      client: 'John Smith',
      country: 'Germany',
      lastModified: '2025-08-31T10:30:00',
      wordCount: 245,
      version: 1,
      assignedTo: 'Sarah Johnson',
      notes: 'Waiting for client to provide hotel confirmation'
    },
    {
      id: 'draft-002',
      name: 'Business Invitation - ABC Corp',
      status: 'review',
      template: 'Business Invitation Letter',
      client: 'Michael Chen',
      country: 'United States',
      lastModified: '2025-08-31T09:15:00',
      wordCount: 312,
      version: 2,
      assignedTo: 'David Wilson',
      notes: 'Ready for manager approval'
    },
    {
      id: 'draft-003',
      name: 'Student Support - Emma Davis',
      status: 'approved',
      template: 'Student Support Letter',
      client: 'Emma Davis',
      country: 'United Kingdom',
      lastModified: '2025-08-30T16:45:00',
      wordCount: 189,
      version: 3,
      assignedTo: 'Lisa Anderson',
      notes: 'Approved and sent to client'
    },
    {
      id: 'draft-004',
      name: 'Employment Letter - Tech Solutions',
      status: 'revision',
      template: 'Employment Verification Letter',
      client: 'Robert Taylor',
      country: 'Canada',
      lastModified: '2025-08-30T14:20:00',
      wordCount: 278,
      version: 1,
      assignedTo: 'Sarah Johnson',
      notes: 'Client requested changes to employment details'
    },
    {
      id: 'draft-005',
      name: 'Medical Treatment - Maria Garcia',
      status: 'draft',
      template: 'Medical Treatment Letter',
      client: 'Maria Garcia',
      country: 'Germany',
      lastModified: '2025-08-30T11:30:00',
      wordCount: 156,
      version: 1,
      assignedTo: 'David Wilson',
      notes: 'Waiting for medical reports from doctor'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Under Review' },
    { value: 'revision', label: 'Needs Revision' },
    { value: 'approved', label: 'Approved' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'text-muted-foreground bg-muted';
      case 'review': return 'text-warning bg-warning/10';
      case 'revision': return 'text-error bg-error/10';
      case 'approved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft': return 'FileEdit';
      case 'review': return 'Clock';
      case 'revision': return 'AlertCircle';
      case 'approved': return 'CheckCircle';
      default: return 'File';
    }
  };

  const filteredDrafts = drafts?.filter(draft => {
    const matchesSearch = draft?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         draft?.client?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || draft?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSaveDraft = () => {
    if (draftName?.trim()) {
      onDraftSave(draftName);
      setDraftName('');
      setShowSaveDialog(false);
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Draft Manager</h3>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>
      {/* Drafts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredDrafts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No drafts found</p>
            <p className="text-sm text-muted-foreground">Create your first draft to get started</p>
          </div>
        ) : (
          filteredDrafts?.map((draft) => (
            <div
              key={draft?.id}
              className={`p-3 rounded-lg border cursor-pointer transition-smooth hover:shadow-elevation-1 ${
                currentDraft?.id === draft?.id
                  ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
              }`}
              onClick={() => onDraftSelect(draft)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground text-sm">{draft?.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(draft?.status)}`}>
                  <Icon name={getStatusIcon(draft?.status)} size={12} className="inline mr-1" />
                  {statusOptions?.find(s => s?.value === draft?.status)?.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{draft?.client}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{draft?.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={12} />
                  <span>{draft?.wordCount} words</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="GitBranch" size={12} />
                  <span>v{draft?.version}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{formatDate(draft?.lastModified)}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="User" size={12} />
                  <span>{draft?.assignedTo}</span>
                </div>
              </div>
              
              {draft?.notes && (
                <div className="mt-2 p-2 bg-muted/30 rounded text-xs text-muted-foreground">
                  <Icon name="MessageSquare" size={12} className="inline mr-1" />
                  {draft?.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Save Draft</h3>
            
            <Input
              label="Draft Name"
              placeholder="Enter draft name..."
              value={draftName}
              onChange={(e) => setDraftName(e?.target?.value)}
              className="mb-4"
            />
            
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleSaveDraft}
                disabled={!draftName?.trim()}
                className="flex-1"
              >
                Save Draft
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
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

export default DraftManager;