import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TemplateLibrary = ({ onTemplateSelect, selectedTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const templates = [
    {
      id: 'cover-letter-tourist',
      name: 'Tourist Visa Cover Letter',
      category: 'tourist',
      country: 'schengen',
      description: 'Standard cover letter for tourist visa applications to Schengen countries',
      lastModified: '2025-08-30',
      usage: 156,
      content: `Dear Visa Officer,\n\nI am writing to apply for a tourist visa to visit [COUNTRY] from [START_DATE] to [END_DATE]. I am [CLIENT_NAME], a [OCCUPATION] residing at [CLIENT_ADDRESS].\n\nThe purpose of my visit is tourism and leisure. I plan to visit the following places:\n- [DESTINATION_1]\n- [DESTINATION_2]\n- [DESTINATION_3]\n\nI have attached all required documents including:\n- Valid passport\n- Travel insurance\n- Hotel reservations\n- Flight bookings\n- Bank statements\n\nI assure you that I will return to my home country before the visa expires and will comply with all visa conditions.\n\nThank you for your consideration.\n\nSincerely,\n[CLIENT_NAME]`
    },
    {
      id: 'invitation-letter-business',
      name: 'Business Invitation Letter',
      category: 'business',
      country: 'usa',
      description: 'Formal invitation letter for business visa applications to the United States',
      lastModified: '2025-08-29',
      usage: 89,
      content: `To Whom It May Concern,\n\nWe are pleased to invite [CLIENT_NAME] to visit our company, [COMPANY_NAME], located at [COMPANY_ADDRESS] in the United States.\n\nPurpose of Visit: [BUSINESS_PURPOSE]\nDuration: [START_DATE] to [END_DATE]\nMeetings scheduled with: [MEETING_CONTACTS]\n\nDuring the visit, [CLIENT_NAME] will be involved in:\n- Business meetings and discussions\n- Product demonstrations\n- Contract negotiations\n- Training sessions\n\nAll expenses including accommodation and meals will be covered by [EXPENSE_RESPONSIBILITY].\n\nWe look forward to a productive business relationship.\n\nBest regards,\n[COMPANY_REPRESENTATIVE]\n[TITLE]\n[COMPANY_NAME]`
    },
    {
      id: 'support-letter-student',
      name: 'Student Support Letter',
      category: 'student',
      country: 'uk',
      description: 'Financial support letter for student visa applications to the United Kingdom',
      lastModified: '2025-08-28',
      usage: 234,
      content: `Dear Visa Officer,\n\nI am writing to provide financial support for [STUDENT_NAME], who is my [RELATIONSHIP] and wishes to pursue [COURSE_NAME] at [UNIVERSITY_NAME] in the United Kingdom.\n\nI, [SPONSOR_NAME], am employed as [SPONSOR_OCCUPATION] at [SPONSOR_COMPANY] with an annual income of [ANNUAL_INCOME]. I have been supporting [STUDENT_NAME]'s education and will continue to provide financial assistance throughout their studies.\n\nThe financial support will cover:\n- Tuition fees: [TUITION_AMOUNT]\n- Living expenses: [LIVING_EXPENSES]\n- Accommodation: [ACCOMMODATION_COST]\n- Other expenses: [OTHER_EXPENSES]\n\nI have attached bank statements and employment verification as proof of my financial capability.\n\nI am committed to ensuring [STUDENT_NAME] has adequate financial support during their studies in the UK.\n\nSincerely,\n[SPONSOR_NAME]`
    },
    {
      id: 'employment-letter',name: 'Employment Verification Letter',category: 'work',country: 'canada',description: 'Employment verification letter for work visa applications to Canada',
      lastModified: '2025-08-27',
      usage: 67,
      content: `To Whom It May Concern,\n\nThis letter serves to confirm that [EMPLOYEE_NAME] is employed with [COMPANY_NAME] as a [JOB_TITLE] since [START_DATE].\n\nEmployment Details:\n- Position: [JOB_TITLE]\n- Department: [DEPARTMENT]\n- Employment Type: [EMPLOYMENT_TYPE]\n- Annual Salary: [ANNUAL_SALARY]\n- Working Hours: [WORKING_HOURS]\n\n[EMPLOYEE_NAME] is a valued member of our team and has been granted leave from [LEAVE_START] to [LEAVE_END] to pursue work opportunities in Canada.\n\nWe confirm that their position will remain available upon their return, and they are expected to resume duties on [RETURN_DATE].\n\nIf you require any additional information, please contact us at [CONTACT_INFO].\n\nSincerely,\n[HR_MANAGER_NAME]\nHuman Resources Manager\n[COMPANY_NAME]`
    },
    {
      id: 'medical-letter',name: 'Medical Treatment Letter',category: 'medical',country: 'germany',description: 'Medical treatment letter for medical visa applications to Germany',
      lastModified: '2025-08-26',
      usage: 45,
      content: `Dear Visa Officer,\n\nI am writing to request a medical visa for [PATIENT_NAME] who requires specialized medical treatment in Germany.\n\nPatient Information:\n- Name: [PATIENT_NAME]\n- Age: [PATIENT_AGE]\n- Medical Condition: [MEDICAL_CONDITION]\n- Treatment Required: [TREATMENT_TYPE]\n\nThe patient has been referred to [HOSPITAL_NAME] in [CITY], Germany, for treatment under the care of Dr. [DOCTOR_NAME], a specialist in [SPECIALIZATION].\n\nTreatment Details:\n- Estimated Duration: [TREATMENT_DURATION]\n- Appointment Date: [APPOINTMENT_DATE]\n- Expected Cost: [TREATMENT_COST]\n\nThe patient's medical records and referral letters from local physicians are attached. The treatment is urgent and cannot be delayed.\n\nWe request your favorable consideration of this medical visa application.\n\nRespectfully,\n[REFERRING_DOCTOR]\n[MEDICAL_QUALIFICATION]\n[HOSPITAL_NAME]`
    },
    {
      id: 'family-reunion-letter',
      name: 'Family Reunion Letter',
      category: 'family',
      country: 'australia',
      description: 'Family reunion letter for family visa applications to Australia',
      lastModified: '2025-08-25',
      usage: 123,
      content: `Dear Immigration Officer,\n\nI am writing to support the visa application of [APPLICANT_NAME], who is my [RELATIONSHIP] and wishes to join me in Australia for family reunion.\n\nMy Details:\n- Name: [SPONSOR_NAME]\n- Australian Status: [CITIZENSHIP_STATUS]\n- Address: [AUSTRALIAN_ADDRESS]\n- Occupation: [OCCUPATION]\n\nFamily Relationship:\nI can confirm that [APPLICANT_NAME] is my [RELATIONSHIP]. We have been separated since [SEPARATION_DATE] when I migrated to Australia. The purpose of this application is to reunite our family.\n\nSupport Provided:\nI will provide full financial and accommodation support including:\n- Housing at my residence\n- Financial support for living expenses\n- Assistance with settlement and integration\n\nAttached documents include proof of relationship, my citizenship documents, and financial statements.\n\nI respectfully request your favorable consideration of this application.\n\nSincerely,\n[SPONSOR_NAME]`
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tourist', label: 'Tourist Visa' },
    { value: 'business', label: 'Business Visa' },
    { value: 'student', label: 'Student Visa' },
    { value: 'work', label: 'Work Visa' },
    { value: 'medical', label: 'Medical Visa' },
    { value: 'family', label: 'Family Visa' }
  ];

  const countries = [
    { value: 'all', label: 'All Countries' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
    { value: 'schengen', label: 'Schengen Area' }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || template?.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Template Library</h2>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-3"
        />
        
        {/* Filters */}
        <div className="space-y-3">
          <Select
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          
          <Select
            label="Country"
            options={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
          />
        </div>
      </div>
      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTemplates?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No templates found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredTemplates?.map((template) => (
            <div
              key={template?.id}
              className={`p-3 rounded-lg border cursor-pointer transition-smooth hover:shadow-elevation-1 ${
                selectedTemplate?.id === template?.id
                  ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
              }`}
              onClick={() => onTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm">{template?.name}</h3>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Eye" size={12} />
                  <span>{template?.usage}</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {template?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-secondary/20 text-secondary rounded">
                    {categories?.find(c => c?.value === template?.category)?.label}
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded">
                    {countries?.find(c => c?.value === template?.country)?.label}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {new Date(template.lastModified)?.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Plus"
          iconPosition="left"
        >
          Create New Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateLibrary;