import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExpenseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const expenses = [
    {
      id: "EXP-2024-001",
      description: "Office Rent - August 2024",
      category: "Office Expenses",
      amount: 2500,
      currency: "USD",
      date: "2024-08-01",
      vendor: "Property Management Co.",
      status: "approved",
      receipt: true,
      approvedBy: "Admin",
      department: "Operations"
    },
    {
      id: "EXP-2024-002",
      description: "Marketing Campaign - Google Ads",
      category: "Marketing",
      amount: 850,
      currency: "USD",
      date: "2024-08-15",
      vendor: "Google LLC",
      status: "pending",
      receipt: true,
      approvedBy: null,
      department: "Marketing"
    },
    {
      id: "EXP-2024-003",
      description: "Staff Training - Visa Regulations",
      category: "Training",
      amount: 1200,
      currency: "USD",
      date: "2024-08-20",
      vendor: "Immigration Training Institute",
      status: "approved",
      receipt: true,
      approvedBy: "HR Manager",
      department: "Human Resources"
    },
    {
      id: "EXP-2024-004",
      description: "Software License - CRM System",
      category: "Software",
      amount: 299,
      currency: "USD",
      date: "2024-08-25",
      vendor: "CRM Solutions Inc.",
      status: "rejected",
      receipt: false,
      approvedBy: "Finance Manager",
      department: "IT",
      rejectionReason: "Duplicate subscription"
    },
    {
      id: "EXP-2024-005",
      description: "Client Meeting - Business Lunch",
      category: "Entertainment",
      amount: 125,
      currency: "USD",
      date: "2024-08-28",
      vendor: "Restaurant ABC",
      status: "approved",
      receipt: true,
      approvedBy: "Sales Manager",
      department: "Sales"
    },
    {
      id: "EXP-2024-006",
      description: "Travel - Client Visit",
      category: "Travel",
      amount: 450,
      currency: "USD",
      date: "2024-08-30",
      vendor: "Airlines XYZ",
      status: "pending",
      receipt: true,
      approvedBy: null,
      department: "Sales"
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Office Expenses', label: 'Office Expenses' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Training', label: 'Training' },
    { value: 'Software', label: 'Software' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Travel', label: 'Travel' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'rejected': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Office Expenses': return 'Building2';
      case 'Marketing': return 'Megaphone';
      case 'Training': return 'GraduationCap';
      case 'Software': return 'Monitor';
      case 'Entertainment': return 'Coffee';
      case 'Travel': return 'Plane';
      default: return 'Receipt';
    }
  };

  const filteredExpenses = expenses?.filter(expense => {
    const matchesSearch = expense?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         expense?.vendor?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         expense?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense?.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses?.reduce((sum, expense) => sum + expense?.amount, 0);
  const approvedExpenses = filteredExpenses?.filter(exp => exp?.status === 'approved')?.reduce((sum, expense) => sum + expense?.amount, 0);
  const pendingExpenses = filteredExpenses?.filter(exp => exp?.status === 'pending')?.reduce((sum, expense) => sum + expense?.amount, 0);

  // Category breakdown
  const categoryBreakdown = categoryOptions?.slice(1)?.map(cat => {
    const categoryExpenses = expenses?.filter(exp => exp?.category === cat?.value);
    const total = categoryExpenses?.reduce((sum, exp) => sum + exp?.amount, 0);
    const percentage = expenses?.length > 0 ? (total / expenses?.reduce((sum, exp) => sum + exp?.amount, 0) * 100) : 0;
    return {
      category: cat?.label,
      total,
      percentage: percentage?.toFixed(1),
      count: categoryExpenses?.length
    };
  })?.sort((a, b) => b?.total - a?.total);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Expense Management</h2>
          <p className="text-sm text-muted-foreground">Track and manage business expenses</p>
        </div>
        <Button 
          variant="default" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => setShowAddModal(true)}
        >
          Add Expense
        </Button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-lg font-semibold text-foreground">${totalExpenses?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-lg font-semibold text-foreground">${approvedExpenses?.toLocaleString()}</p>
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
              <p className="text-lg font-semibold text-foreground">${pendingExpenses?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Receipt" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-lg font-semibold text-foreground">{filteredExpenses?.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Expense by Category</h3>
          <div className="space-y-4">
            {categoryBreakdown?.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={getCategoryIcon(cat?.category)} size={16} className="text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{cat?.category}</span>
                    <p className="text-xs text-muted-foreground">{cat?.count} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">${cat?.total?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{cat?.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {expenses?.slice(0, 5)?.map((expense) => (
              <div key={expense?.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(expense?.status)}`}>
                  <Icon name={getStatusIcon(expense?.status)} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{expense?.description}</p>
                  <p className="text-xs text-muted-foreground">{expense?.date} • {expense?.vendor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">${expense?.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Filter by category"
          />
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            Date Range
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {/* Expense List */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-foreground">Expense ID</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Description</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Category</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Vendor</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses?.map((expense) => (
                <tr key={expense?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-foreground">{expense?.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">{expense?.description}</p>
                      <p className="text-xs text-muted-foreground">{expense?.department}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getCategoryIcon(expense?.category)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{expense?.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">
                      {expense?.currency} {expense?.amount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">{expense?.vendor}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense?.status)}`}>
                      <Icon name={getStatusIcon(expense?.status)} size={12} />
                      <span className="capitalize">{expense?.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-foreground">{expense?.date}</p>
                      {expense?.approvedBy && (
                        <p className="text-xs text-muted-foreground">By: {expense?.approvedBy}</p>
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
                      {expense?.receipt && (
                        <Button variant="ghost" size="icon">
                          <Icon name="Paperclip" size={16} />
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

export default ExpenseManagement;