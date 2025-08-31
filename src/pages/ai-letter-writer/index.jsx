import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TemplateLibrary from './components/TemplateLibrary';
import AIAssistancePanel from './components/AIAssistancePanel';
import RichTextEditor from './components/RichTextEditor';
import DraftManager from './components/DraftManager';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import ExportOptions from './components/ExportOptions';

const AILetterWriter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [currentTone, setCurrentTone] = useState('formal');
  const [currentDraft, setCurrentDraft] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  // Initialize document content when template is selected
  useEffect(() => {
    if (selectedTemplate && selectedTemplate?.content) {
      setDocumentContent(selectedTemplate?.content);
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveTab('editor');
  };

  const handleToneChange = (tone) => {
    setCurrentTone(tone);
    // Apply tone changes to content
    console.log('Tone changed to:', tone);
  };

  const handleSuggestionApply = (suggestion) => {
    // Apply AI suggestion to content
    const updatedContent = documentContent + '\n\n' + suggestion?.suggestion;
    setDocumentContent(updatedContent);
  };

  const handleDraftSelect = (draft) => {
    setCurrentDraft(draft);
    setDocumentContent(draft?.content || '');
    setActiveTab('editor');
  };

  const handleDraftSave = (draftName) => {
    const newDraft = {
      id: `draft-${Date.now()}`,
      name: draftName,
      content: documentContent,
      template: selectedTemplate?.name || 'Custom',
      lastModified: new Date()?.toISOString(),
      status: 'draft'
    };
    setCurrentDraft(newDraft);
    console.log('Draft saved:', newDraft);
  };

  const handleApprovalAction = (action, documentId, feedback = null) => {
    console.log('Approval action:', action, documentId, feedback);
  };

  const handleExport = (exportOptions) => {
    console.log('Exporting document:', exportOptions);
  };

  const tabs = [
    { id: 'editor', label: 'Editor', icon: 'Edit' },
    { id: 'drafts', label: 'Drafts', icon: 'FileText' },
    { id: 'approval', label: 'Approval', icon: 'CheckSquare' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <main 
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
        }`}
      >
        <div className="p-4 lg:p-6">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">AI Letter Writer</h1>
              <p className="text-muted-foreground">
                Create professional visa letters with AI assistance and human oversight
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
              >
                New Document
              </Button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-4">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Template Library - Left Panel */}
            <div className="col-span-3">
              <TemplateLibrary
                onTemplateSelect={handleTemplateSelect}
                selectedTemplate={selectedTemplate}
              />
            </div>

            {/* Main Editor Area */}
            <div className="col-span-6 flex flex-col space-y-4">
              {/* AI Assistance Panel */}
              <AIAssistancePanel
                onToneChange={handleToneChange}
                onSuggestionApply={handleSuggestionApply}
                currentTone={currentTone}
              />

              {/* Rich Text Editor */}
              <div className="flex-1">
                <RichTextEditor
                  content={documentContent}
                  onChange={setDocumentContent}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>

            {/* Right Panel - Tabs */}
            <div className="col-span-3 flex flex-col">
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
                {tabs?.slice(1)?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 rounded-md text-xs font-medium transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={14} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1">
                {activeTab === 'drafts' && (
                  <DraftManager
                    onDraftSelect={handleDraftSelect}
                    onDraftSave={handleDraftSave}
                    currentDraft={currentDraft}
                  />
                )}
                {activeTab === 'approval' && (
                  <ApprovalWorkflow
                    onApprovalAction={handleApprovalAction}
                  />
                )}
                {activeTab === 'export' && (
                  <ExportOptions
                    onExport={handleExport}
                    documentContent={documentContent}
                    documentTitle={selectedTemplate?.name || currentDraft?.name}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {activeTab === 'editor' && (
              <div className="space-y-4">
                {/* Template Selection Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowMobilePanel('templates')}
                  iconName="FileText"
                  iconPosition="left"
                  className="w-full"
                >
                  {selectedTemplate ? selectedTemplate?.name : 'Select Template'}
                </Button>

                {/* AI Assistance */}
                <AIAssistancePanel
                  onToneChange={handleToneChange}
                  onSuggestionApply={handleSuggestionApply}
                  currentTone={currentTone}
                />

                {/* Editor */}
                <div className="h-96">
                  <RichTextEditor
                    content={documentContent}
                    onChange={setDocumentContent}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'drafts' && (
              <div className="h-96">
                <DraftManager
                  onDraftSelect={handleDraftSelect}
                  onDraftSave={handleDraftSave}
                  currentDraft={currentDraft}
                />
              </div>
            )}

            {activeTab === 'approval' && (
              <div className="h-96">
                <ApprovalWorkflow
                  onApprovalAction={handleApprovalAction}
                />
              </div>
            )}

            {activeTab === 'export' && (
              <ExportOptions
                onExport={handleExport}
                documentContent={documentContent}
                documentTitle={selectedTemplate?.name || currentDraft?.name}
              />
            )}
          </div>

          {/* Mobile Template Panel */}
          {showMobilePanel === 'templates' && (
            <div className="fixed inset-0 bg-background z-50 lg:hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Select Template</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMobilePanel(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="h-[calc(100vh-80px)]">
                <TemplateLibrary
                  onTemplateSelect={(template) => {
                    handleTemplateSelect(template);
                    setShowMobilePanel(false);
                  }}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AILetterWriter;