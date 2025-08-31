import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkMessageModal = ({ isOpen, onClose, onSendBulkMessage }) => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [channel, setChannel] = useState('email');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const recipients = [
    { id: 1, name: "John Smith", email: "john@email.com", phone: "+1234567890", status: "active", visaType: "Tourist" },
    { id: 2, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1234567891", status: "pending", visaType: "Business" },
    { id: 3, name: "Michael Brown", email: "michael@email.com", phone: "+1234567892", status: "active", visaType: "Student" },
    { id: 4, name: "Emily Davis", email: "emily@email.com", phone: "+1234567893", status: "active", visaType: "Tourist" },
    { id: 5, name: "David Wilson", email: "david@email.com", phone: "+1234567894", status: "pending", visaType: "Business" }
  ];

  const templates = [
    { value: 'welcome', label: 'Welcome Message' },
    { value: 'document-request', label: 'Document Request' },
    { value: 'status-update', label: 'Status Update' },
    { value: 'appointment-reminder', label: 'Appointment Reminder' },
    { value: 'custom', label: 'Custom Message' }
  ];

  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'both', label: 'Email & WhatsApp' }
  ];

  const handleRecipientToggle = (recipientId) => {
    setSelectedRecipients(prev => 
      prev?.includes(recipientId)
        ? prev?.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecipients?.length === recipients?.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(recipients?.map(r => r?.id));
    }
  };

  const handleSend = () => {
    const messageData = {
      recipients: selectedRecipients,
      content: messageContent,
      template: selectedTemplate,
      channel,
      scheduleDate: scheduleDate ? `${scheduleDate} ${scheduleTime}` : null
    };
    onSendBulkMessage(messageData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Send Bulk Message</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-[600px]">
          {/* Recipients Panel */}
          <div className="w-1/3 border-r border-border p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Recipients</h3>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedRecipients?.length === recipients?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            <div className="space-y-2">
              {recipients?.map((recipient) => (
                <div
                  key={recipient?.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                    selectedRecipients?.includes(recipient?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => handleRecipientToggle(recipient?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedRecipients?.includes(recipient?.id)}
                      onChange={() => handleRecipientToggle(recipient?.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{recipient?.name}</div>
                      <div className="text-sm text-muted-foreground">{recipient?.email}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          recipient?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {recipient?.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{recipient?.visaType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="text-sm text-foreground">
                <strong>{selectedRecipients?.length}</strong> of {recipients?.length} recipients selected
              </div>
            </div>
          </div>

          {/* Message Composition Panel */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Channel Selection */}
              <Select
                label="Channel"
                options={channelOptions}
                value={channel}
                onChange={setChannel}
                required
              />

              {/* Template Selection */}
              <Select
                label="Message Template"
                options={templates}
                value={selectedTemplate}
                onChange={setSelectedTemplate}
                placeholder="Choose a template or create custom message"
              />

              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message Content *
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e?.target?.value)}
                  placeholder="Type your message here..."
                  className="w-full h-40 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Use merge fields: {`{{clientName}}, {{visaType}}, {{country}}, {{caseId}}`}
                </div>
              </div>

              {/* Scheduling */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Schedule Date (Optional)"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e?.target?.value)}
                />
                <Input
                  label="Schedule Time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e?.target?.value)}
                  disabled={!scheduleDate}
                />
              </div>

              {/* Preview */}
              {messageContent && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Preview</h4>
                  <div className="text-sm text-foreground whitespace-pre-wrap">
                    {messageContent?.replace(/{{clientName}}/g, 'John Smith')?.replace(/{{visaType}}/g, 'Tourist Visa')?.replace(/{{country}}/g, 'United Kingdom')?.replace(/{{caseId}}/g, 'TV-2024-001234')
                    }
                  </div>
                </div>
              )}

              {/* Compliance Warning */}
              {channel?.includes('whatsapp') && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">WhatsApp Compliance</div>
                      <div className="text-yellow-700 mt-1">
                        Only clients who have opted in to WhatsApp messages will receive this communication.
                        Rate limits apply for bulk messaging.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedRecipients?.length} recipients selected
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSend}
              disabled={selectedRecipients?.length === 0 || !messageContent?.trim()}
            >
              {scheduleDate ? 'Schedule Message' : 'Send Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkMessageModal;