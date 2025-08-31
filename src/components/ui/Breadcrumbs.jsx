import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const routeLabels = {
    '/dashboard': 'Dashboard',
    '/ai-letter-writer': 'AI Letter Writer',
    '/communication-center': 'Communication Center',
    '/financial-management': 'Financial Management',
    '/user-management': 'User Management',
    '/customer-portal': 'Customer Portal',
    '/settings': 'Settings',
    '/help': 'Help'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location?.pathname !== '/dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isClickable: true
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isClickable: index < pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-muted-foreground" />
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path || index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          
          {crumb?.isClickable ? (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className="hover:text-primary transition-smooth font-medium"
            >
              {crumb?.label}
            </button>
          ) : (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;