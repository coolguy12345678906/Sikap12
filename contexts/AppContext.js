import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

// --- Initial Data ---

const initialProjects = [
  {
    id: 1,
    name: "Barangay Hall Renovation",
    description: "Complete renovation of the main barangay hall building including electrical and plumbing upgrade.",
    status: "In Progress",
    budgetUsed: 120000,
    budgetTotal: 250000,
    startDate: "2025-01-10",
    endDate: "2025-11-18",
    progress: 48,
    color: 'teal'
  },
  {
    id: 2,
    name: "Street Lighting Project",
    description: "Installation of LED street lights on main roads.",
    status: "In Progress",
    budgetUsed: 45000,
    budgetTotal: 180000,
    startDate: "2025-02-15",
    endDate: "2025-11-18",
    progress: 25,
    color: 'orange'
  },
  {
    id: 3,
    name: "Health Center Equipment",
    description: "Purchase of medical equipment for barangay health center",
    status: "Completed",
    budgetUsed: 150000,
    budgetTotal: 150000,
    startDate: "2025-09-01",
    endDate: "2025-11-09",
    progress: 100,
    color: 'teal'
  }
];

const initialExpenses = [
  {
    id: 1,
    name: "Office Supplies",
    description: "Papers, pens, and other materials.",
    amount: 15000,
    category: "OPEX",
    date: "2024-01-15",
    color: 'orange'
  },
  {
    id: 2,
    name: "Computer Equipment",
    description: "New laptops and monitors for staff.",
    amount: 85000,
    category: "CAPEX",
    date: "2024-01-14",
    color: 'teal'
  },
  {
    id: 3,
    name: "Utilities",
    description: "Electricity and water bills.",
    amount: 12000,
    category: "OPEX",
    date: "2024-01-13",
    color: 'orange'
  },
  {
    id: 4,
    name: "Building Renovation",
    description: "Materials for hall renovation.",
    amount: 120000,
    category: "CAPEX",
    date: "2024-01-12",
    color: 'teal'
  },
  {
    id: 5,
    name: "Vehicle Maintenance",
    description: "Repair and oil change for patrol car.",
    amount: 8000,
    category: "OPEX",
    date: "2024-01-11",
    color: 'orange'
  }
];

const initialEvents = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0], // Today
    title: "Barangay Meeting",
    details: "Monthly meeting with barangay councilors regarding budget allocation."
  },
  {
    id: 2,
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], // 2 days from now
    title: "Community Cleanup",
    details: "Voluntary cleanup drive for Zone 1 and Zone 2."
  }
];

