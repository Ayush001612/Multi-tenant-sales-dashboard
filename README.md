# Multi-Tenant Sales Dashboard (Frontend Assignment)

## Overview

This project is a frontend implementation of a **multi-tenant sales dashboard** designed to simulate a SaaS product used by multiple organizations. The focus of this assignment is on **application structure, tenancy handling, role-based access, and frontend fundamentals**, rather than feature completeness or backend integration.

The application supports multiple tenants, each with users assigned specific roles, and ensures that data and permissions are isolated within each tenant.

---

## Tech Stack

- **Next.js (App Router)** – routing, layouts, and code splitting
- **TypeScript** – type safety and clear domain modeling
- **React** – component-based UI
- **Tailwind CSS** – utility-first styling
- **shadcn/ui (Radix UI)** – accessible, reusable UI components
- **Lucide Icons** – icons and loaders

Authentication and data are mocked as per the assignment scope. No backend is implemented.

---

## Application Structure

The project follows a **feature-based and scalable folder structure** aligned with real-world frontend practices.

```text
app/
├── login/
│   └── page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── leads/
│   │   └── page.tsx
│   ├── call-logs/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx

components/
├── ui/ // Reusable shadcn components
├── Login.tsx 

types/
├── index.ts
```
This structure ensures clear separation of concerns and allows the application to scale easily.

---

## Tenancy Handling

- The application supports **two tenants**:
  - Organization A
  - Organization B
- A user belongs to **only one tenant**
- Tenant selection is handled during login (mocked)
- All data (leads and call logs) is **filtered based on the active tenant**

Switching tenants updates visible data across the application without a page reload.

---

## Role-Based Access Control (RBAC)

Two roles are supported:

### Admin
- Full access to all modules
- Can update lead status
- Can access the Settings page

### Agent
- View-only access
- Cannot edit lead status
- Settings option is hidden or disabled

Role-based permissions are enforced consistently at the UI level.

---

## Core Functional Modules

### Leads Module
- Displays tenant-specific leads
- Columns: Lead Name, Phone Number, Status, Actions
- Status-based filtering
- Admin-only status update functionality
- Agent users see a read-only view

### Call Logs Module
- Displays tenant-specific call logs
- Columns: Lead Name, Date & Time, Duration, Outcome
- Read-only for all roles
- Handles empty states when no data is available

---

## UI States Handling

The application explicitly handles different UI states to improve usability:

### Loading State
- Skeleton loaders are displayed for tables while data is being prepared

### Empty State
- Clear messaging and icons are shown when:
  - No data exists for a tenant
  - Filters return no results

This avoids blank screens and provides clear user feedback.

---

## Client and Server Components

- Layouts and static wrappers are implemented as **Server Components**
- Interactive elements such as forms, filters, and dropdowns are implemented as **Client Components** using the `"use client"` directive
- This approach minimizes unnecessary client-side JavaScript while supporting interactivity where required

---

## Frontend Optimization Approach

Although the project is limited in scope, optimization considerations were intentionally applied:

- **Code Splitting**  
  The Next.js App Router enables automatic route-based code splitting. Each core module (Leads, Call Logs, Settings) is loaded only when accessed.

- **State Management**  
  State is scoped locally or via React Context where appropriate to avoid excessive global re-renders.

- **Avoiding Unnecessary Re-renders**  
  Memoization techniques such as `useMemo`, `useCallback`, and `React.memo` were considered for filtering logic and event handlers, especially in table-heavy views.

- **Lazy Loading (Extensible)**  
  Component-level lazy loading using dynamic imports can be added for data-heavy components if the application scales further.

---

## Design Approach

- UI was designed using **Figma AI** to rapidly prototype layout and responsiveness
- Designs were translated into reusable React components rather than copied one-to-one
- Responsive behavior is handled via Tailwind CSS breakpoints
- Admin and Agent views are visually differentiated where applicable

---

## Notes & Trade-offs

- Authentication and persistence are mocked, as backend implementation was out of scope
- Priority was given to structure, clarity, and scalability over feature depth
- The architecture allows easy extension for:
  - Additional tenants
  - More user roles
  - Backend integration in the future

---

## Conclusion

This project demonstrates a structured approach to building a **multi-tenant, role-aware frontend application** using modern React and Next.js patterns. Emphasis was placed on clean architecture, usability, and scalability while remaining aligned with the assignment requirements.
