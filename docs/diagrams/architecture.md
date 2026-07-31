# System Architecture

## Architecture Diagram

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Hosting: Vercel)"]
        Browser["React Single Page Application<br/>(Vite + Tailwind CSS)"]
    end

    subgraph BackendLayer ["Backend Service (Hosting: Render)"]
        API["Spring Boot REST API<br/>(Java 17 + Spring Security & JWT)"]
        Notification["SMS / Email Notification Service<br/>(Host Approval Notifications)"]
    end

    subgraph DatabaseLayer ["Data Layer (Hosting: Railway)"]
        MySQL[("MySQL Relational Database<br/>(Production)")]
        H2[("H2 In-Memory Database<br/>(Local Development)")]
    end

    Browser -->|"HTTPS / REST (JSON API)"| API
    API -->|"Async Notifications"| Notification
    API -->|"JPA / Hibernate ORM"| MySQL
    API -.->|"Local Dev Profile"| H2
```

## Component Boundaries

1. **Frontend Client (Vercel)**:
   - React SPA providing distinct dashboard UI views for **Admin**, **Security Guard**, and **Host/Employee**.
   - Handles client-side routing, JWT token storage, and responsive form submissions.

2. **Backend API (Render)**:
   - Spring Boot application exposing secure RESTful API endpoints.
   - Handles role-based authentication/authorization, business logic, validation, and host approval workflows.
   - Dispatches automated SMS/Email notifications to hosts upon visitor arrival.

3. **Database Storage (Railway / H2)**:
   - **Production**: MySQL database hosted on Railway for persistent storage of users, visitors, gate passes, entry logs, and blacklists.
   - **Development**: H2 in-memory database enabled locally with the `dev` profile for instant offline testing and prototyping.
