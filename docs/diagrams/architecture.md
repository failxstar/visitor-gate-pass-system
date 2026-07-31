# System Architecture

## System Architecture Diagram

```mermaid
flowchart TB
    %% -------------------------------------------------------------
    %% CLIENT LAYER
    %% -------------------------------------------------------------
    subgraph ClientLayer ["Client Layer (React Frontend SPA)"]
        direction LR
        subgraph ReactApp ["React Single Page Application (Vite + Tailwind)"]
            UI_Auth["Login / Register"]
            UI_Dash["Dashboard"]
            UI_Vis["Visitor Management"]
            UI_Pass["Gate Pass Request"]
            UI_Stat["Pass Status"]
            UI_Rep["Reports"]
        end
    end

    %% -------------------------------------------------------------
    %% BACKEND / API LAYER
    %% -------------------------------------------------------------
    subgraph BackendLayer ["Backend / API Layer (Spring Boot REST API)"]
        direction LR
        subgraph SpringApp ["Spring Boot Core Application"]
            M_Auth["Auth Module<br/>(User & Role)"]
            M_Vis["Visitor Module"]
            M_Pass["Gate Pass Module"]
            M_Log["Entry Log Module"]
            M_Black["Blacklist Module"]
            M_Notif["Notification Module"]
        end

        subgraph RestAPI ["REST API Endpoints"]
            EP1["/api/auth/**"]
            EP2["/api/visitors/**"]
            EP3["/api/passes/**"]
            EP4["/api/entries/**"]
            EP5["/api/reports/**"]
            EP6["/api/blacklist/**"]
        end
    end

    %% -------------------------------------------------------------
    %% DATABASE LAYER
    %% -------------------------------------------------------------
    subgraph DatabaseLayer ["Database Layer (Relational Storage)"]
        subgraph MySQLDB ["MySQL Database / H2 Dev DB"]
            T1["users"]
            T2["visitors"]
            T3["gate_passes"]
            T4["entry_logs"]
            T5["blacklist"]
        end
    end

    %% -------------------------------------------------------------
    %% EXTERNAL SERVICES
    %% -------------------------------------------------------------
    subgraph ExternalServices ["External Services"]
        EmailService["Email Service (SendGrid)<br/>• Send approval / rejection emails"]
        MapsAPI["Maps API (Google Maps)<br/>• Location for entry points (Optional)"]
        AIService["AI Service (OpenAI API)<br/>• Visitor behavior & risk analysis (Future)"]
        SMSService["SMS Service (Twilio)<br/>• Send instant SMS alerts (Optional)"]
    end

    %% -------------------------------------------------------------
    %% HOSTING BOUNDARIES
    %% -------------------------------------------------------------
    subgraph HostingBoundaries ["Hosting Boundary & Deployment"]
        direction LR
        Host_Vercel["Frontend Hosting<br/>▲ Vercel (React App)"]
        Host_Render["Backend Hosting<br/>☁ Render (Spring Boot API)"]
        Host_DB["Database Hosting<br/>⚡ Clever Cloud / Railway (MySQL)"]
    end

    %% Communications & Data Flow
    ReactApp -->|"HTTPS / JSON REST API"| RestAPI
    RestAPI <--> SpringApp
    SpringApp -->|"JDBC / JPA Hibernate"| MySQLDB

    SpringApp -->|"SMTP / API"| EmailService
    SpringApp -->|"HTTPS / API"| MapsAPI
    SpringApp -->|"HTTPS / API"| AIService
    SpringApp -->|"HTTPS / API"| SMSService

    ReactApp -.-> Host_Vercel
    SpringApp -.-> Host_Render
    MySQLDB -.-> Host_DB
```

---

## Component Boundaries & System Summary

1. **Client Layer (React Frontend)**:
   - Built with **React** (Vite + Vanilla/Tailwind CSS).
   - Provides role-tailored dashboards for **Admin**, **Security Guard**, and **Host/Employee**.
   - Handles client-side routing, JWT authentication headers, and responsive forms.

2. **Backend / API Layer (Spring Boot)**:
   - **Java 17** application exposing modular REST APIs (`/api/auth/**`, `/api/visitors/**`, `/api/passes/**`, `/api/entries/**`, `/api/reports/**`, `/api/blacklist/**`).
   - Core Modules: `Auth`, `Visitor`, `Gate Pass`, `Entry Log`, `Blacklist`, and `Notification`.
   - Security: Spring Security + JWT authentication and role-based access control (RBAC).

3. **Database Layer (MySQL / H2)**:
   - Stores core persistent relational tables (`users`, `visitors`, `gate_passes`, `entry_logs`, `blacklist`).
   - Local development uses **H2 in-memory DB**; production uses **MySQL** on Railway / Clever Cloud.

4. **External Integrations**:
   - **SendGrid / SMTP**: Automated email dispatches to host employees upon visitor arrival.
   - **Twilio SMS**: SMS notifications to visitor and host phones.
   - **Google Maps & AI API**: Optional entry-point location mapping and risk prediction enhancements.

5. **Deployment & Hosting Infrastructure**:
   - **Frontend**: Deployed on **Vercel**.
   - **Backend API**: Deployed on **Render** / Railway via GitHub CI/CD.
   - **Database**: Hosted on **Clever Cloud** / Railway.
