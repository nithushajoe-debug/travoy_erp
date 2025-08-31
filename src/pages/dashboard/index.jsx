import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import KPICard from './components/KPICard';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityList from './components/RecentActivityList';
import TaskWidget from './components/TaskWidget';
import PipelineChart from './components/PipelineChart';
import NotificationPanel from './components/NotificationPanel';
import PerformanceMetrics from './components/PerformanceMetrics';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // admin, staff, customer, super_admin
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for KPI cards
  const kpiData = {
    admin: [
      { title: "Total Cases", value: "1,247", change: "+12%", changeType: "positive", icon: "FileText", color: "primary" },
      { title: "Active Applications", value: "342", change: "+8%", changeType: "positive", icon: "Clock", color: "warning" },
      { title: "Monthly Revenue", value: "$84,250", change: "+15%", changeType: "positive", icon: "DollarSign", color: "success" },
      { title: "Success Rate", value: "94.2%", change: "+2.1%", changeType: "positive", icon: "TrendingUp", color: "success" }
    ],
    staff: [
      { title: "My Cases", value: "23", change: "+3", changeType: "positive", icon: "FileText", color: "primary" },
      { title: "Pending Tasks", value: "8", change: "-2", changeType: "positive", icon: "CheckSquare", color: "warning" },
      { title: "This Month", value: "45", change: "+12", changeType: "positive", icon: "Calendar", color: "success" },
      { title: "Success Rate", value: "96%", change: "+1%", changeType: "positive", icon: "Award", color: "success" }
    ],
    customer: [
      { title: "My Applications", value: "3", change: null, changeType: "neutral", icon: "FileText", color: "primary" },
      { title: "In Progress", value: "2", change: null, changeType: "neutral", icon: "Clock", color: "warning" },
      { title: "Documents Pending", value: "1", change: null, changeType: "neutral", icon: "Upload", color: "error" },
      { title: "Completed", value: "1", change: null, changeType: "neutral", icon: "CheckCircle", color: "success" }
    ]
  };

  // Mock data for quick actions
  const quickActions = {
    admin: [
      { label: "Create New Case", icon: "Plus", type: "create_case" },
      { label: "Generate Report", icon: "BarChart3", type: "generate_report" },
      { label: "Bulk Upload", icon: "Upload", type: "bulk_upload" },
      { label: "Send Broadcast", icon: "Send", type: "send_broadcast" }
    ],
    staff: [
      { label: "New Case", icon: "Plus", type: "create_case" },
      { label: "Upload Document", icon: "Upload", type: "upload_doc" },
      { label: "Send Message", icon: "MessageSquare", type: "send_message" },
      { label: "Schedule Call", icon: "Phone", type: "schedule_call" }
    ],
    customer: [
      { label: "Upload Document", icon: "Upload", type: "upload_doc" },
      { label: "Send Message", icon: "MessageSquare", type: "send_message" },
      { label: "Book Consultation", icon: "Calendar", type: "book_consultation" },
      { label: "Track Application", icon: "Search", type: "track_application" }
    ]
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "case_created",
      title: "New visa application created",
      description: "Tourist visa for John Smith - USA",
      timestamp: new Date(Date.now() - 300000),
      user: "Sarah Johnson"
    },
    {
      id: 2,
      type: "document_uploaded",
      title: "Document uploaded successfully",
      description: "Passport copy for case #VS-2024-0892",
      timestamp: new Date(Date.now() - 900000),
      user: "Michael Chen"
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment received",
      description: "$1,250 for business visa application",
      timestamp: new Date(Date.now() - 1800000),
      user: "System"
    },
    {
      id: 4,
      type: "status_updated",
      title: "Application status updated",
      description: "Case #VS-2024-0887 moved to \'Under Review'",
      timestamp: new Date(Date.now() - 3600000),
      user: "Emma Wilson"
    },
    {
      id: 5,
      type: "approval_pending",
      title: "Approval required",
      description: "AI-generated cover letter needs review",
      timestamp: new Date(Date.now() - 7200000),
      user: "AI Assistant"
    }
  ];

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Review visa application documents",
      dueDate: "Today, 2:00 PM",
      priority: "high",
      status: "pending",
      assignee: "You",
      isOverdue: false
    },
    {
      id: 2,
      title: "Follow up with embassy",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      status: "pending",
      assignee: "Sarah Johnson",
      isOverdue: false
    },
    {
      id: 3,
      title: "Client consultation call",
      dueDate: "Yesterday, 3:00 PM",
      priority: "high",
      status: "overdue",
      assignee: "You",
      isOverdue: true
    },
    {
      id: 4,
      title: "Update case status",
      dueDate: "Today, 5:00 PM",
      priority: "low",
      status: "in_progress",
      assignee: "Michael Chen",
      isOverdue: false
    }
  ];

  // Mock data for pipeline chart
  const pipelineData = [
    { name: "Leads", value: 150 },
    { name: "Qualified", value: 120 },
    { name: "Proposal", value: 85 },
    { name: "Negotiation", value: 45 },
    { name: "Closed Won", value: 32 }
  ];

  // Mock data for case distribution
  const caseDistribution = [
    { name: "Tourist", value: 45 },
    { name: "Business", value: 30 },
    { name: "Student", value: 15 },
    { name: "Immigration", value: 8 },
    { name: "Transit", value: 2 }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Document expiring soon",
      message: "Client passport expires in 30 days for case #VS-2024-0892",
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
      actionable: true
    },
    {
      id: 2,
      type: "document",
      title: "New document uploaded",
      message: "Bank statement received for John Smith\'s application",
      timestamp: new Date(Date.now() - 1200000),
      isRead: false,
      actionable: true
    },
    {
      id: 3,
      type: "payment",
      title: "Payment confirmed",
      message: "$1,250 payment processed successfully",
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
      actionable: false
    },
    {
      id: 4,
      type: "info",
      title: "System maintenance",
      message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      actionable: false
    }
  ];

  // Mock data for performance metrics
  const performanceData = [
    { name: "Jan", target: 100, achieved: 95 },
    { name: "Feb", target: 110, achieved: 108 },
    { name: "Mar", target: 120, achieved: 125 },
    { name: "Apr", target: 115, achieved: 118 },
    { name: "May", target: 130, achieved: 135 },
    { name: "Jun", target: 125, achieved: 128 },
    { name: "Jul", target: 140, achieved: 142 },
    { name: "Aug", target: 135, achieved: 138 }
  ];

  const performanceMetrics = [
    { label: "Cases Closed", value: "1,247", change: "+12%", changeType: "positive" },
    { label: "Success Rate", value: "94.2%", change: "+2.1%", changeType: "positive" },
    { label: "Avg. Processing", value: "18 days", change: "-2 days", changeType: "positive" },
    { label: "Client Satisfaction", value: "4.8/5", change: "+0.2", changeType: "positive" }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      console.log('Auto-refreshing dashboard data...');
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } pt-16`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Breadcrumbs />
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's what's happening with your visa consultation business.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Role Switcher for Demo */}
                <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg p-1">
                  <Button
                    variant={userRole === 'admin' ? 'default' : 'ghost'}
                    size="xs"
                    onClick={() => handleRoleChange('admin')}
                  >
                    Admin
                  </Button>
                  <Button
                    variant={userRole === 'staff' ? 'default' : 'ghost'}
                    size="xs"
                    onClick={() => handleRoleChange('staff')}
                  >
                    Staff
                  </Button>
                  <Button
                    variant={userRole === 'customer' ? 'default' : 'ghost'}
                    size="xs"
                    onClick={() => handleRoleChange('customer')}
                  >
                    Customer
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData?.[userRole]?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  icon={kpi?.icon}
                  color={kpi?.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Charts */}
                {userRole !== 'customer' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <PipelineChart data={pipelineData} type="bar" />
                    <PipelineChart data={caseDistribution} type="pie" />
                  </div>
                )}

                {/* Performance Metrics */}
                {userRole === 'admin' && (
                  <PerformanceMetrics
                    data={performanceData}
                    title="Monthly Performance"
                    metrics={performanceMetrics}
                  />
                )}

                {/* Recent Activity */}
                <RecentActivityList activities={recentActivities} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <QuickActionCard
                  title="Quick Actions"
                  description="Frequently used actions for faster workflow"
                  actions={quickActions?.[userRole]}
                />

                {/* Tasks Widget */}
                <TaskWidget tasks={tasks} />

                {/* Notifications */}
                <NotificationPanel notifications={notifications} />
              </div>
            </div>

            {/* Bottom Section - Additional Widgets */}
            {userRole === 'admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">System Health</h3>
                    <Icon name="Activity" size={20} className="text-success" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Server Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm font-medium text-success">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm font-medium text-success">Connected</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">API Response</span>
                      <span className="text-sm font-medium text-foreground">142ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="text-sm font-medium text-foreground">99.9%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Recent Logins</h3>
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Johnson", role: "Staff", time: "2 minutes ago", status: "online" },
                      { name: "Michael Chen", role: "Staff", time: "15 minutes ago", status: "online" },
                      { name: "Emma Wilson", role: "Admin", time: "1 hour ago", status: "offline" },
                      { name: "John Smith", role: "Customer", time: "2 hours ago", status: "offline" }
                    ]?.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Icon name="User" size={16} color="white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{user?.time}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              user?.status === 'online' ? 'bg-success' : 'bg-muted-foreground'
                            }`}></div>
                            <span className={`text-xs ${
                              user?.status === 'online' ? 'text-success' : 'text-muted-foreground'
                            }`}>
                              {user?.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;