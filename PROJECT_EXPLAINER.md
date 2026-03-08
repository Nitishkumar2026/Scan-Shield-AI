# 🧠 AI Scam Shield X: Comprehensive System Explainer

Welcome to the internal documentation for **AI Scam Shield X**. This project is a multi-layered, enterprise-grade cybersecurity platform designed for national-level threat intelligence and personal protection from scams. 

This document explains the architecture, the different modules, and how they function together to build a robust defense system.

---

## 📂 Project Structure Overview

The project follows a monorepo architecture, separating the concerns of the user interface, backend logic, and infrastructure:

- **`/app`**: The frontend built with **React 19**, **TypeScript**, and **Vite**. It handles all user interactions and visualizations.
- **`/backend`**:
  - `api-gateway`: The primary entry point for the frontend. Handles JWT authentication, rate limiting, and routes requests to microservices.
  - `ai-service`: The "brain" of the platform. Designed to process natural language (like SMS transcripts) and detect fraud patterns.
  - `db`: Contains the database schemas (`schema.sql`) for PostgreSQL/Neo4j.
- **`/docker`**: Contains `docker-compose.yml` for orchestrating all services (frontend, backend, databases) locally during development.

---

## 🎨 Frontend Architecture (`/app/src`)

The frontend is a high-performance, single-page application (SPA). Here's how the different parts work:

### 1. **Main Layout & Shell**
- **`App.tsx`**: The core component that integrates all sections. It uses a custom scrolling mechanism to provide a fluid, "cyber-themed" experience.
- **`Navigation.tsx`**: A reactive navigation bar that tracks the user's scroll position and provides quick access to different analysis tools.
- **`CustomCursor.tsx`**: A premium UI element that uses `framer-motion` to create a reactive, lagging precision cursor that "wows" the user.
- **`index.css`**: Defines the "Cyber-Grid" theme, including custom glow effects, futuristic borders, and typography.

### 2. **Core Defensive Tools (The "Brain" of the UI)**
Each of these modules is located in `/src/sections`:
- **`CallAnalysis.tsx`**: Simulation of real-time voice monitoring. It displays transcripts and uses AI scoring to warn users about suspicious banking or lottery-related calls.
- **`SMSScanner.tsx`**: Allows users to paste or upload SMS content. It breaks down the message into "Intent," "Entities," and "Threat Scores."
- **`UPIAnalyzer.tsx`**: A specialized tool for the Indian ecosystem. It simulates the verification of UPI IDs against known fraud history databases.

### 3. **Intelligence & Visualizations**
- **`ThreatHeatmap.tsx`**: A geographic visualization of India showing real-time scam incidents. It uses SVG and React state to show clusters of high-risk activity.
- **`FraudNetwork.tsx`**: An interactive graph showing how one scammer might be linked to multiple fake bank accounts, helping users see the "big picture."
- **`Analytics.tsx`**: Provides raw data visualizations (using `recharts`) showing the number of threats blocked, network load, and AI performance.

### 4. **Management & Admin**
- **`FamilyGuardian.tsx`**: A dedicated section to manage other users (elderly parents/children), showing their protection status and recent alerts.
- **`AdminPortal.tsx`**: A high-level dashboard for banks and government officials to monitor national-level traffic and manage the threat database.
- **`CommunityReports.tsx`**: A crowd-sourced platform where users can submit new scam techniques to help the AI learn faster.

---

## ⚙️ Backend Logic & Workflow

### **The Request Lifecycle**
1. **User Action**: A user pastes a suspicious SMS into the `SMSScanner`.
2. **Gateway**: The frontend sends a `POST` request to the `api-gateway`.
3. **Security**: The gateway verifies the user's JWT token and ensures they aren't exceeding rate limits.
4. **AI Processing**: The gateway forwards the message to the `ai-service`.
5. **Detection**: The AI service (FastAPI-based) runs the text through NLP models to identify scam keywords, phishing URLs, and social engineering patterns.
6. **Database**: If a new threat is found, it's logged in the `db` for the heatmap and analytics.
7. **Response**: The results are returned to the user in the UI with a "Risk Score" (e.g., 90% High Risk).

---

## 🛡️ Security Features
- **Isolation**: Each service runs in its own container, ensuring that a failure in the GUI doesn't crash the detection engine.
- **Redundancy**: The platform is designed to scale; multiple instances of `ai-service` can run behind a load balancer.
- **Compliance**: The data patterns follow CERT-In guidelines for threat reporting.

---

## 🛠️ Deployment & Maintenance
- **Netlify**: The frontend (`/app`) is optimized for static hosting on Netlify.
- **CI/CD**: The project is structured for automatic builds upon pushing to the `main` branch.
- **Monitoring**: Integration with Prometheus/Grafana is pre-configured in the docker setup for real-time infrastructure health checks.

---

**Built with 💙 for the High-Fidelity Cyber Defense Hub.**
