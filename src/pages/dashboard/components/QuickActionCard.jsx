import React from 'react';

import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, actions }) => {
  const handleAction = (actionType) => {
    console.log(`Quick action: ${actionType}`);
    // Implement action logic here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleAction(action?.type)}
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
  );
};

export default QuickActionCard;