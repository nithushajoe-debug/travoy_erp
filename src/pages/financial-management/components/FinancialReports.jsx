import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FinancialReports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [timeRange, setTimeRange] = useState('month');

  const revenueData = [
    { month: 'Jan', revenue: 15000, expenses: 8000, profit: 7000 },
    { month: 'Feb', revenue: 18000, expenses: 9500, profit: 8500 },
    { month: 'Mar', revenue: 22000, expenses: 11000, profit: 11000 },
    { month: 'Apr', revenue: 19000, expenses: 10200, profit: 8800 },
    { month: 'May', revenue: 25000, expenses: 12500, profit: 12500 },
    { month: 'Jun', revenue: 28000, expenses: 13800, profit: 14200 },
    { month: 'Jul', revenue: 32000, expenses: 15000, profit: 17000 },
    { month: 'Aug', revenue: 35000, expenses: 16500, profit: 18500 }
  ];

  const visaTypeRevenue = [
    { name: 'Tourist Visa', value: 45000, percentage: 35, color: '#3B82F6' },
    { name: 'Business Visa', value: 38000, percentage: 30, color: '#10B981' },
    { name: 'Student Visa', value: 25000, percentage: 20, color: '#F59E0B' },
    { name: 'Work Visa', value: 15000, percentage: 12, color: '#EF4444' },
    { name: 'Family Visa', value: 5000, percentage: 3, color: '#8B5CF6' }
  ];

  const staffPerformance = [
    { name: 'Sarah Johnson', cases: 45, revenue: 38500, conversion: 85 },
    { name: 'Michael Chen', cases: 38, revenue: 32200, conversion: 78 },
    { name: 'Emma Rodriguez', cases: 42, revenue: 35800, conversion: 82 },
    { name: 'David Wilson', cases: 35, revenue: 29500, conversion: 75 },
    { name: 'Lisa Thompson', cases: 40, revenue: 34000, conversion: 80 }
  ];

  const monthlyTrends = [
    { month: 'Jan', clients: 120, cases: 95, success: 78 },
    { month: 'Feb', clients: 135, cases: 108, success: 89 },
    { month: 'Mar', clients: 150, cases: 125, success: 102 },
    { month: 'Apr', clients: 142, cases: 118, success: 95 },
    { month: 'May', clients: 165, cases: 140, success: 115 },
    { month: 'Jun', clients: 180, cases: 155, success: 128 },
    { month: 'Jul', clients: 195, cases: 168, success: 142 },
    { month: 'Aug', clients: 210, cases: 185, success: 158 }
  ];

  const reportTypeOptions = [
    { value: 'revenue', label: 'Revenue Analysis' },
    { value: 'visa-types', label: 'Visa Type Breakdown' },
    { value: 'staff-performance', label: 'Staff Performance' },
    { value: 'trends', label: 'Monthly Trends' }
  ];

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const renderRevenueAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-xl font-bold text-foreground">$194,000</p>
              <p className="text-xs text-success">+12.5% from last period</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-bold text-foreground">$96,500</p>
              <p className="text-xs text-error">+8.2% from last period</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-xl font-bold text-foreground">$97,500</p>
              <p className="text-xs text-success">+15.8% from last period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisaTypeBreakdown = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue by Visa Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visaTypeRevenue}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {visaTypeRevenue?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Visa Type Performance</h3>
          <div className="space-y-4">
            {visaTypeRevenue?.map((visa, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: visa?.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{visa?.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">${visa?.value?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{visa?.percentage}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffPerformance = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Staff Performance Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-foreground">Staff Member</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Cases Handled</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Revenue Generated</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Conversion Rate</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {staffPerformance?.map((staff, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <span className="font-medium text-foreground">{staff?.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-foreground">{staff?.cases}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-foreground">${staff?.revenue?.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground">{staff?.conversion}%</span>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${staff?.conversion}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      staff?.conversion >= 80 ? 'bg-success/10 text-success' :
                      staff?.conversion >= 70 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                    }`}>
                      {staff?.conversion >= 80 ? 'Excellent' :
                       staff?.conversion >= 70 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMonthlyTrends = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Business Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="clients" stroke="#3B82F6" strokeWidth={2} name="New Clients" />
              <Line type="monotone" dataKey="cases" stroke="#10B981" strokeWidth={2} name="Cases Opened" />
              <Line type="monotone" dataKey="success" stroke="#F59E0B" strokeWidth={2} name="Successful Cases" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <p className="text-xl font-bold text-foreground">1,397</p>
              <p className="text-xs text-success">+18.2% growth</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cases Processed</p>
              <p className="text-xl font-bold text-foreground">1,194</p>
              <p className="text-xs text-success">+22.5% growth</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-bold text-foreground">86.5%</p>
              <p className="text-xs text-success">+3.2% improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (reportType) {
      case 'revenue': return renderRevenueAnalysis();
      case 'visa-types': return renderVisaTypeBreakdown();
      case 'staff-performance': return renderStaffPerformance();
      case 'trends': return renderMonthlyTrends();
      default: return renderRevenueAnalysis();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Financial Reports</h2>
          <p className="text-sm text-muted-foreground">Comprehensive business analytics and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
          <Button variant="outline" iconName="Share" iconPosition="left">
            Share
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Report Type"
            options={reportTypeOptions}
            value={reportType}
            onChange={setReportType}
          />
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
          <div className="flex items-end">
            <Button variant="default" iconName="RefreshCw" iconPosition="left" className="w-full">
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderReport()}
    </div>
  );
};

export default FinancialReports;