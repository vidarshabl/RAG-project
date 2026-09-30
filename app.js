/**
 * BIBLIOTECH - Single Page Frontend Library Management Application
 * Pure Vanilla JavaScript (ES6+) with localStorage persistence
 */

(function () {
  'use strict';

  // =========================================================================
  // CONSTANTS & SEED DATA
  // =========================================================================
  const STORAGE_KEY = 'BIBLIOTECH_DATA_V2';
  const THEME_KEY = 'BIBLIOTECH_THEME';
  const DAILY_OVERDUE_FINE = 0.50; // $0.50 per day past due date

  const INITIAL_SEED_BOOKS = [
    {
      id: 'b-101',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Computer Science',
      year: 2008,
      totalCopies: 5,
      availableCopies: 3,
      rating: 4.5,
      coverAccent: 'gradient-indigo',
      description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost due to poorly written code.',
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: 'b-102',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '978-1449373320',
      category: 'Computer Science',
      year: 2017,
      totalCopies: 4,
      availableCopies: 2,
      rating: 5,
      coverAccent: 'gradient-cyan',
      description: 'Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability.',
      createdAt: '2024-01-12T11:30:00Z'
    },
    {
      id: 'b-103',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      isbn: '978-0062316097',
      category: 'History',
      year: 2015,
      totalCopies: 6,
      availableCopies: 5,
      rating: 4.5,
      coverAccent: 'gradient-amber',
      description: 'One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one. Homo sapiens. How did our species succeed in the battle for dominance?',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 'b-104',
      title: 'Dune: The Masterpiece Sci-Fi Novel',
      author: 'Frank Herbert',
      isbn: '978-0441172719',
      category: 'Fiction',
      year: 1965,
      totalCopies: 4,
      availableCopies: 1,
      rating: 5,
      coverAccent: 'gradient-rose',
      description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.',
      createdAt: '2024-01-18T14:20:00Z'
    },
    {
      id: 'b-105',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      isbn: '978-0374533557',
      category: 'Philosophy',
      year: 2011,
      totalCopies: 3,
      availableCopies: 2,
      rating: 4,
      coverAccent: 'gradient-violet',
      description: 'Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower and more logical.',
      createdAt: '2024-01-22T16:00:00Z'
    },
    {
      id: 'b-106',
      title: 'Atomic Habits: Tiny Changes, Remarkable Results',
      author: 'James Clear',
      isbn: '978-0735211292',
      category: 'Business',
      year: 2018,
      totalCopies: 7,
      availableCopies: 6,
      rating: 5,
      coverAccent: 'gradient-emerald',
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits and break bad ones.',
      createdAt: '2024-01-25T08:45:00Z'
    },
    {
      id: 'b-107',
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      category: 'Design',
      year: 2013,
      totalCopies: 3,
      availableCopies: 0,
      rating: 4.5,
      coverAccent: 'gradient-indigo',
      description: 'Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault lies in product design.',
      createdAt: '2024-01-28T12:00:00Z'
    },
    {
      id: 'b-108',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0060935467',
      category: 'Literature',
      year: 1960,
      totalCopies: 5,
      availableCopies: 4,
      rating: 5,
      coverAccent: 'gradient-amber',
      description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, exploring compassion, empathy, and racial injustice.',
      createdAt: '2024-02-01T15:30:00Z'
    }
  ];

  const INITIAL_SEED_MEMBERS = [
    {
      id: 'm-201',
      name: 'Elena Rostova',
      email: 'elena.rostova@university.edu',
      phone: '+1 (555) 349-2810',
      role: 'Student',
      joinedDate: '2023-09-01',
      status: 'Active'
    },
    {
      id: 'm-202',
      name: 'Dr. Marcus Vance',
      email: 'm.vance@facultylab.org',
      phone: '+1 (555) 482-9104',
      role: 'Faculty',
      joinedDate: '2022-04-15',
      status: 'Active'
    },
    {
      id: 'm-203',
      name: 'Sarah Jenkins',
      email: 's.jenkins@innovate.co',
      phone: '+1 (555) 791-3829',
      role: 'Researcher',
      joinedDate: '2023-11-20',
      status: 'Active'
    },
    {
      id: 'm-204',
      name: 'David K. Miller',
      email: 'david.miller@civicmail.net',
      phone: '+1 (555) 602-4412',
      role: 'Community',
      joinedDate: '2024-01-05',
      status: 'Active'
    }
  ];

  // Helper to format date offset in YYYY-MM-DD
  function getDateOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  const INITIAL_SEED_LOANS = [
    {
      id: 'ln-301',
      bookId: 'b-107',
      bookTitle: 'The Design of Everyday Things',
      memberId: 'm-201',
      memberName: 'Elena Rostova',
      issueDate: getDateOffset(-20),
      dueDate: getDateOffset(-6), // 6 days overdue
      returnDate: null,
      status: 'active'
    },
    {
      id: 'ln-302',
      bookId: 'b-101',
      bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      memberId: 'm-202',
      memberName: 'Dr. Marcus Vance',
      issueDate: getDateOffset(-10),
      dueDate: getDateOffset(4), // due in 4 days
      returnDate: null,
      status: 'active'
    },
    {
      id: 'ln-303',
      bookId: 'b-104',
      bookTitle: 'Dune: The Masterpiece Sci-Fi Novel',
      memberId: 'm-203',
      memberName: 'Sarah Jenkins',
      issueDate: getDateOffset(-12),
      dueDate: getDateOffset(2), // due in 2 days
      returnDate: null,
      status: 'active'
    },
    {
      id: 'ln-304',
      bookId: 'b-102',
      bookTitle: 'Designing Data-Intensive Applications',
      memberId: 'm-204',
      memberName: 'David K. Miller',
      issueDate: getDateOffset(-5),
      dueDate: getDateOffset(9),
      returnDate: null,
      status: 'active'
    },
    {
      id: 'ln-305',
      bookId: 'b-106',
      bookTitle: 'Atomic Habits: Tiny Changes, Remarkable Results',
      memberId: 'm-201',
      memberName: 'Elena Rostova',
      issueDate: getDateOffset(-30),
      dueDate: getDateOffset(-16),
      returnDate: getDateOffset(-15), // returned on time
      status: 'returned'
    }
  ];

  // =========================================================================
  // APPLICATION STATE
  // =========================================================================
  const state = {
    currentView: 'dashboard',
    books: [],
    members: [],
    loans: [],
    bookViewMode: 'grid', // 'grid' or 'table'
    bookFilter: {
      search: '',
      category: 'ALL',
      status: 'ALL',
      sortBy: 'title_asc'
    },
    loanFilter: {
      statusTab: 'ACTIVE', // 'ACTIVE', 'OVERDUE', 'RETURNED', 'ALL'
      search: ''
    },
    memberFilter: {
      search: '',
      role: 'ALL'
    }
  };

  // =========================================================================
  // PERSISTENCE MANAGER
  // =========================================================================
  function loadDatabase() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.books && parsed.members && parsed.loans) {
          state.books = parsed.books;
          state.members = parsed.members;
          state.loans = parsed.loans;
          updateStorageBar();
          return;
        }
      }
    } catch (err) {
      console.warn('Error loading localStorage data:', err);
    }
    // Seed default if empty or invalid
    resetToDemoData(false);
  }

  function saveDatabase() {
    try {
      const payload = {
        books: state.books,
        members: state.members,
        loans: state.loans,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      updateStorageBar();
      updateNavCounters();
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
      showToast('Error saving changes to local storage', 'error');
    }
  }

  function resetToDemoData(showNotification = true) {
    state.books = JSON.parse(JSON.stringify(INITIAL_SEED_BOOKS));
    state.members = JSON.parse(JSON.stringify(INITIAL_SEED_MEMBERS));
    state.loans = JSON.parse(JSON.stringify(INITIAL_SEED_LOANS));
    saveDatabase();
    if (showNotification) {
      showToast('Sample library data restored successfully!', 'success');
      renderAllViews();
    }
  }

  function wipeAllDatabase() {
    state.books = [];
    state.members = [];
    state.loans = [];
    saveDatabase();
    showToast('All records have been cleared.', 'info');
    renderAllViews();
  }

  function updateStorageBar() {
    const raw = localStorage.getItem(STORAGE_KEY) || '';
    const bytes = new Blob([raw]).size;
    const kb = (bytes / 1024).toFixed(1);
    // Typical localStorage limit is ~5MB (5120 KB)
    const pct = Math.min(100, Math.max(5, Math.round((bytes / (5 * 1024 * 1024)) * 100)));
    const fillEl = document.getElementById('storage-fill-bar');
    const statusEl = document.getElementById('storage-status');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (statusEl) statusEl.textContent = `${kb} KB (${pct}%)`;
  }

  // =========================================================================
  // THEME MANAGEMENT
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const textEl = document.getElementById('theme-text');
    if (textEl) {
      textEl.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  // =========================================================================
  // VIEW NAVIGATION CONTROLLER
  // =========================================================================
  const VIEW_TITLES = {
    dashboard: { title: 'Dashboard', sub: 'Real-time statistics & library operations' },
    books: { title: 'Book Catalog', sub: 'Browse, manage, and catalog library collection' },
    loans: { title: 'Circulation & Loans', sub: 'Issue books, manage returns, and track due dates' },
    members: { title: 'Member Directory', sub: 'Patrons, students, faculty, and research members' },
    settings: { title: 'Data & Settings', sub: 'Manage backup, export records, and database options' }
  };

  function switchView(viewName) {
    if (!VIEW_TITLES[viewName]) return;
    state.currentView = viewName;

    // Update active nav items
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update view containers
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update topbar heading
    const titleEl = document.getElementById('page-title');
    const subEl = document.getElementById('page-subtitle');
    if (titleEl) titleEl.textContent = VIEW_TITLES[viewName].title;
    if (subEl) subEl.textContent = VIEW_TITLES[viewName].sub;

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Trigger re-render of active view
    if (viewName === 'dashboard') renderDashboard();
    else if (viewName === 'books') renderBooks();
    else if (viewName === 'loans') renderLoans();
    else if (viewName === 'members') renderMembers();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavCounters() {
    const bookCountEl = document.getElementById('nav-book-count');
    if (bookCountEl) bookCountEl.textContent = state.books.length;

    // Overdue count
    const overdueCount = state.loans.filter(l => isLoanOverdue(l)).length;
    const overdueBadge = document.getElementById('nav-overdue-count');
    if (overdueBadge) {
      if (overdueCount > 0) {
        overdueBadge.textContent = overdueCount;
        overdueBadge.style.display = 'inline-block';
      } else {
        overdueBadge.style.display = 'none';
      }
    }
  }

  // =========================================================================
  // MODAL CONTROLLER
  // =========================================================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  function confirmDialog(title, message, onConfirm) {
    const titleEl = document.getElementById('confirm-modal-title');
    const msgEl = document.getElementById('confirm-modal-message');
    const btn = document.getElementById('confirm-modal-btn');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    // Clone button to strip existing event listeners cleanly
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      closeModal('modal-confirm');
      if (typeof onConfirm === 'function') onConfirm();
    });

    openModal('modal-confirm');
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // =========================================================================
  // UTILITY HELPERS
  // =========================================================================
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function generateId(prefix = 'item') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  }

  function isLoanOverdue(loan) {
    if (loan.status === 'returned' || loan.returnDate) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return loan.dueDate < todayStr;
  }

  function calculateLoanFine(loan) {
    if (loan.status === 'returned') return 0;
    const todayStr = new Date().toISOString().split('T')[0];
    if (loan.dueDate >= todayStr) return 0;

    const due = new Date(loan.dueDate);
    const now = new Date(todayStr);
    const diffDays = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? (diffDays * DAILY_OVERDUE_FINE) : 0;
  }

  function renderStars(rating = 5) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += '★';
      } else if (i === fullStars && hasHalf) {
        starsHtml += '★';
      } else {
        starsHtml += '☆';
      }
    }
    return `<span class="book-stars">${starsHtml} <span class="book-rating-num">${rating.toFixed(1)}</span></span>`;
  }

  // =========================================================================
  // DASHBOARD RENDERER & ANALYTICS
  // =========================================================================
  function renderDashboard() {
    const totalTitles = state.books.length;
    const totalCopies = state.books.reduce((acc, b) => acc + (Number(b.totalCopies) || 0), 0);
    const availableCopies = state.books.reduce((acc, b) => acc + (Number(b.availableCopies) || 0), 0);
    const loanedCopies = totalCopies - availableCopies;

    const activeLoans = state.loans.filter(l => !l.returnDate && l.status !== 'returned');
    const overdueLoans = activeLoans.filter(l => isLoanOverdue(l));

    let totalFines = 0;
    overdueLoans.forEach(l => {
      totalFines += calculateLoanFine(l);
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const twoDaysLaterStr = getDateOffset(2);
    const dueSoonCount = activeLoans.filter(l => !isLoanOverdue(l) && l.dueDate <= twoDaysLaterStr).length;

    const totalMembers = state.members.length;
    const uniqueBorrowerIds = new Set(activeLoans.map(l => l.memberId));

    // Update Metric Cards
    const titleEl = document.getElementById('dash-total-titles');
    const totalCopiesEl = document.getElementById('dash-total-copies');
    const availBooksEl = document.getElementById('dash-avail-books');
    const activeLoansEl = document.getElementById('dash-active-loans');
    const dueSoonEl = document.getElementById('dash-due-soon');
    const overdueLoansEl = document.getElementById('dash-overdue-loans');
    const overdueFinesEl = document.getElementById('dash-overdue-fines');
    const totalMembersEl = document.getElementById('dash-total-members');
    const activeMembersEl = document.getElementById('dash-active-members');

    if (titleEl) titleEl.textContent = totalTitles;
    if (totalCopiesEl) totalCopiesEl.textContent = `${totalCopies} total catalog copies`;
    if (availBooksEl) availBooksEl.textContent = availableCopies;
    if (activeLoansEl) activeLoansEl.textContent = activeLoans.length;
    if (dueSoonEl) dueSoonEl.textContent = `${dueSoonCount} due within 48h`;
    if (overdueLoansEl) overdueLoansEl.textContent = overdueLoans.length;
    if (overdueFinesEl) overdueFinesEl.textContent = `Est. Fines: $${totalFines.toFixed(2)}`;
    if (totalMembersEl) totalMembersEl.textContent = totalMembers;
    if (activeMembersEl) activeMembersEl.textContent = `${uniqueBorrowerIds.size} patrons with books out`;

    // Render Donut Chart
    const loanRate = totalCopies > 0 ? Math.round((loanedCopies / totalCopies) * 100) : 0;
    const rateEl = document.getElementById('dash-loan-rate');
    const availCountEl = document.getElementById('donut-avail-count');
    const loanedCountEl = document.getElementById('donut-loaned-count');
    const segLoaned = document.getElementById('donut-seg-loaned');

    if (rateEl) rateEl.textContent = `${loanRate}%`;
    if (availCountEl) availCountEl.textContent = availableCopies;
    if (loanedCountEl) loanedCountEl.textContent = loanedCopies;

    if (segLoaned) {
      const circumference = 2 * Math.PI * 40; // ~251.2
      const strokeVal = circumference * (1 - (loanRate / 100));
      segLoaned.style.strokeDashoffset = strokeVal;
    }

    // Render Category Distribution Bar Chart
    renderCategoryChart();

    // Render Recent Loans Table
    renderDashboardRecentLoans();

    // Render Attention Needed List
    renderDashboardAttentionList(overdueLoans, activeLoans);
  }

  function renderCategoryChart() {
    const container = document.getElementById('category-chart');
    if (!container) return;

    const genreCounts = {};
    state.books.forEach(b => {
      const cat = b.category || 'General';
      genreCounts[cat] = (genreCounts[cat] || 0) + (Number(b.totalCopies) || 1);
    });

    const categories = Object.keys(genreCounts);
    if (categories.length === 0) {
      container.innerHTML = '<p class="text-muted" style="font-size: 0.85rem;">No books in catalog.</p>';
      return;
    }

    const maxCount = Math.max(...Object.values(genreCounts), 1);

    container.innerHTML = categories.map(cat => {
      const count = genreCounts[cat];
      const pct = Math.max(8, Math.round((count / maxCount) * 100));
      return `
        <div class="chart-bar-row">
          <span class="chart-bar-label" title="${escapeHtml(cat)}">${escapeHtml(cat)}</span>
          <div class="chart-bar-track">
            <div class="chart-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="chart-bar-val">${count}</span>
        </div>
      `;
    }).join('');
  }

  function renderDashboardRecentLoans() {
    const tbody = document.getElementById('dash-recent-loans-table');
    if (!tbody) return;

    if (state.loans.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-muted" style="text-align: center; padding: 24px;">No borrowing activity recorded yet.</td></tr>`;
      return;
    }

    // Sort descending by issue date
    const sorted = [...state.loans].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate)).slice(0, 5);

    tbody.innerHTML = sorted.map(l => {
      const isOverdue = isLoanOverdue(l);
      let statusBadge = '';
      if (l.returnDate) {
        statusBadge = '<span class="badge badge-neutral">Returned</span>';
      } else if (isOverdue) {
        statusBadge = '<span class="badge badge-danger">Overdue</span>';
      } else {
        statusBadge = '<span class="badge badge-warning">Active Loan</span>';
      }

      const returnActionBtn = !l.returnDate
        ? `<button class="btn btn-sm btn-outline" onclick="app.returnBook('${l.id}')">Return</button>`
        : '<span class="text-muted" style="font-size:0.75rem;">Completed</span>';

      return `
        <tr>
          <td><strong class="table-book-title">${escapeHtml(l.bookTitle)}</strong></td>
          <td>${escapeHtml(l.memberName)}</td>
          <td>${escapeHtml(l.issueDate)}</td>
          <td>${escapeHtml(l.dueDate)}</td>
          <td>${statusBadge}</td>
          <td>${returnActionBtn}</td>
        </tr>
      `;
    }).join('');
  }

  function renderDashboardAttentionList(overdueLoans, activeLoans) {
    const listEl = document.getElementById('dash-attention-list');
    if (!listEl) return;

    const twoDaysLaterStr = getDateOffset(2);
    const dueSoon = activeLoans.filter(l => !isLoanOverdue(l) && l.dueDate <= twoDaysLaterStr);

    const items = [];

    overdueLoans.forEach(l => {
      const fine = calculateLoanFine(l);
      items.push({
        title: l.bookTitle,
        sub: `Borrower: ${l.memberName} • Due: ${l.dueDate}`,
        badge: `<span class="badge badge-danger">Overdue ($${fine.toFixed(2)})</span>`,
        loanId: l.id
      });
    });

    dueSoon.forEach(l => {
      items.push({
        title: l.bookTitle,
        sub: `Borrower: ${l.memberName} • Due: ${l.dueDate}`,
        badge: `<span class="badge badge-warning">Due Soon</span>`,
        loanId: l.id
      });
    });

    if (items.length === 0) {
      listEl.innerHTML = `
        <li class="attention-item" style="justify-content: center; padding: 28px; text-align: center;">
          <span class="text-muted" style="font-size: 0.85rem;">All circulation loans are in good standing!</span>
        </li>
      `;
      return;
    }

    listEl.innerHTML = items.map(item => `
      <li class="attention-item">
        <div class="attention-info">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.sub)}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${item.badge}
          <button class="btn btn-sm btn-outline" onclick="app.returnBook('${item.loanId}')">Return</button>
        </div>
      </li>
    `).join('');
  }

  // =========================================================================
  // BOOK CATALOG CONTROLLER
  // =========================================================================
  function renderBooks() {
    populateBookCategoryFilter();

    let filtered = [...state.books];

    // Filter by Search
    const searchVal = state.bookFilter.search.trim().toLowerCase();
    if (searchVal) {
      filtered = filtered.filter(b =>
        (b.title && b.title.toLowerCase().includes(searchVal)) ||
        (b.author && b.author.toLowerCase().includes(searchVal)) ||
        (b.isbn && b.isbn.toLowerCase().includes(searchVal)) ||
        (b.category && b.category.toLowerCase().includes(searchVal))
      );
    }

    // Filter by Category
    if (state.bookFilter.category !== 'ALL') {
      filtered = filtered.filter(b => b.category === state.bookFilter.category);
    }

    // Filter by Status
    if (state.bookFilter.status === 'AVAILABLE') {
      filtered = filtered.filter(b => Number(b.availableCopies) > 0);
    } else if (state.bookFilter.status === 'OUT_OF_STOCK') {
      filtered = filtered.filter(b => Number(b.availableCopies) === 0);
    }

    // Sort
    const sortVal = state.bookFilter.sortBy;
    filtered.sort((a, b) => {
      if (sortVal === 'title_asc') return a.title.localeCompare(b.title);
      if (sortVal === 'title_desc') return b.title.localeCompare(a.title);
      if (sortVal === 'author_asc') return a.author.localeCompare(b.author);
      if (sortVal === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
      if (sortVal === 'year_desc') return (b.year || 0) - (a.year || 0);
      return 0;
    });

    // Update count indicator
    const countEl = document.getElementById('book-results-count');
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${state.books.length} titles`;
    }

    const gridContainer = document.getElementById('books-grid-container');
    const tableWrapper = document.getElementById('books-table-wrapper');
    const tableBody = document.getElementById('books-table-body');
    const emptyState = document.getElementById('books-empty-state');

    if (filtered.length === 0) {
      if (gridContainer) gridContainer.style.display = 'none';
      if (tableWrapper) tableWrapper.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    if (state.bookViewMode === 'grid') {
      if (gridContainer) gridContainer.style.display = 'grid';
      if (tableWrapper) tableWrapper.style.display = 'none';
      renderBooksGrid(filtered, gridContainer);
    } else {
      if (gridContainer) gridContainer.style.display = 'none';
      if (tableWrapper) tableWrapper.style.display = 'block';
      renderBooksTable(filtered, tableBody);
    }
  }

  function renderBooksGrid(books, container) {
    container.innerHTML = books.map(b => {
      const isAvailable = Number(b.availableCopies) > 0;
      const stockBadge = isAvailable
        ? `<span class="badge badge-success">${b.availableCopies} / ${b.totalCopies} Available</span>`
        : `<span class="badge badge-danger">Out of Stock (0/${b.totalCopies})</span>`;

      const issueBtn = isAvailable
        ? `<button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); app.openIssueModalForBook('${b.id}')">Issue</button>`
        : `<button class="btn btn-sm btn-outline" disabled style="opacity:0.5; cursor:not-allowed;">Unavailable</button>`;

      return `
        <div class="book-card" onclick="app.showBookDetail('${b.id}')">
          <div class="book-cover ${b.coverAccent || 'gradient-indigo'}">
            <span class="book-genre-pill">${escapeHtml(b.category || 'General')}</span>
            <h3 class="book-cover-title">${escapeHtml(b.title)}</h3>
          </div>
          <div class="book-info-body">
            <div class="book-author">by ${escapeHtml(b.author)}</div>
            ${renderStars(Number(b.rating) || 5)}
            <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:12px;">
              ${escapeHtml(b.description || 'No description available for this title.')}
            </p>
            <div class="book-meta-footer">
              ${stockBadge}
              <div class="book-actions-group" onclick="event.stopPropagation();">
                ${issueBtn}
                <button class="icon-btn" title="Edit Book" onclick="app.editBook('${b.id}')" style="padding:6px; color:var(--text-muted);">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="icon-btn" title="Delete Book" onclick="app.deleteBook('${b.id}')" style="padding:6px; color:var(--danger);">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderBooksTable(books, tbody) {
    tbody.innerHTML = books.map(b => {
      const isAvailable = Number(b.availableCopies) > 0;
      const stockBadge = isAvailable
        ? `<span class="badge badge-success">${b.availableCopies} available</span>`
        : `<span class="badge badge-danger">Out of stock</span>`;

      return `
        <tr>
          <td>
            <div style="font-weight:600; color:var(--text-main); cursor:pointer;" onclick="app.showBookDetail('${b.id}')">${escapeHtml(b.title)}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(b.author)}</div>
          </td>
          <td><span class="badge badge-neutral">${escapeHtml(b.category)}</span></td>
          <td><code>${escapeHtml(b.isbn)}</code></td>
          <td>${b.year || 'N/A'}</td>
          <td>${renderStars(Number(b.rating) || 5)}</td>
          <td><strong>${b.availableCopies}</strong> / ${b.totalCopies}</td>
          <td>${stockBadge}</td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm btn-outline" onclick="app.showBookDetail('${b.id}')">View</button>
              ${isAvailable ? `<button class="btn btn-sm btn-primary" onclick="app.openIssueModalForBook('${b.id}')">Issue</button>` : ''}
              <button class="icon-btn" onclick="app.deleteBook('${b.id}')" title="Delete" style="padding:6px; color:var(--danger);">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function populateBookCategoryFilter() {
    const select = document.getElementById('book-category-filter');
    if (!select) return;

    const currentVal = state.bookFilter.category;
    const categories = Array.from(new Set(state.books.map(b => b.category).filter(Boolean))).sort();

    select.innerHTML = '<option value="ALL">All Genres</option>' +
      categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');

    select.value = currentVal;
  }

  function openAddBookModal() {
    const titleEl = document.getElementById('book-modal-title');
    if (titleEl) titleEl.textContent = 'Add New Book to Catalog';
    const form = document.getElementById('book-form');
    if (form) form.reset();
    document.getElementById('book-id-input').value = '';
    document.getElementById('book-copies-input').value = '3';
    document.getElementById('book-year-input').value = new Date().getFullYear();
    openModal('modal-book-form');
  }

  function editBook(bookId) {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById('book-modal-title').textContent = 'Edit Book Details';
    document.getElementById('book-id-input').value = book.id;
    document.getElementById('book-title-input').value = book.title;
    document.getElementById('book-author-input').value = book.author;
    document.getElementById('book-isbn-input').value = book.isbn;
    document.getElementById('book-genre-input').value = book.category;
    document.getElementById('book-year-input').value = book.year;
    document.getElementById('book-copies-input').value = book.totalCopies;
    document.getElementById('book-rating-input').value = book.rating;
    document.getElementById('book-cover-accent').value = book.coverAccent || 'gradient-indigo';
    document.getElementById('book-desc-input').value = book.description || '';

    openModal('modal-book-form');
  }

  function handleSaveBook(e) {
    e.preventDefault();
    const idInput = document.getElementById('book-id-input').value;
    const title = document.getElementById('book-title-input').value.trim();
    const author = document.getElementById('book-author-input').value.trim();
    const isbn = document.getElementById('book-isbn-input').value.trim();
    const category = document.getElementById('book-genre-input').value;
    const year = parseInt(document.getElementById('book-year-input').value, 10) || new Date().getFullYear();
    const totalCopies = Math.max(1, parseInt(document.getElementById('book-copies-input').value, 10) || 1);
    const rating = parseFloat(document.getElementById('book-rating-input').value) || 5;
    const coverAccent = document.getElementById('book-cover-accent').value;
    const description = document.getElementById('book-desc-input').value.trim();

    if (!title || !author || !isbn) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    if (idInput) {
      // Editing existing book
      const index = state.books.findIndex(b => b.id === idInput);
      if (index !== -1) {
        const oldBook = state.books[index];
        const borrowed = oldBook.totalCopies - oldBook.availableCopies;
        if (totalCopies < borrowed) {
          showToast(`Cannot reduce copies below currently checked out amount (${borrowed} borrowed).`, 'warning');
          return;
        }
        const newAvailable = totalCopies - borrowed;

        state.books[index] = {
          ...oldBook,
          title,
          author,
          isbn,
          category,
          year,
          totalCopies,
          availableCopies: newAvailable,
          rating,
          coverAccent,
          description
        };
        showToast(`"${title}" has been updated.`, 'success');
      }
    } else {
      // Adding new book
      const newBook = {
        id: generateId('b'),
        title,
        author,
        isbn,
        category,
        year,
        totalCopies,
        availableCopies: totalCopies,
        rating,
        coverAccent,
        description,
        createdAt: new Date().toISOString()
      };
      state.books.unshift(newBook);
      showToast(`"${title}" added to library catalog!`, 'success');
    }

    saveDatabase();
    closeModal('modal-book-form');
    renderBooks();
    renderDashboard();
  }

  function deleteBook(bookId) {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return;

    // Check if there are active loans
    const activeLoan = state.loans.find(l => l.bookId === bookId && !l.returnDate);
    if (activeLoan) {
      showToast(`Cannot delete "${book.title}" because copies are currently borrowed.`, 'error');
      return;
    }

    confirmDialog(
      'Delete Book',
      `Are you sure you want to permanently remove "${book.title}" from the catalog?`,
      () => {
        state.books = state.books.filter(b => b.id !== bookId);
        saveDatabase();
        showToast(`"${book.title}" was removed.`, 'info');
        renderBooks();
        renderDashboard();
      }
    );
  }

  function showBookDetail(bookId) {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return;

    const modalTitle = document.getElementById('detail-modal-title');
    const modalBody = document.getElementById('detail-modal-body');
    const modalFooter = document.getElementById('detail-modal-footer');

    if (modalTitle) modalTitle.textContent = 'Book Details';

    const isAvailable = Number(book.availableCopies) > 0;
    const stockBadge = isAvailable
      ? `<span class="badge badge-success">${book.availableCopies} of ${book.totalCopies} Available</span>`
      : `<span class="badge badge-danger">All Copies Checked Out (0/${book.totalCopies})</span>`;

    // History for this book
    const bookLoans = state.loans.filter(l => l.bookId === bookId);
    const activeCount = bookLoans.filter(l => !l.returnDate).length;

    modalBody.innerHTML = `
      <div class="detail-preview-header">
        <div class="detail-cover-thumb ${book.coverAccent || 'gradient-indigo'}">
          ${escapeHtml(book.title)}
        </div>
        <div class="detail-quick-meta">
          <h2>${escapeHtml(book.title)}</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 6px;">by <strong>${escapeHtml(book.author)}</strong></p>
          <div style="margin-bottom: 10px;">${renderStars(Number(book.rating) || 5)}</div>
          <div>${stockBadge}</div>
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Synopsis</h4>
        <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.6;">
          ${escapeHtml(book.description || 'No description entered for this title.')}
        </p>
      </div>

      <table class="detail-specs-table">
        <tbody>
          <tr><th>Genre / Category</th><td>${escapeHtml(book.category)}</td></tr>
          <tr><th>ISBN-13</th><td><code>${escapeHtml(book.isbn)}</code></td></tr>
          <tr><th>Publication Year</th><td>${book.year || 'Unknown'}</td></tr>
          <tr><th>Total Shelf Copies</th><td>${book.totalCopies}</td></tr>
          <tr><th>Currently Loaned</th><td>${activeCount}</td></tr>
        </tbody>
      </table>
    `;

    modalFooter.innerHTML = `
      <button type="button" class="btn btn-outline" data-modal-close>Close</button>
      <button type="button" class="btn btn-outline" onclick="closeModal('modal-book-detail'); app.editBook('${book.id}');">Edit Details</button>
      ${isAvailable ? `<button type="button" class="btn btn-primary" onclick="closeModal('modal-book-detail'); app.openIssueModalForBook('${book.id}');">Issue Book</button>` : ''}
    `;

    // Attach close listener to newly created data-modal-close button
    modalFooter.querySelectorAll('[data-modal-close]').forEach(b => {
      b.addEventListener('click', () => closeModal('modal-book-detail'));
    });

    openModal('modal-book-detail');
  }

  // =========================================================================
  // CIRCULATION & LOANS CONTROLLER
  // =========================================================================
  function renderLoans() {
    let filtered = [...state.loans];

    // Tab filter
    const activeTab = state.loanFilter.statusTab;
    if (activeTab === 'ACTIVE') {
      filtered = filtered.filter(l => !l.returnDate);
    } else if (activeTab === 'OVERDUE') {
      filtered = filtered.filter(l => isLoanOverdue(l));
    } else if (activeTab === 'RETURNED') {
      filtered = filtered.filter(l => Boolean(l.returnDate));
    }

    // Search filter
    const searchVal = state.loanFilter.search.trim().toLowerCase();
    if (searchVal) {
      filtered = filtered.filter(l =>
        (l.bookTitle && l.bookTitle.toLowerCase().includes(searchVal)) ||
        (l.memberName && l.memberName.toLowerCase().includes(searchVal)) ||
        (l.id && l.id.toLowerCase().includes(searchVal))
      );
    }

    // Sort: most recent issueDate first
    filtered.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

    // Update Tab Counters
    const activeCount = state.loans.filter(l => !l.returnDate).length;
    const overdueCount = state.loans.filter(l => isLoanOverdue(l)).length;
    const returnedCount = state.loans.filter(l => Boolean(l.returnDate)).length;

    const elActive = document.getElementById('loans-tab-active-count');
    const elOverdue = document.getElementById('loans-tab-overdue-count');
    const elReturned = document.getElementById('loans-tab-returned-count');
    const elAll = document.getElementById('loans-tab-all-count');

    if (elActive) elActive.textContent = activeCount;
    if (elOverdue) elOverdue.textContent = overdueCount;
    if (elReturned) elReturned.textContent = returnedCount;
    if (elAll) elAll.textContent = state.loans.length;

    const tbody = document.getElementById('loans-table-body');
    const emptyState = document.getElementById('loans-empty-state');

    if (filtered.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = filtered.map(l => {
      const isOverdue = isLoanOverdue(l);
      const fine = calculateLoanFine(l);

      let statusBadge = '';
      if (l.returnDate) {
        statusBadge = '<span class="badge badge-neutral">Returned</span>';
      } else if (isOverdue) {
        statusBadge = '<span class="badge badge-danger">Overdue</span>';
      } else {
        statusBadge = '<span class="badge badge-warning">Active</span>';
      }

      let fineText = '$0.00';
      if (fine > 0) {
        fineText = `<strong class="text-danger">$${fine.toFixed(2)}</strong>`;
      }

      let actionsHtml = '';
      if (!l.returnDate) {
        actionsHtml = `
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm btn-primary" onclick="app.returnBook('${l.id}')">Return</button>
            <button class="btn btn-sm btn-outline" title="Extend Due Date by 7 days" onclick="app.renewLoan('${l.id}')">Renew +7d</button>
          </div>
        `;
      } else {
        actionsHtml = `<span class="text-muted" style="font-size:0.78rem;">Completed</span>`;
      }

      return `
        <tr>
          <td><code>${escapeHtml(l.id)}</code></td>
          <td><strong>${escapeHtml(l.bookTitle)}</strong></td>
          <td>${escapeHtml(l.memberName)}</td>
          <td>${escapeHtml(l.issueDate)}</td>
          <td>${escapeHtml(l.dueDate)}</td>
          <td>${l.returnDate ? escapeHtml(l.returnDate) : '<span class="text-muted">—</span>'}</td>
          <td>${statusBadge}</td>
          <td>${fineText}</td>
          <td>${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  }

  function openIssueModalForBook(bookId = null) {
    const bookSelect = document.getElementById('issue-book-select');
    const memberSelect = document.getElementById('issue-member-select');
    const issueDateInput = document.getElementById('issue-date-input');
    const dueDateInput = document.getElementById('due-date-input');
    const hintEl = document.getElementById('issue-book-hint');

    // Populate Available Books
    const availableBooks = state.books.filter(b => Number(b.availableCopies) > 0);
    if (availableBooks.length === 0) {
      showToast('All books in the library are currently checked out!', 'warning');
      return;
    }

    bookSelect.innerHTML = availableBooks.map(b =>
      `<option value="${b.id}">${escapeHtml(b.title)} (${b.availableCopies} available)</option>`
    ).join('');

    if (bookId && availableBooks.some(b => b.id === bookId)) {
      bookSelect.value = bookId;
    }

    // Populate Members
    if (state.members.length === 0) {
      showToast('Please register at least one member before issuing books.', 'warning');
      switchView('members');
      openAddMemberModal();
      return;
    }

    memberSelect.innerHTML = state.members.map(m =>
      `<option value="${m.id}">${escapeHtml(m.name)} (${escapeHtml(m.role)})</option>`
    ).join('');

    // Default dates
    const today = new Date().toISOString().split('T')[0];
    issueDateInput.value = today;
    dueDateInput.value = getDateOffset(14); // 14-day loan

    if (hintEl) hintEl.textContent = `${availableBooks.length} titles currently have available stock.`;

    openModal('modal-issue-book');
  }

  function handleSaveIssue(e) {
    e.preventDefault();
    const bookId = document.getElementById('issue-book-select').value;
    const memberId = document.getElementById('issue-member-select').value;
    const issueDate = document.getElementById('issue-date-input').value;
    const dueDate = document.getElementById('due-date-input').value;

    const book = state.books.find(b => b.id === bookId);
    const member = state.members.find(m => m.id === memberId);

    if (!book || !member) {
      showToast('Invalid book or member selected.', 'error');
      return;
    }

    if (book.availableCopies <= 0) {
      showToast(`"${book.title}" has no copies available to borrow.`, 'error');
      return;
    }

    // Decrement available copies
    book.availableCopies = Number(book.availableCopies) - 1;

    // Create loan
    const newLoan = {
      id: generateId('ln'),
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      issueDate: issueDate || new Date().toISOString().split('T')[0],
      dueDate: dueDate || getDateOffset(14),
      returnDate: null,
      status: 'active'
    };

    state.loans.unshift(newLoan);
    saveDatabase();

    closeModal('modal-issue-book');
    showToast(`"${book.title}" issued to ${member.name}!`, 'success');

    renderAllViews();
  }

  function returnBook(loanId) {
    const loan = state.loans.find(l => l.id === loanId);
    if (!loan || loan.returnDate) return;

    const fine = calculateLoanFine(loan);
    const fineMsg = fine > 0 ? ` Note: An overdue fine of $${fine.toFixed(2)} is applicable.` : '';

    confirmDialog(
      'Return Book',
      `Confirm return of "${loan.bookTitle}" borrowed by ${loan.memberName}?${fineMsg}`,
      () => {
        loan.returnDate = new Date().toISOString().split('T')[0];
        loan.status = 'returned';

        // Increment book available copies
        const book = state.books.find(b => b.id === loan.bookId);
        if (book) {
          book.availableCopies = Math.min(book.totalCopies, Number(book.availableCopies) + 1);
        }

        saveDatabase();
        showToast(`"${loan.bookTitle}" marked as returned.${fine > 0 ? ` ($${fine.toFixed(2)} fine recorded)` : ''}`, 'success');
        renderAllViews();
      }
    );
  }

  function renewLoan(loanId) {
    const loan = state.loans.find(l => l.id === loanId);
    if (!loan || loan.returnDate) return;

    // Extend due date by 7 days from current due date (or from today if already past due)
    const baseDate = new Date(loan.dueDate) > new Date() ? new Date(loan.dueDate) : new Date();
    baseDate.setDate(baseDate.getDate() + 7);
    loan.dueDate = baseDate.toISOString().split('T')[0];

    saveDatabase();
    showToast(`Loan renewed. New due date is ${loan.dueDate}.`, 'success');
    renderLoans();
    renderDashboard();
  }

  // =========================================================================
  // MEMBER MANAGEMENT CONTROLLER
  // =========================================================================
  function renderMembers() {
    let filtered = [...state.members];

    // Search filter
    const searchVal = state.memberFilter.search.trim().toLowerCase();
    if (searchVal) {
      filtered = filtered.filter(m =>
        (m.name && m.name.toLowerCase().includes(searchVal)) ||
        (m.email && m.email.toLowerCase().includes(searchVal)) ||
        (m.phone && m.phone.toLowerCase().includes(searchVal))
      );
    }

    // Role filter
    if (state.memberFilter.role !== 'ALL') {
      filtered = filtered.filter(m => m.role === state.memberFilter.role);
    }

    const container = document.getElementById('members-grid-container');
    const emptyState = document.getElementById('members-empty-state');

    if (filtered.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(m => {
      // Calculate active loans for this member
      const memberLoans = state.loans.filter(l => l.memberId === m.id && !l.returnDate);
      const hasOverdue = memberLoans.some(l => isLoanOverdue(l));

      const initial = m.name ? m.name.charAt(0).toUpperCase() : '?';

      let loanBadge = `<span class="badge badge-neutral">${memberLoans.length} Loans Active</span>`;
      if (hasOverdue) {
        loanBadge = `<span class="badge badge-danger">${memberLoans.length} Loans (${memberLoans.filter(isLoanOverdue).length} Overdue)</span>`;
      } else if (memberLoans.length > 0) {
        loanBadge = `<span class="badge badge-warning">${memberLoans.length} Loans Active</span>`;
      }

      return `
        <div class="member-card">
          <div class="member-card-top">
            <div class="member-avatar">${initial}</div>
            <div class="member-info">
              <h3>${escapeHtml(m.name)}</h3>
              <p>${escapeHtml(m.email)}</p>
            </div>
          </div>

          <div class="member-card-details">
            <div>
              <span class="text-muted" style="display:block; font-size:0.72rem;">Role</span>
              <strong>${escapeHtml(m.role)}</strong>
            </div>
            <div>
              <span class="text-muted" style="display:block; font-size:0.72rem;">Phone</span>
              <span>${escapeHtml(m.phone || 'None')}</span>
            </div>
            <div>
              <span class="text-muted" style="display:block; font-size:0.72rem;">Joined</span>
              <span>${escapeHtml(m.joinedDate || '2024')}</span>
            </div>
          </div>

          <div class="member-actions-row">
            ${loanBadge}
            <div style="display:flex; gap:6px;">
              <button class="icon-btn" title="Edit Member" onclick="app.editMember('${m.id}')" style="padding:6px; color:var(--text-muted);">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="icon-btn" title="Delete Member" onclick="app.deleteMember('${m.id}')" style="padding:6px; color:var(--danger);">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function openAddMemberModal() {
    const titleEl = document.getElementById('member-modal-title');
    if (titleEl) titleEl.textContent = 'Register New Member';
    const form = document.getElementById('member-form');
    if (form) form.reset();
    document.getElementById('member-id-input').value = '';
    openModal('modal-member-form');
  }

  function editMember(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    document.getElementById('member-modal-title').textContent = 'Edit Member Profile';
    document.getElementById('member-id-input').value = member.id;
    document.getElementById('member-name-input').value = member.name;
    document.getElementById('member-email-input').value = member.email;
    document.getElementById('member-phone-input').value = member.phone || '';
    document.getElementById('member-role-input').value = member.role || 'Student';

    openModal('modal-member-form');
  }

  function handleSaveMember(e) {
    e.preventDefault();
    const idInput = document.getElementById('member-id-input').value;
    const name = document.getElementById('member-name-input').value.trim();
    const email = document.getElementById('member-email-input').value.trim();
    const phone = document.getElementById('member-phone-input').value.trim();
    const role = document.getElementById('member-role-input').value;

    if (!name || !email) {
      showToast('Name and email are required.', 'warning');
      return;
    }

    if (idInput) {
      const idx = state.members.findIndex(m => m.id === idInput);
      if (idx !== -1) {
        state.members[idx] = {
          ...state.members[idx],
          name,
          email,
          phone,
          role
        };
        showToast(`Member profile for "${name}" updated.`, 'success');
      }
    } else {
      const newMember = {
        id: generateId('m'),
        name,
        email,
        phone,
        role,
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      state.members.unshift(newMember);
      showToast(`Member "${name}" registered successfully!`, 'success');
    }

    saveDatabase();
    closeModal('modal-member-form');
    renderMembers();
    renderDashboard();
  }

  function deleteMember(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    // Check if member has active loans
    const hasActiveLoans = state.loans.some(l => l.memberId === memberId && !l.returnDate);
    if (hasActiveLoans) {
      showToast(`Cannot delete member with active loans. Please return all borrowed items first.`, 'error');
      return;
    }

    confirmDialog(
      'Remove Member',
      `Are you sure you want to remove member "${member.name}"?`,
      () => {
        state.members = state.members.filter(m => m.id !== memberId);
        saveDatabase();
        showToast(`Member "${member.name}" was removed.`, 'info');
        renderMembers();
        renderDashboard();
      }
    );
  }

  // =========================================================================
  // DATA IMPORT & EXPORT
  // =========================================================================
  function exportDatabaseAsJson() {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      books: state.books,
      members: state.members,
      loans: state.loans
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];

    const a = document.createElement('a');
    a.href = url;
    a.download = `bibliotech_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Database exported successfully as JSON file.', 'success');
  }

  function handleImportFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed.books) && Array.isArray(parsed.members) && Array.isArray(parsed.loans)) {
          state.books = parsed.books;
          state.members = parsed.members;
          state.loans = parsed.loans;
          saveDatabase();
          showToast(`Backup restored! Loaded ${state.books.length} books, ${state.members.length} members.`, 'success');
          renderAllViews();
        } else {
          showToast('Invalid backup file structure. Missing books, members, or loans array.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  }

  // =========================================================================
  // MOBILE SIDEBAR
  // =========================================================================
  function initMobileSidebar() {
    const trigger = document.getElementById('mobile-menu-trigger');
    const closeBtn = document.getElementById('mobile-sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    if (trigger) {
      trigger.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileSidebar);
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileSidebar);
    }
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  // =========================================================================
  // GLOBAL LISTENERS & INITIALIZATION
  // =========================================================================
  function renderAllViews() {
    updateNavCounters();
    renderDashboard();
    renderBooks();
    renderLoans();
    renderMembers();
  }

  function setupEventListeners() {
    // Nav Items
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        if (view) switchView(view);
      });
    });

    // Topbar Quick Action buttons
    const quickIssueBtn = document.getElementById('quick-issue-btn');
    if (quickIssueBtn) {
      quickIssueBtn.addEventListener('click', () => openIssueModalForBook());
    }

    const quickAddBookBtn = document.getElementById('quick-add-book-btn');
    if (quickAddBookBtn) {
      quickAddBookBtn.addEventListener('click', openAddBookModal);
    }

    // Modal close buttons
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close modal on click outside dialog
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // ESC key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Book Search and Filters
    const bookSearchInput = document.getElementById('book-search-input');
    const bookSearchClear = document.getElementById('book-search-clear');
    if (bookSearchInput) {
      bookSearchInput.addEventListener('input', (e) => {
        state.bookFilter.search = e.target.value;
        if (bookSearchClear) {
          bookSearchClear.style.display = e.target.value ? 'block' : 'none';
        }
        renderBooks();
      });
    }

    if (bookSearchClear) {
      bookSearchClear.addEventListener('click', () => {
        if (bookSearchInput) {
          bookSearchInput.value = '';
          state.bookFilter.search = '';
          bookSearchClear.style.display = 'none';
          renderBooks();
        }
      });
    }

    const bookCatFilter = document.getElementById('book-category-filter');
    if (bookCatFilter) {
      bookCatFilter.addEventListener('change', (e) => {
        state.bookFilter.category = e.target.value;
        renderBooks();
      });
    }

    const bookStatusFilter = document.getElementById('book-status-filter');
    if (bookStatusFilter) {
      bookStatusFilter.addEventListener('change', (e) => {
        state.bookFilter.status = e.target.value;
        renderBooks();
      });
    }

    const bookSortBy = document.getElementById('book-sort-by');
    if (bookSortBy) {
      bookSortBy.addEventListener('change', (e) => {
        state.bookFilter.sortBy = e.target.value;
        renderBooks();
      });
    }

    const resetFiltersBtn = document.getElementById('reset-book-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        state.bookFilter.search = '';
        state.bookFilter.category = 'ALL';
        state.bookFilter.status = 'ALL';
        state.bookFilter.sortBy = 'title_asc';
        if (bookSearchInput) bookSearchInput.value = '';
        if (bookSearchClear) bookSearchClear.style.display = 'none';
        if (bookCatFilter) bookCatFilter.value = 'ALL';
        if (bookStatusFilter) bookStatusFilter.value = 'ALL';
        if (bookSortBy) bookSortBy.value = 'title_asc';
        renderBooks();
      });
    }

    // Book View Mode Switch (Grid vs Table)
    const btnGrid = document.getElementById('view-mode-grid');
    const btnTable = document.getElementById('view-mode-table');
    if (btnGrid && btnTable) {
      btnGrid.addEventListener('click', () => {
        state.bookViewMode = 'grid';
        btnGrid.classList.add('active');
        btnTable.classList.remove('active');
        renderBooks();
      });
      btnTable.addEventListener('click', () => {
        state.bookViewMode = 'table';
        btnTable.classList.add('active');
        btnGrid.classList.remove('active');
        renderBooks();
      });
    }

    const openAddBookBtn = document.getElementById('open-add-book-modal');
    if (openAddBookBtn) {
      openAddBookBtn.addEventListener('click', openAddBookModal);
    }

    // Forms
    const bookForm = document.getElementById('book-form');
    if (bookForm) bookForm.addEventListener('submit', handleSaveBook);

    const issueForm = document.getElementById('issue-form');
    if (issueForm) issueForm.addEventListener('submit', handleSaveIssue);

    const memberForm = document.getElementById('member-form');
    if (memberForm) memberForm.addEventListener('submit', handleSaveMember);

    // Loans Filter Pills
    document.querySelectorAll('.tab-pill-group .tab-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.tab-pill-group .tab-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.loanFilter.statusTab = pill.dataset.loanFilter;
        renderLoans();
      });
    });

    const loanSearchInput = document.getElementById('loan-search-input');
    if (loanSearchInput) {
      loanSearchInput.addEventListener('input', (e) => {
        state.loanFilter.search = e.target.value;
        renderLoans();
      });
    }

    const openIssueBtn = document.getElementById('open-issue-modal');
    if (openIssueBtn) {
      openIssueBtn.addEventListener('click', () => openIssueModalForBook());
    }

    // Members Search & Filter
    const memberSearchInput = document.getElementById('member-search-input');
    if (memberSearchInput) {
      memberSearchInput.addEventListener('input', (e) => {
        state.memberFilter.search = e.target.value;
        renderMembers();
      });
    }

    const memberRoleFilter = document.getElementById('member-role-filter');
    if (memberRoleFilter) {
      memberRoleFilter.addEventListener('change', (e) => {
        state.memberFilter.role = e.target.value;
        renderMembers();
      });
    }

    const openAddMemberBtn = document.getElementById('open-add-member-modal');
    if (openAddMemberBtn) {
      openAddMemberBtn.addEventListener('click', openAddMemberModal);
    }

    // Settings actions
    const exportBtn = document.getElementById('btn-export-data');
    if (exportBtn) exportBtn.addEventListener('click', exportDatabaseAsJson);

    const importInput = document.getElementById('import-file-input');
    if (importInput) importInput.addEventListener('change', handleImportFile);

    const reloadDemoBtn = document.getElementById('btn-reload-demo');
    if (reloadDemoBtn) {
      reloadDemoBtn.addEventListener('click', () => {
        confirmDialog(
          'Restore Sample Library Data',
          'This will reset your catalog, members, and loans to the curated default dataset. Continue?',
          () => resetToDemoData(true)
        );
      });
    }

    const clearAllBtn = document.getElementById('btn-clear-all');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        confirmDialog(
          'Wipe All Library Records',
          'Are you sure you want to permanently erase ALL books, patrons, and loan transactions? This action cannot be undone.',
          wipeAllDatabase
        );
      });
    }
  }

  function updateLiveDate() {
    const liveDateEl = document.getElementById('live-date');
    if (liveDateEl) {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      liveDateEl.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  // =========================================================================
  // BOOTSTRAP APPLICATION
  // =========================================================================
  function init() {
    initTheme();
    loadDatabase();
    initMobileSidebar();
    setupEventListeners();
    updateLiveDate();
    renderAllViews();
  }

  // Expose public API for inline handlers and dev console
  window.app = {
    switchView,
    openAddBookModal,
    editBook,
    deleteBook,
    showBookDetail,
    openIssueModalForBook,
    returnBook,
    renewLoan,
    openAddMemberModal,
    editMember,
    deleteMember,
    exportDatabaseAsJson,
    resetToDemoData,
    wipeAllDatabase,
    toast: showToast,
    confirm: confirmDialog
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
