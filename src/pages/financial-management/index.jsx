import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';

import FinancialOverview from './components/FinancialOverview';
import InvoiceManagement from './components/InvoiceManagement';
import PaymentTracking from './components/PaymentTracking';
import ExpenseManagement from './components/ExpenseManagement';
import FinancialReports from './components/FinancialReports';

const FinancialManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'invoices', label: 'Invoices', icon: 'FileText' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'expenses', label: 'Expenses', icon: 'Receipt' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <FinancialOverview />;
      case 'invoices':
        return <InvoiceManagement />;
      case 'payments':
        return <PaymentTracking />;
      case 'expenses':
        return <ExpenseManagement />;
      case 'reports':
        return <FinancialReports />;
      default:
        return <FinancialOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />
      {/* Main Content */}
      <main 
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Financial Management</h1>
                <p className="text-muted-foreground">
                  Comprehensive accounting oversight and financial reporting
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6 shadow-elevation-1">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleMobileMenuToggle}
        />
      )}
    </div>
  );
};

export default FinancialManagement;