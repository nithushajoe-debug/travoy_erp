import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedUsers, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionData, setActionData] = useState(null);

  const actionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'suspend', label: 'Suspend Users' },
    { value: 'delete', label: 'Delete Users' },
    { value: 'export', label: 'Export Selected' },
    { value: 'send_email', label: 'Send Email' },
    { value: 'reset_password', label: 'Reset Passwords' }
  ];

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    
    if (action && selectedUsers?.length > 0) {
      const actionInfo = {
        action,
        userCount: selectedUsers?.length,
        actionLabel: actionOptions?.find(opt => opt?.value === action)?.label
      };
      setActionData(actionInfo);
      setShowConfirmation(true);
    }
  };

  const handleConfirmAction = () => {
    if (selectedAction && selectedUsers?.length > 0) {
      onBulkAction(selectedAction, selectedUsers);
      setShowConfirmation(false);
      setSelectedAction('');
      setActionData(null);
      onClearSelection();
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedAction('');
    setActionData(null);
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate':
        return 'UserCheck';
      case 'deactivate':
        return 'UserX';
      case 'suspend':
        return 'UserMinus';
      case 'delete':
        return 'Trash2';
      case 'export':
        return 'Download';
      case 'send_email':
        return 'Mail';
      case 'reset_password':
        return 'Key';
      default:
        return 'Settings';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'activate':
        return 'text-success';
      case 'deactivate':
        return 'text-warning';
      case 'suspend':
        return 'text-warning';
      case 'delete':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  if (selectedUsers?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="w-64">
              <Select
                placeholder="Choose action..."
                options={actionOptions}
                value={selectedAction}
                onChange={handleActionSelect}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Selection
          </Button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && actionData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${getActionColor(actionData?.action)}`}>
                  <Icon name={getActionIcon(actionData?.action)} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Confirm Bulk Action</h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-foreground">
                  Are you sure you want to <strong>{actionData?.actionLabel?.toLowerCase()}</strong> for{' '}
                  <strong>{actionData?.userCount}</strong> selected user{actionData?.userCount !== 1 ? 's' : ''}?
                </p>
                
                {actionData?.action === 'delete' && (
                  <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <span className="text-sm font-medium text-error">Warning</span>
                    </div>
                    <p className="text-sm text-error mt-1">
                      This will permanently delete the selected users and all their associated data.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancelAction}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionData?.action === 'delete' ? 'destructive' : 'default'}
                  onClick={handleConfirmAction}
                  iconName={getActionIcon(actionData?.action)}
                  iconPosition="left"
                  iconSize={16}
                >
                  {actionData?.actionLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;