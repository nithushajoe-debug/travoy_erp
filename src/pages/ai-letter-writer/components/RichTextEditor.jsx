import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RichTextEditor = ({ content, onChange, selectedTemplate, mergeFields = [] }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMergeFields, setShowMergeFields] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const editorRef = useRef(null);

  const formatOptions = [
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'heading1', label: 'Heading 1' },
    { value: 'heading2', label: 'Heading 2' },
    { value: 'heading3', label: 'Heading 3' }
  ];

  const fontSizeOptions = [
    { value: '12', label: '12px' },
    { value: '14', label: '14px' },
    { value: '16', label: '16px' },
    { value: '18', label: '18px' },
    { value: '20', label: '20px' }
  ];

  const defaultMergeFields = [
    { field: '[CLIENT_NAME]', label: 'Client Name', category: 'Personal' },
    { field: '[CLIENT_ADDRESS]', label: 'Client Address', category: 'Personal' },
    { field: '[CLIENT_EMAIL]', label: 'Client Email', category: 'Personal' },
    { field: '[CLIENT_PHONE]', label: 'Client Phone', category: 'Personal' },
    { field: '[PASSPORT_NUMBER]', label: 'Passport Number', category: 'Documents' },
    { field: '[COUNTRY]', label: 'Destination Country', category: 'Travel' },
    { field: '[START_DATE]', label: 'Travel Start Date', category: 'Travel' },
    { field: '[END_DATE]', label: 'Travel End Date', category: 'Travel' },
    { field: '[PURPOSE]', label: 'Purpose of Visit', category: 'Travel' },
    { field: '[COMPANY_NAME]', label: 'Company Name', category: 'Business' },
    { field: '[OCCUPATION]', label: 'Occupation', category: 'Business' },
    { field: '[ANNUAL_INCOME]', label: 'Annual Income', category: 'Financial' }
  ];

  const handleContentChange = (e) => {
    const newContent = e?.target?.value;
    onChange(newContent);
    
    // Update word count
    const words = newContent?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    setWordCount(words?.length);
  };

  const insertMergeField = (field) => {
    const textarea = editorRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const newContent = content?.substring(0, start) + field + content?.substring(end);
    onChange(newContent);
    
    // Set cursor position after inserted field
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + field?.length, start + field?.length);
    }, 0);
  };

  const formatText = (command) => {
    // Basic text formatting commands
    console.log(`Format command: ${command}`);
  };

  const groupedMergeFields = defaultMergeFields?.reduce((groups, field) => {
    const category = field?.category;
    if (!groups?.[category]) {
      groups[category] = [];
    }
    groups?.[category]?.push(field);
    return groups;
  }, {});

  return (
    <div className={`bg-card border border-border rounded-lg flex flex-col ${isFullscreen ? 'fixed inset-4 z-50' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          {/* Format Selection */}
          <Select
            options={formatOptions}
            value="paragraph"
            onChange={() => {}}
            className="w-32"
          />
          
          {/* Font Size */}
          <Select
            options={fontSizeOptions}
            value="14"
            onChange={() => {}}
            className="w-20"
          />
          
          <div className="w-px h-6 bg-border mx-2"></div>
          
          {/* Text Formatting */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => formatText('bold')}
            className="w-8 h-8"
          >
            <Icon name="Bold" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => formatText('italic')}
            className="w-8 h-8"
          >
            <Icon name="Italic" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => formatText('underline')}
            className="w-8 h-8"
          >
            <Icon name="Underline" size={16} />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2"></div>
          
          {/* Lists */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => formatText('bulletList')}
            className="w-8 h-8"
          >
            <Icon name="List" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => formatText('numberedList')}
            className="w-8 h-8"
          >
            <Icon name="ListOrdered" size={16} />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2"></div>
          
          {/* Merge Fields */}
          <Button
            variant={showMergeFields ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowMergeFields(!showMergeFields)}
            iconName="Database"
            iconPosition="left"
          >
            Fields
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={16} />
          </Button>
        </div>
      </div>
      {/* Merge Fields Panel */}
      {showMergeFields && (
        <div className="p-3 bg-muted/30 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(groupedMergeFields)?.map(([category, fields]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {category}
                </h4>
                <div className="space-y-1">
                  {fields?.map((field) => (
                    <button
                      key={field?.field}
                      onClick={() => insertMergeField(field?.field)}
                      className="w-full text-left px-2 py-1 text-xs bg-background hover:bg-primary/10 border border-border rounded transition-smooth"
                    >
                      {field?.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Editor */}
      <div className="flex-1 p-4">
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          placeholder={selectedTemplate ? "Template loaded. Start editing..." : "Select a template or start writing your letter..."}
          className="w-full h-full resize-none border-none outline-none bg-transparent text-foreground leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
        />
      </div>
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Words: {wordCount}</span>
          <span>Characters: {content?.length}</span>
          {selectedTemplate && (
            <span className="flex items-center space-x-1">
              <Icon name="FileText" size={12} />
              <span>Template: {selectedTemplate?.name}</span>
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Auto-saved</span>
          </div>
          <span>Last saved: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;