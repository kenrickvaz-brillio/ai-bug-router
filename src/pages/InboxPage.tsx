import React, { useState, useMemo } from 'react';
import {
    Table,
    Tabs,
    Input,
    Select,
    Space,
    Tag,
    Typography,
    Card,
    Button,
    Tooltip
} from 'antd';
import {
    Search,
    Filter,
    Mail,
    FileText,
    Database,
    ChevronRight,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Ticket, SourceType, Team, Severity, TicketStatus } from '../types';
import { format } from 'date-fns';

const { Title, Text } = Typography;

export const InboxPage: React.FC = () => {
    const navigate = useNavigate();
    const { tickets } = useAppContext();
    const [activeTab, setActiveTab] = useState<SourceType>('Email');
    const [searchText, setSearchText] = useState('');
    const [teamFilter, setTeamFilter] = useState<Team | 'All'>('All');
    const [severityFilter, setSeverityFilter] = useState<Severity | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All');

    const filteredTickets = useMemo(() => {
        return tickets.filter(t => {
            const matchesTab = t.sourceType === activeTab;
            const matchesSearch = t.subject.toLowerCase().includes(searchText.toLowerCase()) ||
                t.requester.toLowerCase().includes(searchText.toLowerCase());
            const matchesTeam = teamFilter === 'All' || t.aiSuggestion?.predictedTeam === teamFilter;
            const matchesSeverity = severityFilter === 'All' || t.aiSuggestion?.predictedSeverity === severityFilter;
            const matchesStatus = statusFilter === 'All' || t.status === statusFilter;

            return matchesTab && matchesSearch && matchesTeam && matchesSeverity && matchesStatus;
        });
    }, [tickets, activeTab, searchText, teamFilter, severityFilter, statusFilter]);

    const columns = [
        {
            title: 'Subject / Requester',
            key: 'subject',
            render: (record: Ticket) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ fontSize: '14px' }}>{record.subject}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.requester} • {record.org}</Text>
                </Space>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => format(new Date(date), 'MMM d, HH:mm'),
            width: 120,
        },
        {
            title: 'AI Prediction',
            key: 'prediction',
            render: (record: Ticket) => {
                if (!record.aiSuggestion) return <Text type="secondary">Not Triaged</Text>;
                return (
                    <Space>
                        <span className="team-pill">{record.aiSuggestion.predictedTeam}</span>
                        <span className={`status-badge severity-${record.aiSuggestion.predictedSeverity}`}>
                            {record.aiSuggestion.predictedSeverity}
                        </span>
                        <Tooltip title={`Confidence: ${(record.aiSuggestion.confidence * 100).toFixed(0)}%`}>
                            <Zap size={14} color={record.aiSuggestion.confidence > 0.8 ? '#10b981' : '#f59e0b'} fill={record.aiSuggestion.confidence > 0.8 ? '#10b981' : '#f59e0b'} />
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: TicketStatus) => {
                let color = 'default';
                if (status === 'New') color = 'blue';
                if (status === 'In Review') color = 'orange';
                if (status === 'Routed') color = 'green';
                if (status === 'Needs Info') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
            width: 100,
        },
        {
            title: '',
            key: 'action',
            render: (record: Ticket) => (
                <Button
                    type="text"
                    icon={<ChevronRight size={18} />}
                    onClick={() => navigate(`/ticket/${record.id}`)}
                />
            ),
            width: 50,
        },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Intake Inbox</Title>
                    <Text type="secondary">Review and route incoming support items with AI assistance.</Text>
                </div>
                <Button type="primary" icon={<Zap size={16} />} size="large">
                    Auto-Route Batch
                </Button>
            </div>

            <Card className="premium-shadow" style={{ borderRadius: '16px' }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={(key) => setActiveTab(key as SourceType)}
                    items={[
                        { key: 'Email', label: <Space><Mail size={16} /> Emails</Space> },
                        { key: 'Log', label: <Space><FileText size={16} /> Logs</Space> },
                        { key: 'ServiceNow', label: <Space><Database size={16} /> ServiceNow</Space> },
                    ]}
                />

                <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Input
                        placeholder="Search subject, requester..."
                        prefix={<Search size={16} color="#64748b" />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <Select
                        placeholder="Team"
                        style={{ width: 140 }}
                        value={teamFilter}
                        onChange={setTeamFilter}
                        options={[
                            { value: 'All', label: 'All Teams' },
                            { value: 'Payments', label: 'Payments' },
                            { value: 'Identity', label: 'Identity' },
                            { value: 'Mobile', label: 'Mobile' },
                            { value: 'Web', label: 'Web' },
                            { value: 'Infra', label: 'Infra' },
                            { value: 'Data', label: 'Data' },
                            { value: 'Content', label: 'Content' },
                        ]}
                    />
                    <Select
                        placeholder="Severity"
                        style={{ width: 120 }}
                        value={severityFilter}
                        onChange={setSeverityFilter}
                        options={[
                            { value: 'All', label: 'All Sev' },
                            { value: 'Sev1', label: 'Sev1' },
                            { value: 'Sev2', label: 'Sev2' },
                            { value: 'Sev3', label: 'Sev3' },
                            { value: 'Sev4', label: 'Sev4' },
                        ]}
                    />
                    <Select
                        placeholder="Status"
                        style={{ width: 120 }}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { value: 'All', label: 'All Status' },
                            { value: 'New', label: 'New' },
                            { value: 'In Review', label: 'In Review' },
                            { value: 'Routed', label: 'Routed' },
                            { value: 'Needs Info', label: 'Needs Info' },
                        ]}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredTickets}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => navigate(`/ticket/${record.id}`),
                        style: { cursor: 'pointer' }
                    })}
                />
            </Card>
        </div>
    );
};
