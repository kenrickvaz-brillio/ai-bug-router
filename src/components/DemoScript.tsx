import React, { useState } from 'react';
import { Modal, Button, Typography, Space, Steps } from 'antd';
import { PlayCircle, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;

export const DemoScript: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: 'Intake Review',
            content: 'Start in the Inbox. Notice the different sources (Emails, Logs, ServiceNow). The "AI Prediction" column shows items that have already been processed or are pending.',
        },
        {
            title: 'AI Triage',
            content: 'Click on a "New" ticket (e.g., EML-001). In the detail view, click "Run AI Triage". Watch the AI analyze the content and suggest a team, severity, and tags based on the rules.',
        },
        {
            title: 'Approval & Override',
            content: 'Review the "Why this route?" explanation. You can either "Approve & Route" or "Override" if you think the AI missed something (try this on the "Tricky" examples).',
        },
        {
            title: 'Analytics',
            content: 'Head over to the Dashboard to see the real-time impact. Monitor the override rate and volume distribution across teams.',
        },
        {
            title: 'Configuration',
            content: 'Finally, visit the Settings page to see how the "brain" works. You can adjust keyword mappings and see how it affects future triage actions.',
        },
    ];

    return (
        <>
            <Button
                type="primary"
                icon={<PlayCircle size={18} />}
                onClick={() => setIsModalOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    height: '48px',
                    borderRadius: '24px',
                    padding: '0 24px',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                }}
            >
                Demo Walkthrough
            </Button>

            <Modal
                title={<Space><Zap color="#6366f1" fill="#6366f1" size={20} /> AI Bug Router Demo Script</Space>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0}>
                        Previous
                    </Button>,
                    <Button key="next" type="primary" onClick={() => currentStep === steps.length - 1 ? setIsModalOpen(false) : setCurrentStep(prev => prev + 1)}>
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                ]}
                width={600}
            >
                <Steps
                    current={currentStep}
                    items={steps.map(s => ({ title: s.title }))}
                    size="small"
                    style={{ marginBottom: '24px', marginTop: '16px' }}
                />
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <Title level={4}>{steps[currentStep].title}</Title>
                    <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                        {steps[currentStep].content}
                    </Paragraph>
                </div>
            </Modal>
        </>
    );
};
