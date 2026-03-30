'use client';

import { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Header from './components/Header';
import TabNav from './components/TabNav';
import Footer from './components/Footer';
import PartnerLifecycle from './components/lifecycle/PartnerLifecycle';
import ComplianceCalendar from './components/calendar/ComplianceCalendar';
import KPIDashboard from './components/dashboard/KPIDashboard';

type Tab = 'lifecycle' | 'calendar' | 'dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('lifecycle');

  return (
    <LanguageProvider>
      <Header />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="flex-1 bg-gray-50">
        {activeTab === 'lifecycle' && <PartnerLifecycle />}
        {activeTab === 'calendar' && <ComplianceCalendar />}
        {activeTab === 'dashboard' && <KPIDashboard />}
      </main>
      <Footer />
    </LanguageProvider>
  );
}
