import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const invoices = [
    {
      id: "INV-2024-001",
      clientName: "Sarah Johnson",
      caseType: "Tourist Visa - UK",
      amount: 850,
      currency: "USD",
      status: "paid",
      dueDate: "2024-08-15",
      paidDate: "2024-08-12",
      createdDate: "2024-07-28"
    },
    {
      id: "INV-2024-002",
      clientName: "Michael Chen",
      caseType: "Business Visa - Canada",
      amount: 1200,
      currency: "USD",
      status: "pending",
      dueDate: "2024-09-05",
      paidDate: null,
      createdDate: "2024-08-20"
    },
    {
      id: "INV-2024-003",
      clientName: "Emma Rodriguez",
      caseType: "Student Visa - Australia",
      amount: 950,
      currency: "USD",
      status: "overdue",
      dueDate: "2024-08-25",
      paidDate: null,
      createdDate: "2024-08-10"
    },
    {
      id: "INV-2024-004",
      clientName: "David Wilson",
      caseType: "Work Visa - Germany",
      amount: 1100,
      currency: "EUR",
      status: "draft",
      dueDate: "2024-09-10",
      paidDate: null,
      createdDate: "2024-08-30"
    },
    {
      id: "INV-2024-005",
      clientName: "Lisa Thompson",
      caseType: "Family Visa - USA",
      amount: 1500,
      currency: "USD",
      status: "sent",
      dueDate: "2024-09-15",
      paidDate: null,
      createdDate: "2024-08-28"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'overdue': return 'bg-error/10 text-error';
      case 'sent': return 'bg-primary/10 text-primary';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'overdue': return 'AlertCircle';
      case 'sent': return 'Send';
      case 'draft': return 'FileText';
      default: return 'FileText';
    }
  };

  const filteredInvoices = invoices?.filter(invoice => {
    const matchesSearch = invoice?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         invoice?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         invoice?.caseType?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Invoice Management</h2>
          <p className="text-sm text-muted-foreground">Create, track, and manage client invoices</p>
        </div>
        <Button 
          variant="default" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => setShowCreateModal(true)}
        >
          Create Invoice
        </Button>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {/* Invoice List */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-foreground">Invoice ID</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Client</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Case Type</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices?.map((invoice) => (
                <tr key={invoice?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-foreground">{invoice?.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">{invoice?.clientName}</p>
                      <p className="text-xs text-muted-foreground">Created: {invoice?.createdDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">{invoice?.caseType}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">
                      {invoice?.currency} {invoice?.amount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice?.status)}`}>
                      <Icon name={getStatusIcon(invoice?.status)} size={12} />
                      <span className="capitalize">{invoice?.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-foreground">{invoice?.dueDate}</p>
                      {invoice?.paidDate && (
                        <p className="text-xs text-success">Paid: {invoice?.paidDate}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Download" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-lg font-semibold text-foreground">
                {invoices?.filter(inv => inv?.status === 'paid')?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold text-foreground">
                {invoices?.filter(inv => inv?.status === 'pending')?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-lg font-semibold text-foreground">
                {invoices?.filter(inv => inv?.status === 'overdue')?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-foreground">{invoices?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;