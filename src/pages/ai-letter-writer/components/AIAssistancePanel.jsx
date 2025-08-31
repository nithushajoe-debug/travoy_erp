import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AIAssistancePanel = ({ onToneChange, onSuggestionApply, currentTone = 'formal' }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toneOptions = [
    { value: 'formal', label: 'Formal', description: 'Professional and official tone' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable tone' },
    { value: 'persuasive', label: 'Persuasive', description: 'Convincing and compelling tone' },
    { value: 'diplomatic', label: 'Diplomatic', description: 'Tactful and respectful tone' },
    { value: 'urgent', label: 'Urgent', description: 'Time-sensitive and pressing tone' }
  ];

  const mockSuggestions = [
    {
      id: 1,
      type: 'improvement',
      title: 'Strengthen Opening',
      content: 'Consider starting with a more compelling introduction that immediately establishes your purpose and credibility.',
      suggestion: 'I am writing to formally request a tourist visa for my planned visit to Germany from March 15 to March 30, 2025, as a respected professional with strong ties to my home country.',
      confidence: 85
    },
    {
      id: 2,
      type: 'compliance',
      title: 'Add Required Information',
      content: 'Include specific details about your accommodation and travel itinerary as required by German visa regulations.',
      suggestion: 'I have confirmed reservations at Hotel Adlon Kempinski in Berlin (Confirmation #HK2025-0315) and have planned visits to Munich, Hamburg, and Cologne during my stay.',
      confidence: 92
    },
    {
      id: 3,
      type: 'enhancement',
      title: 'Improve Closing',
      content: 'Strengthen your conclusion with a more confident statement about your intention to return.',
      suggestion: 'I am committed to returning to my home country before the visa expires, as evidenced by my stable employment, property ownership, and family responsibilities.',
      confidence: 78
    }
  ];

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'improvement': return 'TrendingUp';
      case 'compliance': return 'Shield';
      case 'enhancement': return 'Sparkles';
      default: return 'Lightbulb';
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'improvement': return 'text-primary';
      case 'compliance': return 'text-warning';
      case 'enhancement': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bot" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">AI Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Tone Selection */}
          <div>
            <Select
              label="Writing Tone"
              description="Choose the appropriate tone for your document"
              options={toneOptions}
              value={currentTone}
              onChange={onToneChange}
            />
          </div>

          {/* Generate Suggestions */}
          <div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleGenerateSuggestions}
              loading={isGenerating}
              iconName="Sparkles"
              iconPosition="left"
            >
              {isGenerating ? 'Analyzing...' : 'Generate Suggestions'}
            </Button>
          </div>

          {/* Suggestions List */}
          {suggestions?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">AI Suggestions</h4>
              {suggestions?.map((suggestion) => (
                <div
                  key={suggestion?.id}
                  className="p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getSuggestionIcon(suggestion?.type)} 
                        size={16} 
                        className={getSuggestionColor(suggestion?.type)}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {suggestion?.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Zap" size={12} />
                      <span>{suggestion?.confidence}%</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {suggestion?.content}
                  </p>
                  
                  <div className="p-2 bg-background rounded border border-border mb-2">
                    <p className="text-xs text-foreground italic">
                      "{suggestion?.suggestion}"
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onSuggestionApply(suggestion)}
                      iconName="Check"
                      iconPosition="left"
                    >
                      Apply
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="X"
                      iconPosition="left"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-3 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="xs"
                iconName="CheckCircle"
                iconPosition="left"
              >
                Check Grammar
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="FileCheck"
                iconPosition="left"
              >
                Compliance Check
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="Languages"
                iconPosition="left"
              >
                Translate
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="BarChart"
                iconPosition="left"
              >
                Readability
              </Button>
            </div>
          </div>

          {/* AI Status */}
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>AI Assistant Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistancePanel;