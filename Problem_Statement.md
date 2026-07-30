# Problem Statement

## 1. Title

Visitor Entry & Gate Pass Management System

## 2. Domain

Campus / Office Security & Access Control

## 3. Who is the user? (2-3 user types, with roles)

- **Security Staff** (Guard / Reception): Registers visitors, issues gate passes, and records entry/exit.
- **Admin**: Manages staff accounts, views complete reports, and monitors all activity.
- **Visitor** (optional limited access): Can only view the status of their own pass.

## 4. What problem are we solving? (3-5 sentences, real-life example)

Most colleges and offices still use paper registers or informal verbal permission for visitor entry. This creates serious problems: no reliable record of who entered, difficulty tracking how long a visitor stayed, risk of unauthorized people entering, and no easy way for management to audit past visits.  
For example, when a parent comes to meet a student or a delivery person arrives, the security guard has no digital system to quickly issue a time-bound pass and later confirm the exit. This leads to security gaps and wasted time.  
A simple digital system can replace the paper register, give every visitor a unique time-bound pass, and give admins full visibility and audit capability.

## 5. Proposed Solution (what the application will do, feature-wise)

- Visitor registration with name, phone, purpose, and host details
- Automatic generation of a unique Gate Pass (pass number + optional QR code)
- Security staff can verify the pass and mark entry/exit with timestamps
- Admin dashboard showing today’s active visitors and pending exits
- Role-based access control (Admin vs Security Staff)
- Search and filter historical visitor records
- Basic email notification when a pass is issued (3rd-party integration scope)
- Clean entry logs for audit and efficient validation of pass status

## 6. Core Entities / Database Tables (list all, minimum 5)

1. **User** – id, name, email, password, role, created_at
2. **Visitor** – id, name, phone, email, purpose, host_name, created_at
3. **GatePass** – id, pass_number, visitor_id, issued_by, valid_from, valid_till, status
4. **EntryLog** – id, gate_pass_id, entry_time, exit_time, verified_by
5. **AuditLog** – id, action, performed_by, details, timestamp

## 7. User Roles & Permissions (minimum 2 distinct roles)

- **SECURITY**: Can register visitors, issue gate passes, mark entry and exit
- **ADMIN**: Full access – manage users, view all reports, configure rules, delete records
- **VISITOR** (optional): View only their own pass status

## 8. Success Criteria

- A security staff member can register a visitor and issue a gate pass in under 60 seconds.
- Every entry and exit is recorded with exact timestamp and the staff member who verified it.
- Admin can see today’s active visitors and pending exits on a single dashboard.
- System prevents reuse of an already-exited or expired pass.

## 9. Out of Scope

- Real-time GPS tracking of visitors inside the campus
- Integration with biometric devices or physical turnstiles
- Native mobile app (web application only)
- Payment collection for visitor passes
- Face recognition or advanced AI features (can be added later as enhancement)

## 10. Chosen Track: Java (Spring Boot)
