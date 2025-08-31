import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Document Review Session',
      consultant: 'Sarah Johnson',
      date: '2025-09-02',
      time: '14:00',
      type: 'virtual',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Visa Interview Preparation',
      consultant: 'Michael Chen',
      date: '2025-09-05',
      time: '10:30',
      type: 'in-person',
      status: 'pending'
    }
  ];

  const availableSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'document-review', label: 'Document Review' },
    { value: 'interview-prep', label: 'Interview Preparation' },
    { value: 'follow-up', label: 'Follow-up Meeting' }
  ];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && appointmentType) {
      console.log('Booking appointment:', { selectedDate, selectedTime, appointmentType });
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setAppointmentType('');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'pending':
        return <Icon name="Clock" size={16} className="text-warning" />;
      default:
        return <Icon name="Calendar" size={16} className="text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'virtual' ? 
      <Icon name="Video" size={16} className="text-primary" /> : 
      <Icon name="MapPin" size={16} className="text-secondary" />;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Appointments</h2>
        <Button variant="outline" iconName="Calendar" iconPosition="left">
          View Calendar
        </Button>
      </div>
      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {upcomingAppointments?.map((appointment) => (
            <div key={appointment?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{appointment?.title}</h4>
                    <p className="text-sm text-muted-foreground">with {appointment?.consultant}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(appointment.date)?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{appointment?.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(appointment?.type)}
                        <span className="text-sm text-muted-foreground capitalize">
                          {appointment?.type?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(appointment?.status)}
                    <span className={`text-sm font-medium capitalize ${
                      appointment?.status === 'confirmed' ? 'text-success' : 'text-warning'
                    }`}>
                      {appointment?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {appointment?.type === 'virtual' && (
                      <Button size="sm" variant="outline" iconName="Video">
                        Join Call
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" iconName="MoreVertical" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Book New Appointment */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Book New Appointment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Appointment Type
            </label>
            <Select
              options={appointmentTypes}
              value={appointmentType}
              onChange={setAppointmentType}
              placeholder="Select type"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Preferred Time
            </label>
            <Select
              options={availableSlots}
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder="Select time"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Appointments are subject to consultant availability</span>
          </div>
          
          <Button 
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime || !appointmentType}
            iconName="Calendar"
            iconPosition="left"
          >
            Book Appointment
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="outline" iconName="Phone" iconPosition="left">
            Request Call Back
          </Button>
          <Button variant="outline" iconName="MessageSquare" iconPosition="left">
            Send Message
          </Button>
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            Reschedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;