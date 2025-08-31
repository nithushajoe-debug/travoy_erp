import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationProgress = ({ application }) => {
  const stages = [
    { id: 1, name: 'Application Submitted', status: 'completed', date: '2025-08-15' },
    { id: 2, name: 'Document Review', status: 'completed', date: '2025-08-18' },
    { id: 3, name: 'Initial Assessment', status: 'current', date: '2025-08-25' },
    { id: 4, name: 'Embassy Processing', status: 'pending', date: null },
    { id: 5, name: 'Decision', status: 'pending', date: null }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'current':
        return <Icon name="Clock" size={20} className="text-warning" />;
      default:
        return <Icon name="Circle" size={20} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'current':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Application Progress</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={16} />
          <span>{application?.country} - {application?.visaType}</span>
        </div>
      </div>
      <div className="relative">
        {stages?.map((stage, index) => (
          <div key={stage?.id} className="flex items-start space-x-4 pb-8 last:pb-0">
            {/* Timeline Line */}
            {index < stages?.length - 1 && (
              <div className={`absolute left-2.5 top-8 w-0.5 h-16 ${getStatusColor(stage?.status)}`} />
            )}
            
            {/* Status Icon */}
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(stage?.status)}
            </div>

            {/* Stage Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${stage?.status === 'current' ? 'text-warning' : stage?.status === 'completed' ? 'text-success' : 'text-muted-foreground'}`}>
                  {stage?.name}
                </h3>
                {stage?.date && (
                  <span className="text-sm text-muted-foreground">
                    {new Date(stage.date)?.toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {stage?.status === 'current' && (
                <p className="text-sm text-muted-foreground mt-1">
                  Currently being processed. Expected completion: 3-5 business days.
                </p>
              )}
              
              {stage?.status === 'completed' && (
                <p className="text-sm text-success mt-1">
                  Completed successfully
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Overall Progress */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">60% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationProgress;