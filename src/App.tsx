import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/AppLayout';
import { InboxPage } from './pages/InboxPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { DemoScript } from './components/DemoScript';
import { ConfigProvider } from 'antd';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6366f1',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                },
                components: {
                    Card: {
                        boxShadowTertiary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }
                }
            }}
        >
            <AppProvider>
                <Router>
                    <AppLayout>
                        <Routes>
                            <Route path="/" element={<InboxPage />} />
                            <Route path="/ticket/:id" element={<ItemDetailPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Routes>
                        <DemoScript />
                    </AppLayout>
                </Router>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
