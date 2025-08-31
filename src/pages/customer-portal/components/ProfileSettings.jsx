import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    nationality: 'us',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'us'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsUpdates: false,
    applicationUpdates: true,
    appointmentReminders: true,
    documentRequests: true,
    paymentReminders: true,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' }
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
  };

  const handleNotificationUpdate = () => {
    console.log('Updating notifications:', notifications);
  };

  const handlePasswordChange = () => {
    if (security?.newPassword === security?.confirmPassword) {
      console.log('Changing password');
      setSecurity({
        ...security,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={32} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Photo</h3>
          <p className="text-sm text-muted-foreground">Update your profile picture</p>
          <div className="flex items-center space-x-2 mt-2">
            <Button size="sm" variant="outline">Upload Photo</Button>
            <Button size="sm" variant="ghost">Remove</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={profileData?.firstName}
          onChange={(e) => setProfileData({...profileData, firstName: e?.target?.value})}
          required
        />
        <Input
          label="Last Name"
          value={profileData?.lastName}
          onChange={(e) => setProfileData({...profileData, lastName: e?.target?.value})}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={profileData?.email}
          onChange={(e) => setProfileData({...profileData, email: e?.target?.value})}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={profileData?.phone}
          onChange={(e) => setProfileData({...profileData, phone: e?.target?.value})}
        />
        <Input
          label="Date of Birth"
          type="date"
          value={profileData?.dateOfBirth}
          onChange={(e) => setProfileData({...profileData, dateOfBirth: e?.target?.value})}
        />
        <Select
          label="Nationality"
          options={countries}
          value={profileData?.nationality}
          onChange={(value) => setProfileData({...profileData, nationality: value})}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Address Information</h4>
        <Input
          label="Street Address"
          value={profileData?.address}
          onChange={(e) => setProfileData({...profileData, address: e?.target?.value})}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            value={profileData?.city}
            onChange={(e) => setProfileData({...profileData, city: e?.target?.value})}
          />
          <Input
            label="State/Province"
            value={profileData?.state}
            onChange={(e) => setProfileData({...profileData, state: e?.target?.value})}
          />
          <Input
            label="ZIP/Postal Code"
            value={profileData?.zipCode}
            onChange={(e) => setProfileData({...profileData, zipCode: e?.target?.value})}
          />
        </div>
        <Select
          label="Country"
          options={countries}
          value={profileData?.country}
          onChange={(value) => setProfileData({...profileData, country: value})}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleProfileUpdate}>Save Changes</Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-4">Communication Preferences</h4>
        <div className="space-y-4">
          <Checkbox
            label="Email Updates"
            description="Receive updates about your applications via email"
            checked={notifications?.emailUpdates}
            onChange={(e) => setNotifications({...notifications, emailUpdates: e?.target?.checked})}
          />
          <Checkbox
            label="SMS Updates"
            description="Receive important updates via text message"
            checked={notifications?.smsUpdates}
            onChange={(e) => setNotifications({...notifications, smsUpdates: e?.target?.checked})}
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Application Notifications</h4>
        <div className="space-y-4">
          <Checkbox
            label="Application Status Updates"
            description="Get notified when your application status changes"
            checked={notifications?.applicationUpdates}
            onChange={(e) => setNotifications({...notifications, applicationUpdates: e?.target?.checked})}
          />
          <Checkbox
            label="Document Requests"
            description="Receive alerts when additional documents are needed"
            checked={notifications?.documentRequests}
            onChange={(e) => setNotifications({...notifications, documentRequests: e?.target?.checked})}
          />
          <Checkbox
            label="Appointment Reminders"
            description="Get reminded about upcoming appointments"
            checked={notifications?.appointmentReminders}
            onChange={(e) => setNotifications({...notifications, appointmentReminders: e?.target?.checked})}
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Payment & Billing</h4>
        <div className="space-y-4">
          <Checkbox
            label="Payment Reminders"
            description="Receive reminders for pending payments"
            checked={notifications?.paymentReminders}
            onChange={(e) => setNotifications({...notifications, paymentReminders: e?.target?.checked})}
          />
          <Checkbox
            label="Marketing Emails"
            description="Receive promotional offers and updates"
            checked={notifications?.marketingEmails}
            onChange={(e) => setNotifications({...notifications, marketingEmails: e?.target?.checked})}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-4">Change Password</h4>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={security?.currentPassword}
            onChange={(e) => setSecurity({...security, currentPassword: e?.target?.value})}
          />
          <Input
            label="New Password"
            type="password"
            value={security?.newPassword}
            onChange={(e) => setSecurity({...security, newPassword: e?.target?.value})}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={security?.confirmPassword}
            onChange={(e) => setSecurity({...security, confirmPassword: e?.target?.value})}
          />
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Two-Factor Authentication</h4>
        <div className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Checkbox
              checked={security?.twoFactorEnabled}
              onChange={(e) => setSecurity({...security, twoFactorEnabled: e?.target?.checked})}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Login Activity</h4>
        <div className="space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Current Session</p>
                <p className="text-sm text-muted-foreground">New York, NY • Chrome on Windows</p>
              </div>
              <span className="text-sm text-success">Active</span>
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Previous Session</p>
                <p className="text-sm text-muted-foreground">New York, NY • Safari on iPhone • 2 days ago</p>
              </div>
              <Button size="sm" variant="ghost">Revoke</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-4">Language & Region</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' }
            ]}
            value="en"
            onChange={() => {}}
          />
          <Select
            label="Time Zone"
            options={[
              { value: 'est', label: 'Eastern Time (EST)' },
              { value: 'pst', label: 'Pacific Time (PST)' },
              { value: 'cst', label: 'Central Time (CST)' },
              { value: 'mst', label: 'Mountain Time (MST)' }
            ]}
            value="est"
            onChange={() => {}}
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Display Preferences</h4>
        <div className="space-y-4">
          <Checkbox
            label="Dark Mode"
            description="Use dark theme for better viewing in low light"
           
            onChange={() => {}}
          />
          <Checkbox
            label="Compact View"
            description="Show more information in less space"
           
            onChange={() => {}}
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Privacy Settings</h4>
        <div className="space-y-4">
          <Checkbox
            label="Share Usage Data"
            description="Help improve our service by sharing anonymous usage data"
            checked
            onChange={() => {}}
          />
          <Checkbox
            label="Allow Cookies"
            description="Enable cookies for better user experience"
            checked
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:block">{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'security' && renderSecurityTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
      </div>
    </div>
  );
};

export default ProfileSettings;