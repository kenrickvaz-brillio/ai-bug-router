import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Typography,
    Button,
    Space,
    Tag,
    Divider,
    Progress,
    Select,
    message,
    Breadcrumb,
    Timeline,
    Empty
} from 'antd';
import {
    ArrowLeft,
    Zap,
    CheckCircle,
    AlertCircle,
    User,
    Clock,
    ExternalLink,
    Info
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Team, Severity } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

export const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tickets, runTriage, routeTicket } = useAppContext();

    const ticket = tickets.find(t => t.id === id);
    const [isTriaging, setIsTriaging] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team>('Unassigned');
    const [selectedSeverity, setSelectedSeverity] = useState<Severity>('Sev3');

    useEffect(() => {
        if (ticket?.aiSuggestion) {
            setSelectedTeam(ticket.aiSuggestion.predictedTeam);
            setSelectedSeverity(ticket.aiSuggestion.predictedSeverity);
        }
    }, [ticket]);

    if (!ticket) return <Empty description="Ticket not found" />;

    const handleRunTriage = async () => {
        setIsTriaging(true);
        await runTriage(ticket.id);
        setIsTriaging(false);
        message.success('AI Triage completed successfully');
    };

    const handleRoute = (override: boolean) => {
        routeTicket(ticket.id, selectedTeam, selectedSeverity);
        message.success(`Ticket routed to ${selectedTeam} (${selectedSeverity})`);
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <Breadcrumb items={[
                    { title: <a onClick={() => navigate('/')}>Inbox</a> },
                    { title: ticket.id },
                ]} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                    <Button icon={<ArrowLeft size={18} />} onClick={() => navigate('/')} />
                    <Title level={3} style={{ margin: 0 }}>{ticket.subject}</Title>
                    <Tag color="blue">{ticket.sourceType}</Tag>
                </div>
            </div>

            <Row gutter={24}>
                {/* Left: Content Viewer */}
                <Col span={15}>
                    <Card className="premium-shadow" style={{ borderRadius: '16px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <Space size="large">
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>REQUESTER</Text>
                                    <Text strong>{ticket.requester}</Text>
                                </Space>
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>ORGANIZATION</Text>
                                    <Text strong>{ticket.org}</Text>
                                </Space>
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>RECEIVED</Text>
                                    <Text strong>{format(new Date(ticket.createdAt), 'MMM d, yyyy HH:mm')}</Text>
                                </Space>
                            </Space>
                            <Button icon={<ExternalLink size={16} />}>View Original</Button>
                        </div>

                        <Divider />

                        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <Title level={5}>Content</Title>
                            <Paragraph style={{ whiteSpace: 'pre-wrap', fontSize: '15px', lineHeight: '1.6' }}>
                                {ticket.body}
                            </Paragraph>
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <Title level={5}>Audit Trail</Title>
                            <Timeline
                                items={ticket.auditTrail.map(entry => ({
                                    children: (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text strong>{entry.action}</Text>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {format(new Date(entry.timestamp), 'HH:mm:ss')} • {entry.user}
                                            </Text>
                                        </div>
                                    ),
                                    description: entry.details
                                }))}
                            />
                        </div>
                    </Card>
                </Col>

                {/* Right: AI Triage Panel */}
                <Col span={9}>
                    <Card
                        className="premium-shadow"
                        style={{
                            borderRadius: '16px',
                            border: '2px solid #6366f1',
                            position: 'sticky',
                            top: '88px'
                        }}
                        title={
                            <Space>
                                <Zap size={18} color="#6366f1" fill="#6366f1" />
                                <span>AI Triage Panel</span>
                            </Space>
                        }
                    >
                        {!ticket.aiSuggestion && !isTriaging ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <Zap size={48} color="#e2e8f0" style={{ marginBottom: '16px' }} />
                                <Paragraph type="secondary">This item has not been triaged yet.</Paragraph>
                                <Button type="primary" size="large" onClick={handleRunTriage} icon={<Zap size={16} />}>
                                    Run AI Triage
                                </Button>
                            </div>
                        ) : isTriaging ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Zap size={48} color="#6366f1" />
                                </motion.div>
                                <Title level={4} style={{ marginTop: '24px' }}>Analyzing Content...</Title>
                                <Text type="secondary">Scanning keywords and predicting route</Text>
                                <Progress percent={85} status="active" strokeColor="#6366f1" style={{ marginTop: '24px' }} />
                            </div>
                        ) : (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <Text strong>Confidence Score</Text>
                                            <Text strong color={ticket.aiSuggestion!.confidence > 0.8 ? '#10b981' : '#f59e0b'}>
                                                {(ticket.aiSuggestion!.confidence * 100).toFixed(0)}%
                                            </Text>
                                        </div>
                                        <Progress
                                            percent={ticket.aiSuggestion!.confidence * 100}
                                            showInfo={false}
                                            strokeColor={ticket.aiSuggestion!.confidence > 0.8 ? '#10b981' : '#f59e0b'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>PREDICTED TEAM</Text>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={selectedTeam}
                                            onChange={setSelectedTeam}
                                            options={[
                                                { value: 'Payments', label: 'Payments' },
                                                { value: 'Identity', label: 'Identity' },
                                                { value: 'Mobile', label: 'Mobile' },
                                                { value: 'Web', label: 'Web' },
                                                { value: 'Infra', label: 'Infra' },
                                                { value: 'Data', label: 'Data' },
                                                { value: 'Content', label: 'Content' },
                                            ]}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>PREDICTED SEVERITY</Text>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={selectedSeverity}
                                            onChange={setSelectedSeverity}
                                            options={[
                                                { value: 'Sev1', label: 'Sev1 - Critical Outage' },
                                                { value: 'Sev2', label: 'Sev2 - Major Issue' },
                                                { value: 'Sev3', label: 'Sev3 - Functional Bug' },
                                                { value: 'Sev4', label: 'Sev4 - Info/Request' },
                                            ]}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>SUGGESTED TAGS</Text>
                                        <Space wrap>
                                            {ticket.aiSuggestion!.tags.map(tag => (
                                                <Tag key={tag} color="blue" style={{ borderRadius: '4px' }}>{tag}</Tag>
                                            ))}
                                        </Space>
                                    </div>

                                    <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #bae6fd' }}>
                                        <Space align="start">
                                            <Info size={16} color="#0369a1" style={{ marginTop: '2px' }} />
                                            <div>
                                                <Text strong style={{ color: '#0369a1', fontSize: '13px' }}>Why this route?</Text>
                                                <ul style={{ paddingLeft: '16px', margin: '8px 0 0 0', fontSize: '12px', color: '#0c4a6e' }}>
                                                    {ticket.aiSuggestion!.explanation.map((exp, i) => (
                                                        <li key={i}>{exp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Space>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>SIMILAR PAST ISSUES</Text>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            {ticket.aiSuggestion!.similarIssues?.map(issue => (
                                                <div key={issue} style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', border: '1px solid #e2e8f0' }}>
                                                    <Text strong>{issue}</Text>
                                                    <Text type="link">View</Text>
                                                </div>
                                            ))}
                                        </Space>
                                    </div>

                                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                        <Button
                                            type="primary"
                                            block
                                            size="large"
                                            onClick={() => handleRoute(false)}
                                            disabled={ticket.status === 'Routed'}
                                        >
                                            Approve & Route
                                        </Button>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <Button
                                                block
                                                onClick={() => handleRoute(true)}
                                                disabled={ticket.status === 'Routed'}
                                            >
                                                Override
                                            </Button>
                                            <Button
                                                block
                                                danger
                                                onClick={() => {
                                                    message.info('Marked as Needs Info');
                                                    navigate('/');
                                                }}
                                            >
                                                Needs Info
                                            </Button>
                                        </div>
                                    </Space>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
