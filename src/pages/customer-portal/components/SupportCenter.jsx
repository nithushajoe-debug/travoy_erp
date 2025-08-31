import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupportCenter = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: ''
  });

  const faqCategories = [
    { value: '', label: 'All Categories' },
    { value: 'application', label: 'Application Process' },
    { value: 'documents', label: 'Document Requirements' },
    { value: 'payment', label: 'Payment & Billing' },
    { value: 'appointment', label: 'Appointments' },
    { value: 'technical', label: 'Technical Support' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'application',
      question: 'How long does the visa application process take?',
      answer: `The processing time varies depending on the visa type and country:\n\n• Tourist visas: 5-15 business days\n• Business visas: 7-21 business days\n• Student visas: 15-30 business days\n• Immigration visas: 30-90 business days\n\nProcessing times may be longer during peak seasons or due to additional security checks.`
    },
    {
      id: 2,
      category: 'documents',
      question: 'What documents do I need for a tourist visa?',
      answer: `Required documents typically include:\n\n• Valid passport (6+ months validity)\n• Completed visa application form\n• Recent passport-sized photographs\n• Proof of financial support\n• Travel itinerary\n• Hotel reservations\n• Travel insurance\n\nSpecific requirements may vary by country. Check your application dashboard for detailed requirements.`
    },
    {
      id: 3,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: `We accept the following payment methods:\n\n• Credit/Debit Cards (Visa, MasterCard, American Express)\n• PayPal\n• Bank transfers\n• Digital wallets (Apple Pay, Google Pay)\n\nAll payments are processed securely and you will receive a confirmation email once payment is completed.`
    },
    {
      id: 4,
      category: 'appointment',
      question: 'Can I reschedule my appointment?',
      answer: `Yes, you can reschedule your appointment:\n\n• Log into your customer portal\n• Go to the Appointments section\n• Select the appointment you want to reschedule\n• Choose a new available time slot\n\nPlease reschedule at least 24 hours in advance to avoid cancellation fees.`
    },
    {
      id: 5,
      category: 'technical',
      question: 'I\'m having trouble uploading documents. What should I do?',
      answer: `If you\'re experiencing upload issues:\n\n• Check your internet connection\n• Ensure file size is under 10MB\n• Use supported formats (PDF, JPG, PNG)\n• Clear your browser cache\n• Try using a different browser\n\nIf the problem persists, contact our technical support team.`
    }
  ];

  const supportTickets = [
    {
      id: 'TKT-2025-001',
      subject: 'Document Upload Issue',
      category: 'Technical',
      priority: 'Medium',
      status: 'In Progress',
      created: '2025-08-30',
      lastUpdate: '2025-08-31'
    },
    {
      id: 'TKT-2025-002',
      subject: 'Visa Processing Timeline',
      category: 'Application',
      priority: 'Low',
      status: 'Resolved',
      created: '2025-08-28',
      lastUpdate: '2025-08-29'
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const filteredFaqs = faqs?.filter(faq => {
    const matchesSearch = faq?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         faq?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = !selectedCategory || faq?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitTicket = () => {
    if (ticketForm?.subject && ticketForm?.category && ticketForm?.description) {
      console.log('Submitting support ticket:', ticketForm);
      setTicketForm({
        subject: '',
        category: '',
        priority: '',
        description: ''
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'text-success bg-success/10';
      case 'in progress':
        return 'text-warning bg-warning/10';
      case 'open':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderFAQSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="sm:w-64">
          <Select
            options={faqCategories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Filter by category"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs?.map((faq) => (
          <div key={faq?.id} className="border border-border rounded-lg">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-smooth">
                <h3 className="font-medium text-foreground pr-4">{faq?.question}</h3>
                <Icon name="ChevronDown" size={20} className="text-muted-foreground group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 text-sm text-muted-foreground whitespace-pre-line">
                  {faq?.answer}
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      {filteredFaqs?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No FAQs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );

  const renderTicketsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">My Support Tickets</h3>
        <Button onClick={() => setActiveSection('create-ticket')} iconName="Plus" iconPosition="left">
          Create New Ticket
        </Button>
      </div>

      <div className="space-y-4">
        {supportTickets?.map((ticket) => (
          <div key={ticket?.id} className="p-4 border border-border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{ticket?.id}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(ticket?.status)}`}>
                    {ticket?.status}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                    {ticket?.priority} Priority
                  </span>
                </div>
                <p className="text-foreground mb-2">{ticket?.subject}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Category: {ticket?.category}</span>
                  <span>Created: {new Date(ticket.created)?.toLocaleDateString()}</span>
                  <span>Last Update: {new Date(ticket.lastUpdate)?.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="ghost" iconName="MessageSquare" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {supportTickets?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">You don't have any support tickets yet.</p>
          <Button onClick={() => setActiveSection('create-ticket')}>Create Your First Ticket</Button>
        </div>
      )}
    </div>
  );

  const renderCreateTicketSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setActiveSection('tickets')}
          iconName="ArrowLeft"
        />
        <h3 className="text-lg font-medium text-foreground">Create Support Ticket</h3>
      </div>

      <div className="space-y-4">
        <Input
          label="Subject"
          placeholder="Brief description of your issue"
          value={ticketForm?.subject}
          onChange={(e) => setTicketForm({...ticketForm, subject: e?.target?.value})}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={faqCategories?.slice(1)}
            value={ticketForm?.category}
            onChange={(value) => setTicketForm({...ticketForm, category: value})}
            placeholder="Select category"
            required
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={ticketForm?.priority}
            onChange={(value) => setTicketForm({...ticketForm, priority: value})}
            placeholder="Select priority"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={6}
            placeholder="Please provide detailed information about your issue..."
            value={ticketForm?.description}
            onChange={(e) => setTicketForm({...ticketForm, description: e?.target?.value})}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            We typically respond within 24 hours during business days.
          </p>
          <Button 
            onClick={handleSubmitTicket}
            disabled={!ticketForm?.subject || !ticketForm?.category || !ticketForm?.description}
          >
            Submit Ticket
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Support Center</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Phone" iconPosition="left">
            Call Support
          </Button>
          <Button variant="outline" iconName="MessageSquare" iconPosition="left">
            Live Chat
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveSection('faq')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeSection === 'faq' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="HelpCircle" size={16} />
          <span>FAQ</span>
        </button>
        <button
          onClick={() => setActiveSection('tickets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeSection === 'tickets' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Ticket" size={16} />
          <span>My Tickets</span>
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeSection === 'contact' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Phone" size={16} />
          <span>Contact</span>
        </button>
      </div>

      {/* Content */}
      {activeSection === 'faq' && renderFAQSection()}
      {activeSection === 'tickets' && renderTicketsSection()}
      {activeSection === 'create-ticket' && renderCreateTicketSection()}
      {activeSection === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">+1 (555) 123-4567</p>
              <Button variant="outline" fullWidth>Call Now</Button>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email Support</h3>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">support@travoy.com</p>
              <Button variant="outline" fullWidth>Send Email</Button>
            </div>
          </div>

          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportCenter;