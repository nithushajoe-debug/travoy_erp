import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskWidget = ({ tasks }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task?.status === 'pending';
    if (filter === 'overdue') return task?.isOverdue;
    return true;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      in_progress: 'Play',
      completed: 'CheckCircle',
      overdue: 'AlertTriangle'
    };
    return icons?.[status] || 'Circle';
  };

  const handleTaskAction = (taskId, action) => {
    console.log(`Task ${taskId} action: ${action}`);
    // Implement task action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Tasks & Reminders</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'overdue' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredTasks?.map((task) => (
          <div key={task?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3 flex-1">
              <Icon 
                name={getStatusIcon(task?.status)} 
                size={16} 
                className={task?.isOverdue ? 'text-error' : 'text-muted-foreground'} 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task?.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{task?.dueDate}</span>
                  <span className={`text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                    {task?.priority?.toUpperCase()}
                  </span>
                  {task?.assignee && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{task?.assignee}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {task?.status === 'pending' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTaskAction(task?.id, 'start')}
                  className="w-8 h-8"
                >
                  <Icon name="Play" size={14} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleTaskAction(task?.id, 'complete')}
                className="w-8 h-8"
              >
                <Icon name="Check" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskWidget;