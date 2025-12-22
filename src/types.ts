export type SourceType = 'Email' | 'Log' | 'ServiceNow';
export type TicketStatus = 'New' | 'In Review' | 'Routed' | 'Needs Info';
export type Severity = 'Sev1' | 'Sev2' | 'Sev3' | 'Sev4';
export type Team = 'Payments' | 'Mobile' | 'Web' | 'Identity' | 'Infra' | 'Data' | 'Content' | 'Unassigned';

export interface AuditEntry {
    timestamp: string;
    action: string;
    user: string;
    details?: string;
}

export interface AISuggestion {
    predictedTeam: Team;
    predictedSeverity: Severity;
    confidence: number;
    tags: string[];
    explanation: string[];
    similarIssues?: string[];
}

export interface Ticket {
    id: string;
    sourceType: SourceType;
    createdAt: string;
    requester: string;
    org: string;
    subject: string;
    body: string;
    status: TicketStatus;
    aiSuggestion?: AISuggestion;
    auditTrail: AuditEntry[];
    metadata?: Record<string, any>;
}

export interface TriageRules {
    teamKeywords: Record<Team, string[]>;
    severityKeywords: Record<Severity, string[]>;
    autoRouteThreshold: number;
    taggingThreshold: number;
    addRandomness: boolean;
}
