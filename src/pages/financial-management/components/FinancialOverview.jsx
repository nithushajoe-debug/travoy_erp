import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialOverview = () => {
  const overviewData = {
    totalRevenue: 125000,
    monthlyRevenue: 18500,
    outstandingInvoices: 12500,
    paidInvoices: 105000,
    pendingPayments: 8,
    overduePayments: 3,
    profitMargin: 68.5,
    expenseRatio: 31.5
  };

  const revenueGrowth = 12.5;
  const paymentGrowth = -5.2;

  const overviewCards = [
    {
      title: "Total Revenue",
      value: `$${overviewData?.totalRevenue?.toLocaleString()}`,
      change: `+${revenueGrowth}%`,
      changeType: "positive",
      icon: "DollarSign",
      description: "Year to date revenue"
    },
    {
      title: "Monthly Revenue",
      value: `$${overviewData?.monthlyRevenue?.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "Current month earnings"
    },
    {
      title: "Outstanding Invoices",
      value: `$${overviewData?.outstandingInvoices?.toLocaleString()}`,
      change: `${paymentGrowth}%`,
      changeType: "negative",
      icon: "FileText",
      description: "Pending invoice payments"
    },
    {
      title: "Profit Margin",
      value: `${overviewData?.profitMargin}%`,
      change: "+2.1%",
      changeType: "positive",
      icon: "PieChart",
      description: "Current profit margin"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards?.map((card, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                card?.changeType === 'positive' ? 'bg-success/10' : 'bg-error/10'
              }`}>
                <Icon 
                  name={card?.icon} 
                  size={24} 
                  className={card?.changeType === 'positive' ? 'text-success' : 'text-error'} 
                />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                card?.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {card?.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
              <p className="text-sm text-muted-foreground mb-2">{card?.title}</p>
              <p className="text-xs text-muted-foreground">{card?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Paid Invoices</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${overviewData?.paidInvoices?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">89% of total</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm text-foreground">Pending Payments</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{overviewData?.pendingPayments} invoices</p>
                <p className="text-xs text-muted-foreground">Within terms</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-sm text-foreground">Overdue Payments</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{overviewData?.overduePayments} invoices</p>
                <p className="text-xs text-muted-foreground">Requires follow-up</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Staff Salaries</span>
              <span className="text-sm font-medium text-foreground">45%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Office Expenses</span>
              <span className="text-sm font-medium text-foreground">25%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Marketing</span>
              <span className="text-sm font-medium text-foreground">20%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Other</span>
              <span className="text-sm font-medium text-foreground">10%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;