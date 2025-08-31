import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const payments = [
    {
      id: "PAY-2024-001",
      invoiceId: "INV-2024-001",
      clientName: "Sarah Johnson",
      amount: 850,
      currency: "USD",
      method: "Credit Card",
      status: "completed",
      transactionId: "txn_1234567890",
      processedDate: "2024-08-12",
      gateway: "Stripe",
      fees: 25.50
    },
    {
      id: "PAY-2024-002",
      invoiceId: "INV-2024-005",
      clientName: "Lisa Thompson",
      amount: 1500,
      currency: "USD",
      method: "Bank Transfer",
      status: "pending",
      transactionId: "txn_0987654321",
      processedDate: "2024-08-30",
      gateway: "Bank Wire",
      fees: 15.00
    },
    {
      id: "PAY-2024-003",
      invoiceId: "INV-2024-002",
      clientName: "Michael Chen",
      amount: 1200,
      currency: "USD",
      method: "PayPal",
      status: "failed",
      transactionId: "txn_1122334455",
      processedDate: "2024-08-28",
      gateway: "PayPal",
      fees: 0,
      failureReason: "Insufficient funds"
    },
    {
      id: "PAY-2024-004",
      invoiceId: "INV-2024-004",
      clientName: "David Wilson",
      amount: 1100,
      currency: "EUR",
      method: "Credit Card",
      status: "processing",
      transactionId: "txn_5566778899",
      processedDate: "2024-08-31",
      gateway: "Stripe",
      fees: 33.00
    },
    {
      id: "PAY-2024-005",
      invoiceId: "INV-2024-006",
      clientName: "Anna Martinez",
      amount: 750,
      currency: "USD",
      method: "Debit Card",
      status: "refunded",
      transactionId: "txn_9988776655",
      processedDate: "2024-08-25",
      gateway: "Stripe",
      fees: -22.50,
      refundDate: "2024-08-29",
      refundReason: "Client request"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'processing': return 'bg-primary/10 text-primary';
      case 'failed': return 'bg-error/10 text-error';
      case 'refunded': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'processing': return 'Loader';
      case 'failed': return 'XCircle';
      case 'refunded': return 'RotateCcw';
      default: return 'Circle';
    }
  };

  const getMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'credit card': return 'CreditCard';
      case 'debit card': return 'CreditCard';
      case 'bank transfer': return 'Building2';
      case 'paypal': return 'Wallet';
      default: return 'DollarSign';
    }
  };

  const filteredPayments = payments?.filter(payment => {
    const matchesSearch = payment?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         payment?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         payment?.invoiceId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredPayments?.reduce((sum, payment) => sum + payment?.amount, 0);
  const totalFees = filteredPayments?.reduce((sum, payment) => sum + Math.abs(payment?.fees), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Payment Tracking</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage payment transactions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button variant="default" iconName="RefreshCw" iconPosition="left">
            Sync Payments
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-lg font-semibold text-foreground">
                {payments?.filter(p => p?.status === 'completed')?.length}
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
                {payments?.filter(p => p?.status === 'pending')?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-lg font-semibold text-foreground">${totalAmount?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Fees</p>
              <p className="text-lg font-semibold text-foreground">${totalFees?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          <Select
            options={dateOptions}
            value={dateFilter}
            onChange={setDateFilter}
            placeholder="Filter by date"
          />
          <Button variant="outline" iconName="Filter" iconPosition="left">
            Advanced Filters
          </Button>
        </div>
      </div>
      {/* Payment List */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-foreground">Payment ID</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Client</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Method</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Gateway</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments?.map((payment) => (
                <tr key={payment?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-mono text-sm text-foreground">{payment?.id}</span>
                      <p className="text-xs text-muted-foreground">Invoice: {payment?.invoiceId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">{payment?.clientName}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-medium text-foreground">
                        {payment?.currency} {payment?.amount?.toLocaleString()}
                      </span>
                      {payment?.fees !== 0 && (
                        <p className="text-xs text-muted-foreground">
                          Fees: ${Math.abs(payment?.fees)?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getMethodIcon(payment?.method)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{payment?.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
                      <Icon name={getStatusIcon(payment?.status)} size={12} />
                      <span className="capitalize">{payment?.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-foreground">{payment?.processedDate}</p>
                      {payment?.refundDate && (
                        <p className="text-xs text-error">Refunded: {payment?.refundDate}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="text-sm text-foreground">{payment?.gateway}</span>
                      <p className="text-xs text-muted-foreground font-mono">{payment?.transactionId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Download" size={16} />
                      </Button>
                      {payment?.status === 'completed' && (
                        <Button variant="ghost" size="icon">
                          <Icon name="RotateCcw" size={16} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;