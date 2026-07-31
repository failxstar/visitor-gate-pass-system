# Problem Statement

## 1. Title
Visitor Entry & Gate Pass Management System

## 2. Domain
Security / Facility Management

## 3. Users (3 roles)
- **Admin**: Manages users, configures system rules, and views all reports and logs.
- **Security Guard**: Registers visitors, verifies gate passes, and handles real-time check-in and check-out at entry/exit points.
- **Host / Employee**: Approves or rejects pass requests for visitors coming to meet them.

## 4. Problem
Manual visitor registers are slow, insecure, and give no searchable history or real-time visibility of who is on premises. When guests or vendors arrive, guards must manually enter details into paper logs or contact employees verbally, creating long queues, human error, and security risks with untracked visitors.

## 5. Proposed Solution
A web-based digital Visitor Entry & Gate Pass Management System featuring digital pass issuance, a host approval workflow, real-time entry/exit logging, and automated blacklist checks to prevent unauthorized entry.

## 6. Core Entities (min 5)
1. **User** – System accounts with role-based permissions (Admin, Guard, Host).
2. **Visitor** – Visitor identity details, phone number, and ID proof credentials.
3. **GatePass** – Time-bound digital pass associated with a visitor, host, and purpose, with status tracking.
4. **EntryLog** – Timestamped entry and exit audit log recorded by guards.
5. **Blacklist** – Record of barred visitors and security restriction reasons.

## 7. Roles & Permissions
- **Admin**: Full administrative access to manage users, view all logs, and oversee facility security.
- **Security Guard**: Register visitors, perform phone number lookups, issue digital passes, and mark check-in/check-out.
- **Host**: Receive notifications, approve or reject pass requests from visitors.

## 8. Success Criteria
A guard should be able to check a visitor in or out in under 30 seconds using only a phone number lookup.

## 9. Out of Scope
- No biometric or facial recognition integration.
- No physical hardware turnstile / barrier gate integration.
- No multi-branch or multi-site facility support (single site focus).

## 10. Chosen Track
Java (Spring Boot) + React
