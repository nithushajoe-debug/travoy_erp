import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'AI Letter Writer', path: '/ai-letter-writer', icon: 'FileText' },
    { label: 'Communication', path: '/communication-center', icon: 'MessageSquare' },
    { label: 'Financial', path: '/financial-management', icon: 'DollarSign' },
  ];

  const secondaryNavItems = [
    { label: 'User Management', path: '/user-management', icon: 'Users' },
    { label: 'Customer Portal', path: '/customer-portal', icon: 'Globe' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Plane" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">Travoy ERP</h1>
              <p className="text-xs text-muted-foreground">Visa Consultation</p>
            </div>
          </div>
        </div>

        {/* Center Section - Primary Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <Icon name={item?.icon} size={16} />
              <span className="text-sm font-medium">{item?.label}</span>
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span className="text-sm font-medium">More</span>
            </Button>

            {showMoreMenu && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-1 z-50">
                {secondaryNavItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => {
                      handleNavigation(item?.path);
                      setShowMoreMenu(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm text-left hover:bg-muted transition-smooth ${
                      isActivePath(item?.path) ? 'bg-muted text-primary font-medium' : 'text-popover-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 px-2"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <span className="hidden md:block text-sm font-medium">Admin</span>
            <Icon name="ChevronDown" size={16} className="hidden md:block" />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-90">
          <nav className="p-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => {
                  handleNavigation(item?.path);
                  onMenuToggle();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
      {/* Backdrop for More Menu */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;