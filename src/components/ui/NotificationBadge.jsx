import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  showZero = false, 
  variant = 'error',
  size = 'default',
  className = '' 
}) => {
  if (!showZero && count === 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count?.toString();

  const variantClasses = {
    error: 'bg-error text-error-foreground',
    warning: 'bg-warning text-warning-foreground',
    success: 'bg-success text-success-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const sizeClasses = {
    sm: 'min-w-[14px] h-[14px] text-[10px] px-1',
    default: 'min-w-[18px] h-[18px] text-xs px-1',
    lg: 'min-w-[22px] h-[22px] text-sm px-1.5'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        ${variantClasses?.[variant]}
        ${sizeClasses?.[size]}
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;