const initialCourses = [
  {
    id: 1,
    title: "Budget Planning Basics",
    description: "Budget Planning Fundamentals for Barangay Leaders",
    level: "Beginner",
    duration: 3,
    students: 45,
    content: `# Budget Planning Fundamentals for Barangay Leaders

## Introduction
Budget planning is the cornerstone of effective barangay governance. It involves estimating revenue and expenses over a specified future period. A well-planned budget ensures that resources are allocated efficiently to meet the community's needs while complying with government regulations.

## Module 1: Understanding Sources of Revenue
Before you can plan expenses, you must understand where the money comes from.
- **Internal Revenue Allotment (IRA):** The share of national taxes allocated to the barangay.
- **Real Property Tax Share:** A portion of taxes collected on land and buildings within the barangay.
- **Community Tax (Cedula):** Fees collected from residents for identification certificates.
- **Barangay Fees & Charges:** Income from permits, clearances, and use of barangay facilities.

## Module 2: Expense Allocation Categories
Expenses are generally categorized to ensure balanced spending.
1. **Personnel Services (PS):** Salaries, wages, and honoraria for barangay officials and staff. (limited to 55% of total annual income).
2. **Maintenance and Other Operating Expenses (MOOE):** Costs for supplies, utilities, travel, and repairs.
3. **Capital Outlay (CO):** Purchase of equipment, infrastructure projects, and land.

## Module 3: The Budgeting Process
1. **Preparation:** The Punong Barangay prepares the budget with the help of the Treasurer.
2. **Authorization:** The Sangguniang Barangay reviews and approves the budget through an appropriation ordinance.
3. **Review:** The City/Municipal Budget Officer reviews the budget for compliance.
4. **Execution:** Funds are released and utilized for approved programs.
5. **Accountability:** Periodic reporting of actual income and expenses.

## Best Practices
- Always involve the community through public hearings.
- Maintain a reserve fund for unforeseen calamities (5% Calamity Fund).
- Prioritize projects that yield long-term benefits for the community.
`
  },
  {
    id: 2,
    title: "CAPEX vs OPEX Management",
    description: "Advanced CAPEX vs OPEX Management for Barangay Officials",
    level: "Intermediate",
    duration: 4,
    students: 32,
    content: `# Advanced CAPEX vs OPEX Management for Barangay Officials

## Introduction
The distinction between Capital Expenditures (CAPEX) and Operational Expenditures (OPEX) is crucial for long-term financial health. Misclassifying these can lead to audit findings and poor resource management.

## Part 1: Capital Expenditures (CAPEX)
CAPEX refers to funds used to acquire, upgrade, and maintain physical assets such as property, buildings, or equipment. These are long-term investments.

### Examples of CAPEX:
- **Infrastructure:** Construction of a new health center, road concreting, drainage systems.
- **Equipment:** Purchase of a patrol vehicle, computers for the hall, medical equipment.
- **Land:** Acquisition of a lot for a multi-purpose hall.

### Planning for CAPEX:
- Requires a larger upfront cost.
- Should be included in the Annual Investment Plan (AIP).
- depreciation must be tracked over time.

## Part 2: Operational Expenditures (OPEX)
OPEX refers to the day-to-day expenses required to keep the barangay running. These are recurring costs.

### Examples of OPEX:
- **Utilities:** Electricity and water bills for the barangay hall and streetlights.
- **Supplies:** Office paper, ink, cleaning materials.
- **Salaries:** Honoraria for Tanods, health workers, and officials.
- **Maintenance:** Repairs for the patrol vehicle, painting the hall.

## Part 3: Strategic Balancing
- **High CAPEX, Low OPEX:** Investing in solar streetlights (CAPEX) reduces future electricity bills (OPEX).
- **Low CAPEX, High OPEX:** Buying cheap, low-quality equipment saves money now but increases repair costs later.

## Key Takeaway
Invest wisely in CAPEX to optimize your future OPEX. Always ensure your CAPEX projects have a corresponding budget for maintenance (OPEX) to ensure longevity.
`
  },
  {
    id: 3,
    title: "Project Financial Tracking",
    description: "Advanced Project Financial Tracking and Monitoring",
    level: "Advanced",
    duration: 5,
    students: 28,
    content: `# Advanced Project Financial Tracking and Monitoring

## Introduction
Effective project financial tracking is the difference between a successful project and a financial disaster. It involves monitoring the flow of funds throughout the project lifecycle to ensure it stays within budget.

## Module 1: Establishing a Baseline
Before starting, you must have a clear, itemized budget.
- **Bill of Quantities (BOQ):** Detailed list of materials and labor costs.
- **Cash Flow Projection:** Estimate when funds will be needed (e.g., mobilization fund, progress billings).

## Module 2: Monitoring Tools & Techniques
- **Variance Analysis:** Regularly compare *Actual Spend* vs. *Planned Budget*.
  - *Positive Variance:* Under budget (Good, but check quality).
  - *Negative Variance:* Over budget (Investigate immediately).
- **Sikap FundHub:** Use digital tools to log expenses in real-time rather than waiting for end-of-month reports.

## Module 3: Managing Change Orders
Projects rarely go exactly to plan.
- **Variation Orders:** Official documents approving changes in scope or cost.
- Never approve verbal changes; always require documentation.
- Ensure additional costs have a source of funds (e.g., savings from other items).

## Module 4: Auditing & Compliance
- **Pre-Audit:** Checking documents before payment is made.
- **Post-Audit:** COA review after payment.
- Keep all receipts, vouchers, and inspection reports organized.

## Common Pitfalls
- Front-loading expenses (spending too much too early).
- Ignoring small "petty cash" leaks that add up.
- Failing to withhold necessary taxes.
`
  },
  {
    id: 4,
    title: "Community Financial Transparency",
    description: "Building Trust Through Financial Transparency",
    level: "Intermediate",
    duration: 4.5,
    students: 51,
    content: `# Building Trust Through Financial Transparency

## Introduction
Financial transparency is the cornerstone of effective community leadership. It builds trust, encourages participation, and ensures accountability. When constituents know where their money goes, they are more likely to support barangay initiatives.

## The Full Disclosure Policy (FDP)
In compliance with DILG mandates, barangays must post financial documents in conspicuous places.
- **What to Post:**
  - Annual Budget
  - Statement of Receipts and Expenditures
  - Itemized Monthly Collections
  - Annual Procurement Plan

## Strategies for Transparency
### 1. Public Postings
Utilize the Barangay Full Disclosure Policy board. Ensure it is updated quarterly and placed in high-traffic areas like the market or plaza.

### 2. Town Hall Meetings (Barangay Assembly)
Go beyond the minimum requirement. Present simple, easy-to-understand charts (like those in Sikap FundHub) to explain income and expenses. Avoid jargon.

### 3. Digital Transparency
Use social media or a community dashboard to share project updates.
- Post "Before and After" photos of projects.
- Share summaries of approved budgets.

## Benefits of Transparency
- **Increased Trust:** Reduces suspicion of corruption.
- **Higher Collection:** People pay fees willingly when they see tangible results.
- **Community Participation:** Residents are more likely to volunteer or donate for projects.

## Handling Inquiries
- Establish a clear process for residents to request financial information.
- Respond openly and promptly to questions about budget allocation.
`
  }
];

// --- Context ---

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // State
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [projects, setProjects] = useState(initialProjects);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [events, setEvents] = useState(initialEvents);
  const [courses, setCourses] = useState(initialCourses);

  // Logic
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const value = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    projects,
    setProjects,
    expenses,
    setExpenses,
    events,
    setEvents,
    courses,
    setCourses
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};