import React from 'react';
import { Layout, Menu, Button, Space, Typography, Badge, Drawer, Grid } from 'antd';
import {
    Inbox,
    BarChart3,
    Settings,
    Bug,
    LogOut,
    HelpCircle,
    Bell,
    Menu as MenuIcon,
    X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tickets } = useAppContext();
    const screens = useBreakpoint();
    const [drawerVisible, setDrawerVisible] = React.useState(false);

    const isMobile = !screens.md;

    const newTicketsCount = tickets.filter(t => t.status === 'New').length;

    const menuItems = [
        {
            key: '/',
            icon: <Inbox size={18} />,
            label: 'Inbox / Intake',
        },
        {
            key: '/dashboard',
            icon: <BarChart3 size={18} />,
            label: 'Routing Dashboard',
        },
        {
            key: '/settings',
            icon: <Settings size={18} />,
            label: 'Rules & Models',
        },
    ];

    const SidebarContent = (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
                style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                onClick={() => {
                    navigate('/');
                    if (isMobile) setDrawerVisible(false);
                }}
            >
                <div style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    padding: '8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Bug color="white" size={24} />
                </div>
                <Title level={4} style={{ margin: 0, background: 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI Bug Router
                </Title>
            </div>

            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems.map(item => ({
                    ...item,
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{item.label}</span>
                            {item.key === '/' && newTicketsCount > 0 && (
                                <Badge count={newTicketsCount} style={{ backgroundColor: '#6366f1' }} />
                            )}
                        </div>
                    )
                }))}
                onClick={({ key }) => {
                    navigate(key);
                    if (isMobile) setDrawerVisible(false);
                }}
                style={{ borderRight: 0, padding: '0 12px', flex: 1 }}
            />

            <div style={{ padding: '24px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="text" icon={<HelpCircle size={18} />} block style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Help Center
                    </Button>
                    <Button type="text" icon={<LogOut size={18} />} block style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Logout
                    </Button>
                </Space>
            </div>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {!isMobile ? (
                <Sider
                    width={260}
                    theme="light"
                    className="premium-shadow"
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 100,
                        borderRight: '1px solid #e2e8f0'
                    }}
                >
                    {SidebarContent}
                </Sider>
            ) : (
                <Drawer
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    width={280}
                    bodyStyle={{ padding: 0 }}
                    closable={false}
                >
                    {SidebarContent}
                </Drawer>
            )}

            <Layout style={{ marginLeft: isMobile ? 0 : 260, transition: 'all 0.2s' }}>
                <Header style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: isMobile ? '0 16px' : '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #e2e8f0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 99,
                    height: '64px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {isMobile && (
                            <Button
                                type="text"
                                icon={<MenuIcon size={24} />}
                                onClick={() => setDrawerVisible(true)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            />
                        )}
                        {isMobile && (
                            <Title level={4} style={{ margin: 0, background: 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                AI Bug Router
                            </Title>
                        )}
                    </div>
                    <Space size="large" align="center" style={{ height: '100%' }}>
                        <Badge dot color="#6366f1" offset={[2, 16]}>
                            <Bell size={20} style={{ cursor: 'pointer', color: '#64748b' }} />
                        </Badge>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }} className="sidebar-item">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Agent Demo</span>
                                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>L1 Support</span>
                            </div>
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                color: '#6366f1',
                                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                            }}>
                                AD
                            </div>
                        </div>
                    </Space>
                </Header>

                <Content style={{ padding: isMobile ? '16px' : '32px', minHeight: 'calc(100vh - 64px)' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
