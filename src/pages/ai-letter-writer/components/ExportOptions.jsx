import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport, documentContent, documentTitle }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeLetterhead, setIncludeLetterhead] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Professional PDF with formatting' },
    { value: 'docx', label: 'Word Document', description: 'Editable Microsoft Word format' },
    { value: 'txt', label: 'Plain Text', description: 'Simple text file' },
    { value: 'html', label: 'HTML', description: 'Web-ready HTML format' }
  ];

  const letterheadOptions = [
    { value: 'company', label: 'Company Letterhead' },
    { value: 'personal', label: 'Personal Letterhead' },
    { value: 'none', label: 'No Letterhead' }
  ];

  const handleExport = async (action = 'download') => {
    setIsExporting(true);
    
    const exportOptions = {
      format: exportFormat,
      includeLetterhead,
      includeSignature,
      includeWatermark,
      action,
      recipient: action === 'email' ? emailRecipient : null
    };

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(exportOptions);
      
      if (action === 'email') {
        setShowEmailDialog(false);
        setEmailRecipient('');
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'docx': return 'FileType';
      case 'txt': return 'File';
      case 'html': return 'Code';
      default: return 'Download';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Export Options</h3>
      </div>
      {/* Format Selection */}
      <div className="space-y-4">
        <Select
          label="Export Format"
          description="Choose the output format for your document"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
        />

        {/* PDF/DOCX Options */}
        {(exportFormat === 'pdf' || exportFormat === 'docx') && (
          <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground">Document Options</h4>
            
            <Checkbox
              label="Include Company Letterhead"
              description="Add official letterhead to the document"
              checked={includeLetterhead}
              onChange={(e) => setIncludeLetterhead(e?.target?.checked)}
            />
            
            <Checkbox
              label="Include Digital Signature"
              description="Add authorized signature to the document"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e?.target?.checked)}
            />
            
            <Checkbox
              label="Add Watermark"
              description="Include company watermark for security"
              checked={includeWatermark}
              onChange={(e) => setIncludeWatermark(e?.target?.checked)}
            />
          </div>
        )}

        {/* Document Preview */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Document Preview</h4>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Title: {documentTitle || 'Untitled Document'}</span>
              <span>Words: {documentContent ? documentContent?.split(' ')?.length : 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name={getFormatIcon(exportFormat)} size={12} />
              <span>{exportFormat?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="default"
            onClick={() => handleExport('download')}
            loading={isExporting}
            disabled={!documentContent}
            iconName="Download"
            iconPosition="left"
            className="w-full"
          >
            {isExporting ? 'Exporting...' : 'Download'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowEmailDialog(true)}
            disabled={!documentContent}
            iconName="Mail"
            iconPosition="left"
            className="w-full"
          >
            Email
          </Button>
          
          <Button
            variant="outline"
            onClick={handlePrint}
            disabled={!documentContent}
            iconName="Printer"
            iconPosition="left"
            className="w-full"
          >
            Print
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigator.share && navigator.share({ title: documentTitle, text: documentContent })}
            disabled={!documentContent || !navigator.share}
            iconName="Share"
            iconPosition="left"
            className="w-full"
          >
            Share
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={() => navigator.clipboard?.writeText(documentContent)}
              disabled={!documentContent}
            >
              Copy Text
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              iconPosition="left"
            >
              Save Draft
            </Button>
          </div>
        </div>
      </div>
      {/* Email Dialog */}
      {showEmailDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Email Document</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Recipient Email</label>
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e?.target?.value)}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-1">Email Preview</h4>
                <p className="text-xs text-muted-foreground">
                  Subject: {documentTitle || 'Document from Travoy ERP'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Attachment: {documentTitle || 'document'}.{exportFormat}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="default"
                onClick={() => handleExport('email')}
                loading={isExporting}
                disabled={!emailRecipient?.trim()}
                className="flex-1"
              >
                {isExporting ? 'Sending...' : 'Send Email'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEmailDialog(false);
                  setEmailRecipient('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;