import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserManagement from './pages/user-management';
import FinancialManagement from './pages/financial-management';
import Dashboard from './pages/dashboard';
import CustomerPortal from './pages/customer-portal';
import AILetterWriter from './pages/ai-letter-writer';
import CommunicationCenter from './pages/communication-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AILetterWriter />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/financial-management" element={<FinancialManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-portal" element={<CustomerPortal />} />
        <Route path="/ai-letter-writer" element={<AILetterWriter />} />
        <Route path="/communication-center" element={<CommunicationCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
