# Visitor Entry & Gate Pass Management System
> Streamlined campus and facility access control with real-time pass validation and entry logging.

## Overview

The **Visitor Entry & Gate Pass Management System** is a modern web application designed for educational campuses and corporate facilities to replace manual paper registers. It enables digital visitor registration, instant host notifications for approval, role-based access control, and rapid guard check-in/check-out verification using phone number lookups.

---

## Tech Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) + Tailwind CSS | Dynamic user dashboard for guards, hosts, and admins |
| **Backend** | Java 17 + Spring Boot 3.x | RESTful API backend service with Spring Security & JPA |
| **Database** | MySQL (Prod) / H2 (Dev) | Relational persistence for users, passes, and logs |
| **Authentication** | JWT (JSON Web Tokens) | Secure stateless role-based authentication |

---

## Getting Started

### Prerequisites
- **Java JDK 17+**
- **Apache Maven 3.8+**
- **Node.js 18+** & `npm`
- **MySQL 8.0+** (Optional for dev, H2 in-memory is default)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/visitor-gate-pass-system.git
cd visitor-gate-pass-system
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API service runs at `http://localhost:8080`.
Access the H2 Console at `http://localhost:8080/h2-console`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The React application starts at `http://localhost:5173`.

---

## Folder Structure

```
visitor-gate-pass-system/
├── backend/                  # Spring Boot 3.x Backend Application
│   ├── src/main/java/com/college/visitorgatepass/
│   │   ├── config/           # Security and Web Configurations
│   │   ├── controller/       # REST API Controllers
│   │   ├── dto/              # Request & Response Data Transfer Objects
│   │   ├── exception/        # Global Exception Handlers
│   │   ├── model/entity/     # JPA Entity Classes
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   └── service/          # Business Logic Services
│   └── pom.xml               # Maven Build Dependencies
├── frontend/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── api/              # Axios Client & API Endpoints
│   │   ├── components/       # Reusable UI Components
│   │   ├── context/          # React Context State Management
│   │   └── pages/            # View Pages & Dashboards
│   └── package.json
├── docs/                     # Documentation & Architecture Diagrams
│   └── diagrams/             # DBML Schema & Mermaid System Architecture
├── .env.example              # Environment Variable Template
├── CHANGELOG.md              # Version History
├── LICENSE                   # MIT License
├── Problem_Statement.md      # Detailed Project Requirements
└── README.md                 # Main Documentation
```

---

## Architecture & Database Design

- **ER Schema (DBML)**: [docs/diagrams/schema.dbml](file:///d:/capstone/visitor-gate-pass-system/docs/diagrams/schema.dbml)
- **System Architecture**: [docs/diagrams/architecture.md](file:///d:/capstone/visitor-gate-pass-system/docs/diagrams/architecture.md)

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

---

## Author

**Sivaganesh L**  
B.Tech IT - III (Pre-Final Year)  
J.J. College of Engineering and Technology  
*Capstone Project Team (Domain #125 - Security / Facility Management)*
