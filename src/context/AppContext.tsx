import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, TriageRules, TicketStatus, Team, Severity } from '../types';
import { MOCK_TICKETS } from '../mock/data';
import { DEFAULT_RULES, triageItem } from '../utils/triageEngine';

interface AppContextType {
    tickets: Ticket[];
    rules: TriageRules;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    updateRules: (updates: Partial<TriageRules>) => void;
    runTriage: (id: string) => Promise<void>;
    routeTicket: (id: string, team: Team, severity: Severity) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [rules, setRules] = useState<TriageRules>(DEFAULT_RULES);

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const updateRules = (updates: Partial<TriageRules>) => {
        setRules(prev => ({ ...prev, ...updates }));
    };

    const runTriage = async (id: string) => {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        const ticket = tickets.find(t => t.id === id);
        if (ticket) {
            const suggestion = triageItem(ticket, rules);
            updateTicket(id, {
                aiSuggestion: suggestion,
                status: 'In Review',
                auditTrail: [
                    ...ticket.auditTrail,
                    {
                        timestamp: new Date().toISOString(),
                        action: 'AI Triage Completed',
                        user: 'AI Assistant',
                        details: `Predicted ${suggestion.predictedTeam} (${(suggestion.confidence * 100).toFixed(0)}%)`
                    }
                ]
            });
        }
    };

    const routeTicket = (id: string, team: Team, severity: Severity) => {
        const ticket = tickets.find(t => t.id === id);
        if (ticket) {
            updateTicket(id, {
                status: 'Routed',
                auditTrail: [
                    ...ticket.auditTrail,
                    {
                        timestamp: new Date().toISOString(),
                        action: 'Ticket Routed',
                        user: 'Agent Demo',
                        details: `Routed to ${team} with severity ${severity}`
                    }
                ]
            });
        }
    };

    return (
        <AppContext.Provider value={{ tickets, rules, updateTicket, updateRules, runTriage, routeTicket }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};
