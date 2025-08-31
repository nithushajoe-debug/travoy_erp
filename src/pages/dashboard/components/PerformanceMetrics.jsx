import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ data, title, metrics }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry?.name}: <span className="font-medium">{entry?.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="TrendingUp" size={20} className="text-success" />
      </div>
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
            <p className="text-xs text-muted-foreground">{metric?.label}</p>
            {metric?.change && (
              <div className={`flex items-center justify-center space-x-1 mt-1 ${
                metric?.changeType === 'positive' ? 'text-success' : 
                metric?.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
              }`}>
                <Icon 
                  name={metric?.changeType === 'positive' ? 'ArrowUp' : 
                        metric?.changeType === 'negative' ? 'ArrowDown' : 'Minus'} 
                  size={12} 
                />
                <span className="text-xs font-medium">{metric?.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Performance Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#475569', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fill: '#475569', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#94A3B8" 
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
            <Line 
              type="monotone" 
              dataKey="achieved" 
              stroke="#1E40AF" 
              strokeWidth={2}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              name="Achieved"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceMetrics;