import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentInvoices = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const invoices = [
    {
      id: 'INV-2025-001',
      description: 'US Tourist Visa Consultation',
      amount: 299.00,
      currency: 'USD',
      status: 'paid',
      dueDate: '2025-08-15',
      paidDate: '2025-08-14',
      downloadUrl: '#'
    },
    {
      id: 'INV-2025-002',
      description: 'Document Processing Fee',
      amount: 150.00,
      currency: 'USD',
      status: 'pending',
      dueDate: '2025-09-01',
      paidDate: null,
      downloadUrl: null
    },
    {
      id: 'INV-2025-003',
      description: 'Express Processing Service',
      amount: 99.00,
      currency: 'USD',
      status: 'overdue',
      dueDate: '2025-08-25',
      paidDate: null,
      downloadUrl: null
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'bank', name: 'Bank Transfer', icon: 'Building2' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'Payment for INV-2025-001',
      amount: -299.00,
      currency: 'USD',
      date: '2025-08-14',
      status: 'completed',
      method: 'Credit Card'
    },
    {
      id: 2,
      type: 'refund',
      description: 'Refund for cancelled service',
      amount: 50.00,
      currency: 'USD',
      date: '2025-08-10',
      status: 'completed',
      method: 'Credit Card'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': case'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'overdue':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': case'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'pending':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'overdue':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const handlePayInvoice = (invoiceId) => {
    console.log('Processing payment for invoice:', invoiceId);
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Payments & Invoices</h2>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Download All
        </Button>
      </div>
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="font-medium text-success">Paid</span>
          </div>
          <p className="text-2xl font-bold text-foreground">$299.00</p>
          <p className="text-sm text-muted-foreground">1 invoice</p>
        </div>
        
        <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
            <span className="font-medium text-warning">Pending</span>
          </div>
          <p className="text-2xl font-bold text-foreground">$150.00</p>
          <p className="text-sm text-muted-foreground">1 invoice</p>
        </div>
        
        <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <span className="font-medium text-error">Overdue</span>
          </div>
          <p className="text-2xl font-bold text-foreground">$99.00</p>
          <p className="text-sm text-muted-foreground">1 invoice</p>
        </div>
      </div>
      {/* Invoices */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Recent Invoices</h3>
        <div className="space-y-4">
          {invoices?.map((invoice) => (
            <div key={invoice?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{invoice?.id}</h4>
                    <p className="text-sm text-muted-foreground">{invoice?.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(invoice?.amount, invoice?.currency)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Due: {new Date(invoice.dueDate)?.toLocaleDateString()}
                        </span>
                      </div>
                      {invoice?.paidDate && (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={14} className="text-success" />
                          <span className="text-sm text-success">
                            Paid: {new Date(invoice.paidDate)?.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(invoice?.status)}
                    <span className={`text-sm font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(invoice?.status)}`}>
                      {invoice?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {invoice?.status !== 'paid' && (
                      <Button 
                        size="sm" 
                        onClick={() => handlePayInvoice(invoice?.id)}
                        iconName="CreditCard"
                      >
                        Pay Now
                      </Button>
                    )}
                    {invoice?.downloadUrl && (
                      <Button size="sm" variant="ghost" iconName="Download" />
                    )}
                    <Button size="sm" variant="ghost" iconName="Eye" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              onClick={() => setSelectedPaymentMethod(method?.id)}
              className={`p-4 border rounded-lg text-left transition-smooth ${
                selectedPaymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={method?.icon} size={24} className="text-primary" />
                <span className="font-medium text-foreground">{method?.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Transaction History</h3>
        <div className="space-y-3">
          {transactions?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction?.type === 'payment' ? 'bg-error/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={transaction?.type === 'payment' ? 'ArrowDown' : 'ArrowUp'} 
                    size={16} 
                    className={transaction?.type === 'payment' ? 'text-error' : 'text-success'} 
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction?.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction?.method} • {new Date(transaction.date)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction?.amount > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction?.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction?.amount), transaction?.currency)}
                </p>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(transaction?.status)}
                  <span className="text-sm text-muted-foreground capitalize">{transaction?.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoices;