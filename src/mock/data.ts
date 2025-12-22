import { Ticket } from '../types';
import { subHours, subDays } from 'date-fns';

const now = new Date();

export const MOCK_TICKETS: Ticket[] = [
    // --- EMAILS (12) ---
    {
        id: 'EML-001',
        sourceType: 'Email',
        createdAt: subHours(now, 1).toISOString(),
        requester: 'alice@globex.com',
        org: 'Globex Corp',
        subject: 'Cannot process refund for order #12345',
        body: 'Hi support, I am trying to issue a refund for a customer but the payment portal keeps throwing an error. This is urgent as the customer is waiting. I tried using the Stripe dashboard too but no luck.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 1).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-002',
        sourceType: 'Email',
        createdAt: subHours(now, 2).toISOString(),
        requester: 'bob@startup.io',
        org: 'Startup.io',
        subject: 'Login failing with MFA error',
        body: 'Hello, my team cannot login to the dashboard. The MFA token is not being accepted. We use Okta SSO. Please help, we are blocked.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 2).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-003',
        sourceType: 'Email',
        createdAt: subHours(now, 3).toISOString(),
        requester: 'charlie@bigco.com',
        org: 'BigCo',
        subject: 'App crashing on iOS 17',
        body: 'The latest build of the mobile app is crashing immediately on startup for all our iPhone users. This started after the update this morning.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 3).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-004',
        sourceType: 'Email',
        createdAt: subHours(now, 4).toISOString(),
        requester: 'dana@web.com',
        org: 'Web Solutions',
        subject: 'UI glitch on the pricing page',
        body: 'The pricing table is overlapping with the footer on Chrome. It looks fine on Safari. Can you fix the React component layout?',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 4).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-005',
        sourceType: 'Email',
        createdAt: subHours(now, 5).toISOString(),
        requester: 'eric@infra.net',
        org: 'InfraNet',
        subject: 'Latency spikes in production',
        body: 'We are seeing 5xx errors and high latency in the US-East region. Kubernetes pods are restarting frequently. Possible DNS issue.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-006',
        sourceType: 'Email',
        createdAt: subHours(now, 6).toISOString(),
        requester: 'fiona@data.com',
        org: 'Data Insights',
        subject: 'ETL pipeline failed for nightly run',
        body: 'The Kafka stream seems to be stuck and the BigQuery schema doesn\'t match the incoming data. The warehouse is not updating.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 6).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-007',
        sourceType: 'Email',
        createdAt: subHours(now, 7).toISOString(),
        requester: 'george@content.org',
        org: 'Content Masters',
        subject: 'AEM publish failed for new campaign',
        body: 'We cannot publish the new assets to the CMS. The translation service is also returning a timeout error.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 7).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-008',
        sourceType: 'Email',
        createdAt: subHours(now, 8).toISOString(),
        requester: 'helen@finance.com',
        org: 'Finance Hub',
        subject: 'Invoice generation is slow',
        body: 'Generating the monthly invoices is taking forever. Is there a server issue? We need these by EOD.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 8).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-009',
        sourceType: 'Email',
        createdAt: subHours(now, 9).toISOString(),
        requester: 'ian@mobile.dev',
        org: 'Mobile First',
        subject: 'Android app not showing latest products',
        body: 'The Play Store version is not syncing with the backend. Users are seeing old data. Is the API down?',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 9).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-010',
        sourceType: 'Email',
        createdAt: subHours(now, 10).toISOString(),
        requester: 'jack@identity.com',
        org: 'Identity Plus',
        subject: 'Password reset link not working',
        body: 'Users are reporting that the password reset token expires immediately. This is affecting all auth flows.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 10).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-011',
        sourceType: 'Email',
        createdAt: subHours(now, 11).toISOString(),
        requester: 'kyle@web.com',
        org: 'Web Devs',
        subject: 'CORS error on the checkout page',
        body: 'The frontend is getting blocked by CORS when trying to hit the payment API. This is a major blocker for the launch.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 11).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'EML-012',
        sourceType: 'Email',
        createdAt: subHours(now, 12).toISOString(),
        requester: 'laura@infra.com',
        org: 'Cloud Ops',
        subject: 'Production database is down!',
        body: 'CRITICAL: The production SQL database is not responding. All services are down. This is a SEV1 outage.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 12).toISOString(), action: 'Received', user: 'System' }]
    },

    // --- LOGS (12) ---
    {
        id: 'LOG-001',
        sourceType: 'Log',
        createdAt: subHours(now, 0.5).toISOString(),
        requester: 'System Monitor',
        org: 'Internal',
        subject: 'ERROR: PaymentGatewayTimeoutException',
        body: '2023-10-27 10:15:22 [ERROR] PaymentGateway - Timeout after 30s while connecting to Stripe API. TransactionID: tx_99283. UserID: user_442.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-002',
        sourceType: 'Log',
        createdAt: subHours(now, 1.5).toISOString(),
        requester: 'Auth Service',
        org: 'Internal',
        subject: 'WARN: Multiple failed login attempts',
        body: '2023-10-27 09:45:10 [WARN] AuthService - 50 consecutive failed login attempts for user admin@company.com from IP 192.168.1.1. Possible brute force.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 1.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-003',
        sourceType: 'Log',
        createdAt: subHours(now, 2.5).toISOString(),
        requester: 'Mobile API',
        org: 'Internal',
        subject: 'FATAL: Android client crash report',
        body: 'Stacktrace: java.lang.NullPointerException at com.app.mobile.ProductListFragment.onViewCreated(ProductListFragment.java:45). Device: Samsung S22.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 2.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-004',
        sourceType: 'Log',
        createdAt: subHours(now, 3.5).toISOString(),
        requester: 'Frontend Sentry',
        org: 'Internal',
        subject: 'Uncaught TypeError: Cannot read property \'map\' of undefined',
        body: 'File: https://app.com/static/js/main.chunk.js. Line: 1024. Component: DashboardStats. Browser: Chrome 118.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 3.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-005',
        sourceType: 'Log',
        createdAt: subHours(now, 4.5).toISOString(),
        requester: 'K8s Watcher',
        org: 'Internal',
        subject: 'Pod OOMKilled: api-service-77b8',
        body: 'Namespace: prod. Pod: api-service-77b8. Reason: OOMKilled. Memory Limit: 512Mi. Usage: 513Mi. Restarting...',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 4.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-006',
        sourceType: 'Log',
        createdAt: subHours(now, 5.5).toISOString(),
        requester: 'Data Pipeline',
        org: 'Internal',
        subject: 'Schema mismatch in ETL job #882',
        body: 'Job failed at step \'LoadToBigQuery\'. Error: Field \'user_id\' is missing in the incoming JSON record. Source: Kafka-Topic-Users.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 5.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-007',
        sourceType: 'Log',
        createdAt: subHours(now, 6.5).toISOString(),
        requester: 'CMS Monitor',
        org: 'Internal',
        subject: 'AEM Dispatcher Cache Flush Failed',
        body: 'Error: Connection refused while trying to flush cache on dispatcher-01. Content updates might not be visible.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 6.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-008',
        sourceType: 'Log',
        createdAt: subHours(now, 7.5).toISOString(),
        requester: 'Billing Service',
        org: 'Internal',
        subject: 'Invoice PDF generation failed',
        body: 'Error: Could not find template \'invoice_v2.html\'. Path: /assets/templates/. User: 8821.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 7.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-009',
        sourceType: 'Log',
        createdAt: subHours(now, 8.5).toISOString(),
        requester: 'Auth Proxy',
        org: 'Internal',
        subject: 'Invalid JWT signature detected',
        body: 'Request from 10.0.0.5 rejected. JWT signature does not match. Possible token tampering or key rotation issue.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 8.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-010',
        sourceType: 'Log',
        createdAt: subHours(now, 9.5).toISOString(),
        requester: 'Load Balancer',
        org: 'Internal',
        subject: '503 Service Unavailable: backend-pool',
        body: 'No healthy nodes available in backend-pool. All 3 instances failed health checks. Traffic dropped.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 9.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-011',
        sourceType: 'Log',
        createdAt: subHours(now, 10.5).toISOString(),
        requester: 'Database Agent',
        org: 'Internal',
        subject: 'Slow query detected: SELECT * FROM transactions',
        body: 'Query took 12.5s to execute. Table size: 50M rows. Missing index on \'created_at\'. Impacting dashboard performance.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 10.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'LOG-012',
        sourceType: 'Log',
        createdAt: subHours(now, 11.5).toISOString(),
        requester: 'Security Scanner',
        org: 'Internal',
        subject: 'Vulnerability detected in npm package: lodash',
        body: 'Package: lodash@4.17.15. CVE-2020-8203. Prototype Pollution. Recommendation: Update to 4.17.19.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 11.5).toISOString(), action: 'Received', user: 'System' }]
    },

    // --- SERVICENOW (12) ---
    {
        id: 'SN-001',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1).toISOString(),
        requester: 'Mark Smith',
        org: 'HR Dept',
        subject: 'INC-9901: Payroll portal not loading',
        body: 'The payroll portal is showing a white screen. I tried clearing my browser cache but it didn\'t help. This is for the React-based employee portal.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-002',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.1).toISOString(),
        requester: 'Sarah Jones',
        org: 'Sales',
        subject: 'INC-9902: Cannot access Salesforce SSO',
        body: 'When I click the Salesforce tile in Okta, I get an "Invalid SAML Response" error. My password was recently changed.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.1).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-003',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.2).toISOString(),
        requester: 'Tom Wilson',
        org: 'Marketing',
        subject: 'INC-9903: Website images are broken',
        body: 'The assets on the main landing page are not loading. It looks like the CMS path is wrong. AEM might be misconfigured.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.2).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-004',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.3).toISOString(),
        requester: 'Emily Brown',
        org: 'Finance',
        subject: 'INC-9904: Duplicate charge on customer account',
        body: 'Customer reported being charged twice for the same invoice. I checked the billing system and see two Stripe transactions.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.3).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-005',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.4).toISOString(),
        requester: 'David Lee',
        org: 'Engineering',
        subject: 'INC-9905: Jenkins build pipeline failing',
        body: 'The CI/CD pipeline for the mobile app is failing at the build step. It says "No space left on device" on the build agent.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.4).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-006',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.5).toISOString(),
        requester: 'Jessica Chen',
        org: 'Data Science',
        subject: 'INC-9906: SQL Warehouse query timeout',
        body: 'My BigQuery jobs are timing out after 10 minutes. The data pipeline seems to be lagging behind.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.5).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-007',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.6).toISOString(),
        requester: 'Michael Scott',
        org: 'Management',
        subject: 'INC-9907: How do I reset my MFA?',
        body: 'I got a new phone and need to set up my MFA again. Can someone provide the documentation or help me reset it?',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.6).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-008',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.7).toISOString(),
        requester: 'Pam Beesly',
        org: 'Admin',
        subject: 'INC-9908: Update logo on the homepage',
        body: 'We have a new brand logo. Can the content team update the asset in the CMS and publish it?',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.7).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-009',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.8).toISOString(),
        requester: 'Jim Halpert',
        org: 'Sales',
        subject: 'INC-9909: Mobile app is slow on Android',
        body: 'The app takes forever to load the product catalog on my Samsung phone. Is there a performance issue?',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.8).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-010',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 1.9).toISOString(),
        requester: 'Dwight Schrute',
        org: 'Security',
        subject: 'INC-9910: Unauthorized access attempt',
        body: 'I see a lot of 403 errors in the logs for the admin API. Someone is trying to access it without a valid token.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 1.9).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-011',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 2.0).toISOString(),
        requester: 'Angela Martin',
        org: 'Accounting',
        subject: 'INC-9911: Invoice PDF shows wrong date',
        body: 'The generated invoices have the wrong year on them. This needs to be fixed in the billing template immediately.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 2.0).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'SN-012',
        sourceType: 'ServiceNow',
        createdAt: subDays(now, 2.1).toISOString(),
        requester: 'Stanley Hudson',
        org: 'Sales',
        subject: 'INC-9912: VPN is down',
        body: 'I cannot connect to the company VPN. It says "Server not found". This is affecting all remote workers. SEV1.',
        status: 'New',
        auditTrail: [{ timestamp: subDays(now, 2.1).toISOString(), action: 'Received', user: 'System' }]
    },

    // --- TRICKY AMBIGUOUS EXAMPLES (5) ---
    {
        id: 'TRK-001',
        sourceType: 'Email',
        createdAt: subHours(now, 0.1).toISOString(),
        requester: 'tricky@user.com',
        org: 'Testing',
        subject: 'Payment failed because I couldn\'t login',
        body: 'I was trying to pay my invoice but the login screen kept spinning. I think the auth token expired while I was on the checkout page. Is this a payment issue or a login issue?',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.1).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'TRK-002',
        sourceType: 'Log',
        createdAt: subHours(now, 0.2).toISOString(),
        requester: 'System',
        org: 'Internal',
        subject: 'Mobile app crash during payment',
        body: 'Exception: Crash in com.app.mobile.CheckoutActivity. Error: 500 Internal Server Error from /api/v1/payments. The app crashed because the backend failed.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.2).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'TRK-003',
        sourceType: 'ServiceNow',
        createdAt: subHours(now, 0.3).toISOString(),
        requester: 'Admin',
        org: 'Internal',
        subject: 'INC-8801: Data pipeline slow due to infra latency',
        body: 'The ETL jobs are taking 3x longer. AWS is reporting network latency in the region where our Kubernetes cluster resides. Is this a Data issue or Infra?',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.3).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'TRK-004',
        sourceType: 'Email',
        createdAt: subHours(now, 0.4).toISOString(),
        requester: 'user@web.com',
        org: 'External',
        subject: 'Website shows 404 for mobile users',
        body: 'When I visit the site on my iPhone, I get a 404. On my desktop, it works fine. The React router seems to be failing for mobile redirects.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.4).toISOString(), action: 'Received', user: 'System' }]
    },
    {
        id: 'TRK-005',
        sourceType: 'Log',
        createdAt: subHours(now, 0.5).toISOString(),
        requester: 'Monitor',
        org: 'Internal',
        subject: 'CMS assets failing to load in Mobile App',
        body: 'The Android app is getting 403 Forbidden when trying to fetch images from the AEM content repository. Permissions look okay in CMS.',
        status: 'New',
        auditTrail: [{ timestamp: subHours(now, 0.5).toISOString(), action: 'Received', user: 'System' }]
    }
];
