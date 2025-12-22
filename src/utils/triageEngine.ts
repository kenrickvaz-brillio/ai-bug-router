import { Ticket, AISuggestion, Team, Severity, TriageRules } from '../types';

export const DEFAULT_RULES: TriageRules = {
    teamKeywords: {
        Payments: ['charge', 'billing', 'payment', 'refund', 'invoice', 'card', 'checkout', 'stripe', 'transaction'],
        Identity: ['login', 'auth', 'SSO', 'MFA', 'password', 'token', 'access', 'permission', 'account'],
        Mobile: ['iOS', 'Android', 'crash', 'build', 'App Store', 'Play Store', 'mobile', 'app', 'iphone'],
        Web: ['UI', 'frontend', 'React', 'browser', 'page', 'CORS', 'css', 'javascript', 'chrome', 'safari'],
        Infra: ['timeout', '5xx', 'latency', 'DNS', 'Kubernetes', 'pod', 'server', 'database', 'aws', 'cloud'],
        Data: ['ETL', 'pipeline', 'schema', 'warehouse', 'Kafka', 'sql', 'analytics', 'report', 'bigquery'],
        Content: ['AEM', 'CMS', 'publish', 'asset', 'translation', 'image', 'video', 'blog', 'article'],
        Unassigned: []
    },
    severityKeywords: {
        Sev1: ['outage', 'down', 'P0', 'SEV1', 'cannot access', 'production down', 'data loss', 'critical', 'emergency'],
        Sev2: ['degraded', 'slow', 'intermittent', '500', 'major', 'broken', 'urgent'],
        Sev3: ['bug', 'issue', 'error', 'incorrect', 'failed', 'minor'],
        Sev4: ['question', 'request', 'how-to', 'help', 'info', 'documentation']
    },
    autoRouteThreshold: 0.85,
    taggingThreshold: 0.6,
    addRandomness: false
};

export function triageItem(ticket: Ticket, rules: TriageRules = DEFAULT_RULES): AISuggestion {
    const content = `${ticket.subject} ${ticket.body}`.toLowerCase();

    // Team Prediction
    const teamScores: Record<Team, number> = {} as any;
    const matchedKeywords: Record<Team, string[]> = {} as any;

    (Object.keys(rules.teamKeywords) as Team[]).forEach(team => {
        teamScores[team] = 0;
        matchedKeywords[team] = [];
        rules.teamKeywords[team].forEach(keyword => {
            if (content.includes(keyword.toLowerCase())) {
                teamScores[team] += 1;
                matchedKeywords[team].push(keyword);
            }
        });
    });

    let predictedTeam: Team = 'Unassigned';
    let maxScore = 0;
    Object.entries(teamScores).forEach(([team, score]) => {
        if (score > maxScore) {
            maxScore = score;
            predictedTeam = team as Team;
        }
    });

    // Severity Prediction
    let predictedSeverity: Severity = 'Sev3'; // Default
    const sevMatches: string[] = [];

    if (rules.severityKeywords.Sev1.some(k => content.includes(k.toLowerCase()))) {
        predictedSeverity = 'Sev1';
        sevMatches.push('Critical keywords found');
    } else if (rules.severityKeywords.Sev2.some(k => content.includes(k.toLowerCase()))) {
        predictedSeverity = 'Sev2';
        sevMatches.push('High priority keywords found');
    } else if (rules.severityKeywords.Sev4.some(k => content.includes(k.toLowerCase()))) {
        predictedSeverity = 'Sev4';
        sevMatches.push('Informational keywords found');
    }

    // Confidence Calculation
    let confidence = Math.min(0.95, (maxScore * 0.2) + (sevMatches.length * 0.1) + 0.3);
    if (predictedTeam === 'Unassigned') confidence = 0.1;

    if (rules.addRandomness) {
        confidence += (Math.random() - 0.5) * 0.1;
    }

    // Tags
    const tags = matchedKeywords[predictedTeam] || [];

    // Explanation
    const explanation = [
        `Matched ${maxScore} keywords for ${predictedTeam} team: ${tags.slice(0, 3).join(', ')}`,
        predictedSeverity === 'Sev1' ? 'Detected outage-related terminology, escalating to Sev1.' : `Severity set to ${predictedSeverity} based on content analysis.`,
        `Confidence score of ${(confidence * 100).toFixed(0)}% based on keyword density.`
    ];

    return {
        predictedTeam,
        predictedSeverity,
        confidence,
        tags,
        explanation,
        similarIssues: ['INC-8821', 'INC-7742'] // Mock similar issues
    };
}
