import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentManager = () => {
  const [uploadProgress, setUploadProgress] = useState({});

  const requiredDocuments = [
    { id: 1, name: 'Passport Copy', status: 'uploaded', uploadDate: '2025-08-15', required: true },
    { id: 2, name: 'Visa Application Form', status: 'uploaded', uploadDate: '2025-08-15', required: true },
    { id: 3, name: 'Passport Photos', status: 'uploaded', uploadDate: '2025-08-16', required: true },
    { id: 4, name: 'Bank Statements', status: 'pending', uploadDate: null, required: true },
    { id: 5, name: 'Employment Letter', status: 'pending', uploadDate: null, required: true },
    { id: 6, name: 'Travel Insurance', status: 'optional', uploadDate: null, required: false }
  ];

  const uploadedDocuments = [
    { id: 1, name: 'passport_copy.pdf', size: '2.4 MB', uploadDate: '2025-08-15', status: 'approved' },
    { id: 2, name: 'visa_form.pdf', size: '1.8 MB', uploadDate: '2025-08-15', status: 'approved' },
    { id: 3, name: 'photos.jpg', size: '856 KB', uploadDate: '2025-08-16', status: 'under_review' }
  ];

  const handleFileUpload = (documentId) => {
    // Simulate file upload progress
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev?.[documentId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [documentId]: 100 };
        }
        return { ...prev, [documentId]: currentProgress + 10 };
      });
    }, 200);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': case'approved':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'under_review':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'pending':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploaded': case'approved':
        return 'Approved';
      case 'under_review':
        return 'Under Review';
      case 'pending':
        return 'Required';
      case 'optional':
        return 'Optional';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Document Management</h2>
        <Button variant="outline" iconName="Upload" iconPosition="left">
          Upload Document
        </Button>
      </div>
      {/* Document Requirements Checklist */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Required Documents</h3>
        <div className="space-y-3">
          {requiredDocuments?.map((doc) => (
            <div key={doc?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc?.status)}
                <div>
                  <p className="font-medium text-foreground">{doc?.name}</p>
                  {doc?.uploadDate && (
                    <p className="text-sm text-muted-foreground">
                      Uploaded: {new Date(doc.uploadDate)?.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${
                  doc?.status === 'uploaded' || doc?.status === 'approved' ? 'text-success' :
                  doc?.status === 'pending' ? 'text-error' : 'text-muted-foreground'
                }`}>
                  {getStatusText(doc?.status)}
                </span>
                
                {doc?.status === 'pending' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFileUpload(doc?.id)}
                    disabled={uploadProgress?.[doc?.id] !== undefined}
                  >
                    {uploadProgress?.[doc?.id] !== undefined ? `${uploadProgress?.[doc?.id]}%` : 'Upload'}
                  </Button>
                )}
                
                {(doc?.status === 'uploaded' || doc?.status === 'approved') && (
                  <Button size="sm" variant="ghost" iconName="Download" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Uploaded Documents */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Uploaded Documents</h3>
        <div className="space-y-3">
          {uploadedDocuments?.map((doc) => (
            <div key={doc?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{doc?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc?.size} • Uploaded {new Date(doc.uploadDate)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc?.status)}
                <span className={`text-sm font-medium ${
                  doc?.status === 'approved' ? 'text-success' :
                  doc?.status === 'under_review' ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {getStatusText(doc?.status)}
                </span>
                
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="ghost" iconName="Download" />
                  <Button size="sm" variant="ghost" iconName="Eye" />
                  <Button size="sm" variant="ghost" iconName="Trash2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upload Progress */}
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Upload" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Uploading Documents</span>
          </div>
          {Object.entries(uploadProgress)?.map(([docId, progress]) => (
            <div key={docId} className="mb-2 last:mb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">Document {docId}</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentManager;