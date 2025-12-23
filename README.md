# AI Bug Router

AI Bug Router is an intelligent support ticket intake and routing system. It uses AI to analyze incoming support items from various sources (Emails, Logs, ServiceNow) and automatically predicts the appropriate team, severity level, and provides a confidence score for each prediction.

## 🚀 Features

- **Intelligent Intake Inbox**: Centralized view for all incoming support items with advanced filtering by Team, Severity, and Status.
- **AI-Powered Predictions**: Automatically triages tickets by predicting:
  - **Target Team**: Route to Payments, Identity, Mobile, Web, Infra, etc.
  - **Severity Level**: Categorizes from Sev1 to Sev4.
  - **Confidence Score**: Visual indicators of AI prediction reliability.
- **Triage Engine**: A rule-based simulation engine that mimics AI decision-making based on ticket content, metadata, and configurable triage rules.
- **Audit Trail**: Complete history of all actions taken on a ticket, including AI triage results and manual routing decisions.
- **Detailed Ticket Analysis**: Deep dive into individual tickets with AI reasoning, sentiment analysis, and suggested next steps.
- **Interactive Dashboard**: Real-time analytics on ticket volume, team distribution, and AI routing accuracy.
- **Demo Simulation**: Built-in demo script to showcase the AI routing workflow in real-time.

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Ant Design (Antd)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-bug-router
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components`: Reusable UI components and layout.
- `src/context`: Global state management using React Context.
- `src/pages`: Main application pages (Inbox, Detail, Dashboard, Settings).
- `src/types`: TypeScript interfaces and type definitions.
- `src/data`: Mock data for the demo.
- `src/utils`: Helper functions and utilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
