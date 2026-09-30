# Bibliotech — Modern Single-Page Library Management System

A responsive, high-performance, single-page Library Management Application built strictly with **pure HTML5, CSS3, and modern Vanilla JavaScript (ES6+)**. No external libraries, node packages, or backend servers required.

---

## 🌟 Features Overview

### 1. 📊 Executive Dashboard & Analytics
- **Live Metrics**: Total catalog titles, total copies, copies currently on shelves, active loans, overdue returns, and registered patrons.
- **Dynamic Genre Bar Chart**: Visualizes inventory distribution across categories.
- **Interactive Circulation Donut Chart**: Shows checked-out vs. available copy ratios in real time.
- **Recent Activity Table**: Real-time log of the latest borrowing and returning transactions.
- **Pending Attention List**: Immediate visibility into overdue loans with calculated fines and loans due within 48 hours.

### 2. 📚 Book Catalog Management (Full CRUD)
- **Multi-View Modes**: Switch between responsive **Grid Cards** and a dense **Data Table**.
- **Real-Time Instant Search**: Filter instantly across Title, Author, ISBN, and Category.
- **Category & Availability Filters**: Filter by genre (Computer Science, Fiction, Philosophy, etc.) and availability status.
- **Sorting Options**: Sort by Title (A-Z, Z-A), Author, Rating, or Publication Year.
- **Add & Edit Book Modal**: Form with input validation, customizable cover color gradients, ISBN-13, and copy quantity management.
- **Book Details Modal**: Comprehensive synopsis, metadata, shelf availability, and instant borrow action.
- **Protected Deletion**: Safe deletion dialog preventing removal of titles with active loans.

### 3. 🔄 Circulation & Loan Management
- **Circulation Tabs**: Filter between **Active Loans**, **Overdue Items**, **Return History**, and **All Records**.
- **Issue Book Flow**:
  - Automatically filters only books with available shelf stock.
  - Automatically sets default 14-day loan period.
  - Decrements book inventory immediately.
- **Return Book Flow**:
  - Automatically calculates late penalty fees ($0.50/day overdue).
  - Restores shelf copy quantity immediately.
- **Renew Loan**: Easily extend any active loan by +7 days with a single click.

### 4. 👥 Member / Patron Directory
- **Patron Profiles**: Visual cards with initials avatar, role badge (Student, Faculty, Researcher, Community), contact info, and registration date.
- **Active Loans Tracker**: Visual counter badge showing active books borrowed per patron and overdue warnings.
- **Add, Edit, and Delete Members**: Validated patron management with protection against deleting patrons with outstanding loans.

### 5. 💾 Offline Persistence & Data Management
- **Local Storage Engine**: All catalog changes, members, and transactions persist automatically in your browser.
- **Export Backup**: Download your entire database as a structured JSON file at any time.
- **Import Backup**: Restore from any saved JSON backup with automatic structure validation.
- **Reset to Curated Demo**: Restore sample books and active loans with one click.
- **Wipe Database**: Secure wipe utility with confirmation dialog.

### 6. 🎨 User Experience & Design
- **Dark Mode & Light Mode**: Smooth theme toggling with preference stored in local storage.
- **Responsive Navigation**: Desktop sidebar and mobile slide-out drawer with backdrop blur.
- **Toast Notifications**: Feedback messages for every action (add, edit, return, issue, delete).
- **Zero External Dependencies**: Works 100% offline.

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser:

### Option A: Direct Open
Double-click `index.html` or drag it into any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option B: Local HTTP Server (Optional)
If you prefer running via a local development server:
```bash
# Using Python:
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📁 File Structure

```text
RAG-project/
├── index.html     # Semantic single-page HTML5 layout and modal dialogs
├── style.css      # CSS variables, modern light/dark styling, charts & responsive grid
├── app.js         # Vanilla JS application state, CRUD operations, and circulation logic
└── README.md      # Documentation and usage guide
```
