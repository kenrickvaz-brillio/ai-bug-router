import React from 'react';
import {
    Card,
    Typography,
    Form,
    Input,
    Switch,
    Slider,
    Button,
    Space,
    Tag,
    Divider,
    message
} from 'antd';
import {
    Save,
    RefreshCw,
    ShieldCheck,
    Zap,
    Settings2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Team } from '../types';

const { Title, Text, Paragraph } = Typography;

export const SettingsPage: React.FC = () => {
    const { rules, updateRules } = useAppContext();
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        updateRules(values);
        message.success('Settings updated successfully (in-memory)');
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <Title level={2} style={{ margin: 0 }}>Rules & Model Settings</Title>
                <Text type="secondary">Configure the AI triage engine behavior and keyword mappings.</Text>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={rules}
                onFinish={handleSave}
            >
                <Card title={<Space><ShieldCheck size={18} /> Model Behavior</Space>} className="premium-shadow" style={{ marginBottom: '24px' }}>
                    <Form.Item
                        name="addRandomness"
                        label="Simulate Model Variance"
                        valuePropName="checked"
                        extra="Adds a small random factor to confidence scores to simulate real-world AI behavior."
                    >
                        <Switch />
                    </Form.Item>

                    <Divider />

                    <Form.Item
                        name="autoRouteThreshold"
                        label="Auto-Route Confidence Threshold"
                        extra="Items with confidence above this value will be marked for automatic routing."
                    >
                        <Slider min={0} max={1} step={0.05} marks={{ 0: '0%', 0.85: '85%', 1: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="taggingThreshold"
                        label="Tagging Sensitivity"
                        extra="Controls how many keywords are extracted as tags."
                    >
                        <Slider min={0} max={1} step={0.05} marks={{ 0: 'Low', 0.5: 'Med', 1: 'High' }} />
                    </Form.Item>
                </Card>

                <Card title={<Space><Settings2 size={18} /> Keyword Mappings</Space>} className="premium-shadow" style={{ marginBottom: '24px' }}>
                    <Paragraph type="secondary">
                        Define the keywords used by the deterministic engine to predict teams.
                    </Paragraph>

                    {Object.keys(rules.teamKeywords).filter(t => t !== 'Unassigned').map((team) => (
                        <Form.Item
                            key={team}
                            label={`${team} Team Keywords`}
                            name={['teamKeywords', team]}
                        >
                            <SelectWithTags team={team as Team} />
                        </Form.Item>
                    ))}
                </Card>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button icon={<RefreshCw size={16} />} onClick={() => form.resetFields()}>Reset to Defaults</Button>
                    <Button type="primary" icon={<Save size={16} />} htmlType="submit" size="large">Save Configuration</Button>
                </div>
            </Form>
        </div>
    );
};

const SelectWithTags: React.FC<{ team: Team, value?: string[], onChange?: (val: string[]) => void }> = ({ value = [], onChange }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handlePressEnter = () => {
        if (inputValue && !value.includes(inputValue)) {
            onChange?.([...value, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div style={{ border: '1px solid #d9d9d9', padding: '8px', borderRadius: '6px', background: 'white' }}>
            <Space wrap style={{ marginBottom: value.length > 0 ? '8px' : 0 }}>
                {value.map(tag => (
                    <Tag
                        key={tag}
                        closable
                        onClose={() => onChange?.(value.filter(t => t !== tag))}
                        color="blue"
                    >
                        {tag}
                    </Tag>
                ))}
            </Space>
            <Input
                placeholder="Add keyword and press Enter"
                variant="borderless"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onPressEnter={handlePressEnter}
                style={{ padding: 0 }}
            />
        </div>
    );
};
