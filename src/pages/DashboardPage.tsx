import React, { useMemo } from 'react';
import {
    Row,
    Col,
    Card,
    Typography,
    Statistic,
    Table,
    Button,
    Space
} from 'antd';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import {
    Download,
    TrendingUp,
    Users,
    Clock,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];

export const DashboardPage: React.FC = () => {
    const { tickets } = useAppContext();

    const stats = useMemo(() => {
        const total = tickets.length;
        const routed = tickets.filter(t => t.status === 'Routed').length;
        const sev1 = tickets.filter(t => t.aiSuggestion?.predictedSeverity === 'Sev1').length;
        const overrides = tickets.filter(t => t.auditTrail.some(a => a.action === 'Ticket Routed' && a.details?.includes('Override'))).length;

        return { total, routed, sev1, overrides, avgTime: '1.2m' };
    }, [tickets]);

    const teamData = useMemo(() => {
        const counts: Record<string, number> = {};
        tickets.forEach(t => {
            const team = t.aiSuggestion?.predictedTeam || 'Unassigned';
            counts[team] = (counts[team] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [tickets]);

    const severityData = useMemo(() => {
        const counts: Record<string, number> = {};
        tickets.forEach(t => {
            const sev = t.aiSuggestion?.predictedSeverity || 'Unknown';
            counts[sev] = (counts[sev] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [tickets]);

    const routedItems = tickets.filter(t => t.status === 'Routed');

    const exportCSV = () => {
        const headers = ['ID', 'Source', 'Subject', 'Team', 'Severity', 'Status', 'Created'];
        const rows = routedItems.map(t => [
            t.id,
            t.sourceType,
            t.subject,
            t.aiSuggestion?.predictedTeam || 'N/A',
            t.aiSuggestion?.predictedSeverity || 'N/A',
            t.status,
            t.createdAt
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `routed_tickets_${format(new Date(), 'yyyyMMdd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Routing Dashboard</Title>
                    <Text type="secondary">Performance metrics and routing distribution.</Text>
                </div>
                <Button icon={<Download size={16} />} onClick={exportCSV}>Export Routed Items</Button>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                <Col span={4}>
                    <Card className="premium-shadow">
                        <Statistic title="Total Items" value={stats.total} prefix={<TrendingUp size={16} />} />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card className="premium-shadow">
                        <Statistic title="Routed Today" value={stats.routed} prefix={<CheckCircle2 size={16} color="#10b981" />} />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card className="premium-shadow">
                        <Statistic title="Avg Triage Time" value={stats.avgTime} prefix={<Clock size={16} />} />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card className="premium-shadow">
                        <Statistic title="Override Rate" value={((stats.overrides / (stats.routed || 1)) * 100).toFixed(1)} suffix="%" prefix={<Users size={16} />} />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card className="premium-shadow">
                        <Statistic title="Sev1 Count" value={stats.sev1} valueStyle={{ color: '#ef4444' }} prefix={<AlertTriangle size={16} />} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24} style={{ marginBottom: '32px' }}>
                <Col span={14}>
                    <Card title="Volume by Team" className="premium-shadow">
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={teamData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="Volume by Severity" className="premium-shadow">
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={severityData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {severityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card title="Recently Routed Items" className="premium-shadow">
                <Table
                    dataSource={routedItems}
                    rowKey="id"
                    columns={[
                        { title: 'ID', dataIndex: 'id', key: 'id' },
                        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
                        { title: 'Routed To', key: 'team', render: (r) => <span className="team-pill">{r.aiSuggestion?.predictedTeam}</span> },
                        { title: 'Severity', key: 'sev', render: (r) => <span className={`status-badge severity-${r.aiSuggestion?.predictedSeverity}`}>{r.aiSuggestion?.predictedSeverity}</span> },
                        { title: 'Routed At', key: 'time', render: (r) => format(new Date(r.auditTrail[r.auditTrail.length - 1].timestamp), 'HH:mm:ss') },
                    ]}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};
