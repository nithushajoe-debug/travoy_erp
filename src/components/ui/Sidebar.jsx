import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      description: 'Overview and analytics'
    },
    {
      label: 'AI Letter Writer',
      path: '/ai-letter-writer',
      icon: 'FileText',
      badge: 3,
      description: 'Generate documents with AI'
    },
    {
      label: 'Communication Center',
      path: '/communication-center',
      icon: 'MessageSquare',
      badge: 12,
      description: 'Client messages and notifications'
    },
    {
      label: 'Financial Management',
      path: '/financial-management',
      icon: 'DollarSign',
      badge: null,
      description: 'Payments and accounting'
    },
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      badge: null,
      description: 'Manage users and permissions'
    },
    {
      label: 'Customer Portal',
      path: '/customer-portal',
      icon: 'Globe',
      badge: null,
      description: 'Client self-service interface'
    }
  ];

  const quickActions = [
    { label: 'New Case', icon: 'Plus', action: 'create-case' },
    { label: 'Upload Document', icon: 'Upload', action: 'upload-doc' },
    { label: 'Send Message', icon: 'Send', action: 'send-message' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic here
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border shadow-elevation-1 z-100 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-72'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Plane" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Travoy ERP</h1>
                  <p className="text-xs text-muted-foreground">Visa Consultation Platform</p>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Plane" size={24} color="white" />
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              
              return (
                <div
                  key={item?.path}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item?.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                      />
                      {item?.badge && (
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                          {item?.badge}
                        </span>
                      )}
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block truncate">{item?.label}</span>
                      </div>
                    )}
                  </button>
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === item?.path && (
                    <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-elevation-2 z-50 whitespace-nowrap">
                      <div className="text-sm font-medium text-popover-foreground">{item?.label}</div>
                      <div className="text-xs text-muted-foreground">{item?.description}</div>
                      {item?.badge && (
                        <div className="text-xs text-error font-medium mt-1">{item?.badge} pending</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action?.action)}
                    className="w-full justify-start"
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={16}
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                  <p className="text-xs text-muted-foreground truncate">admin@travoy.com</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Settings" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Quick Action Floating Button (Mobile) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-90">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-elevation-3"
          onClick={() => handleQuickAction('create-case')}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </>
  );
};

export default Sidebar;