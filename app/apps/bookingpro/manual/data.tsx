import { Building2, UserCheck, ShieldCheck } from 'lucide-react';

export type HowTo = {
    title: string;
    body?: string;
    steps?: string[];
    warning?: string;
};

export type Section = {
    id: string;
    title: string;
    subtitle: string;
    howtos: HowTo[];
};

export type ColorConfig = {
    tab: string;
    tabInactive: string;
    stepBadge: string;
    intro: string;
    introText: string;
    sectionBorder: string;
    sectionHeaderBg: string;
    iconColor: string;
    warningBg: string;
    gradient: string;
    cardBorder: string;
    cardBg: string;
    linkText: string;
};

export type RoleData = {
    label: string;
    shortLabel: string;
    Icon: React.ElementType;
    intro: string;
    colors: ColorConfig;
    sections: Section[];
};

export const ROLES: Record<string, RoleData> = {
    owner: {
        label: 'Location Owner',
        shortLabel: 'Owner',
        Icon: Building2,
        intro: 'As a Location Owner, your main objective in the app is to manage your daily availability so sales reps can sell appropriately, keep track of scheduled clients, and register physical payments (balances) when clients arrive.',
        colors: {
            tab: 'bg-emerald-600 text-white border-emerald-600',
            tabInactive: 'text-emerald-700 border-emerald-200 hover:bg-emerald-50',
            stepBadge: 'bg-emerald-100 text-emerald-700',
            intro: 'bg-emerald-50 border-emerald-200',
            introText: 'text-emerald-900',
            sectionBorder: 'border-emerald-100',
            sectionHeaderBg: 'hover:bg-emerald-50',
            iconColor: 'text-emerald-500',
            warningBg: 'bg-amber-50 border-amber-100 text-amber-800',
            gradient: 'from-emerald-50 to-white',
            cardBorder: 'border-emerald-100',
            cardBg: 'bg-emerald-50',
            linkText: 'text-emerald-700 hover:text-emerald-900',
        },
        sections: [
            {
                id: 'dashboard',
                title: '1. Dashboard',
                subtitle: 'Your daily overview.',
                howtos: [
                    {
                        title: 'Quick Read',
                        body: 'Check the summary cards at the top. You can easily view the "Balance Due" to be collected today and the total number of expected arrivals.',
                    },
                    {
                        title: 'Review Upcoming Clients',
                        body: 'Scroll down to the "Upcoming Bookings" table.',
                    },
                    {
                        title: 'Quick Action',
                        body: "Click anywhere on a client's row to instantly open their booking card, where you can see how many units they rented and whether they have a pending balance.",
                    },
                ],
            },
            {
                id: 'bookings',
                title: '2. Bookings',
                subtitle: 'Navigate through all your historical and future clients.',
                howtos: [
                    {
                        title: 'How to Search for a Client',
                        body: 'Go to the search bar (🔍 Search) at the top, type the name or phone number of the arriving client, and press Enter.',
                    },
                    {
                        title: 'How to Filter by Dates',
                        body: 'Click on the calendar Date Range button located at the top right and select a specific day or just click Today.',
                    },
                    {
                        title: "How to Register a Client's Payment (Manual Payment)",
                        steps: [
                            'Click on the booking row to open the side details panel.',
                            'Locate the "Balance Due" amount.',
                            'Press the dark green button or cash icon labeled Payment or Log Payment.',
                            'Enter the amount received, select the payment method (Cash, Zelle, CashApp), and press Save. The payment status will automatically change to "Paid".',
                        ],
                    },
                    {
                        title: 'How to Reschedule or Move a Booking',
                        steps: [
                            'Once the booking side panel is open, press the orange Move Booking or Reschedule button.',
                            'Select the new available date and time slot, then confirm. The sales team will be automatically notified.',
                        ],
                    },
                    {
                        title: 'How to Cancel (No-Show)',
                        body: 'If the client didn\'t show up (No-Show), look for the red Cancel Booking button inside the booking panel. You will be asked to select a reason (e.g., "Client never showed up").',
                    },
                ],
            },
            {
                id: 'availability',
                title: '3. Availability',
                subtitle: 'Notify the Sales team about damaged equipment to prevent overselling.',
                howtos: [
                    {
                        title: 'How to Set the Total Equipment for the Day',
                        steps: [
                            'Click on the day you want to configure on the calendar to open the Edit Availability window.',
                            'In the Base Inventory box, type the total number of working units you have for that entire day (e.g., 10). Press Save.',
                        ],
                    },
                    {
                        title: 'How to Block Units at Specific Hours (Hourly Overrides)',
                        steps: [
                            'Click on the current day.',
                            'Scroll down to the Hourly Overrides section.',
                            'Find the relevant hour boxes (e.g., "1:00 PM" and "2:00 PM") and lower the availability number to reflect broken or unavailable units.',
                            'Click Save. Sales Reps will instantly see the reduced availability during those hours.',
                        ],
                    },
                ],
            },
        ],
    },

    rep: {
        label: 'Sales Rep',
        shortLabel: 'Sales Rep',
        Icon: UserCheck,
        intro: 'As a Sales Rep, your focus is on creating flawless bookings, sending payment links, following up on leads, and communicating quickly with clients and location owners.',
        colors: {
            tab: 'bg-violet-600 text-white border-violet-600',
            tabInactive: 'text-violet-700 border-violet-200 hover:bg-violet-50',
            stepBadge: 'bg-violet-100 text-violet-700',
            intro: 'bg-violet-50 border-violet-200',
            introText: 'text-violet-900',
            sectionBorder: 'border-violet-100',
            sectionHeaderBg: 'hover:bg-violet-50',
            iconColor: 'text-violet-500',
            warningBg: 'bg-amber-50 border-amber-100 text-amber-800',
            gradient: 'from-violet-50 to-white',
            cardBorder: 'border-violet-100',
            cardBg: 'bg-violet-50',
            linkText: 'text-violet-700 hover:text-violet-900',
        },
        sections: [
            {
                id: 'dashboard',
                title: '1. Dashboard',
                subtitle: 'Your shift overview.',
                howtos: [
                    {
                        title: 'How to use it',
                        body: 'Use this at the start and end of your shift. Check your personal sales conversions for the month and view if there are any bookings in a "Pending Payment" status that require you to call the client and finalize the payment.',
                    },
                ],
            },
            {
                id: 'bookings',
                title: '2. Bookings',
                subtitle: 'Your main hub for creating and selling.',
                howtos: [
                    {
                        title: 'How to CREATE a New Booking',
                        steps: [
                            'Press the large blue/orange button in the top right corner: + New Booking.',
                            'The booking wizard will open. In Step 1, fill out the Customer Information (Name and Phone Number are strictly required).',
                            'In Step 2, select the Activity the client wants (e.g., 1 Hour Jetski Tour), choose the number of people, and select the Location.',
                            'The available time slots will appear. Click on the Time Button you want. If a button is grayed out, it means the location is fully booked or closed at that time.',
                            "In the Final Step, you'll see the pricing breakdown. Use the + Add Promo button if the client has a valid coupon code.",
                            'If the client sent a manual deposit via Zelle or CashApp, enter the amount in the "Manual Deposit Received" field. Then click Create Booking.',
                        ],
                    },
                    {
                        title: 'How to Send a Stripe Payment Link',
                        steps: [
                            'Finish creating the booking in a "Draft" status.',
                            'In the booking details panel, click on Send Payment Link.',
                            'The app will generate a Stripe link that you can copy and paste into WhatsApp to collect the payment and activate the booking.',
                        ],
                    },
                    {
                        title: 'Time Clock (Clock In / Clock Out)',
                        body: 'At the top navigation bar, click the ▶ Clock In button every morning to start your shift. When you are done, the bar will display a running timer — just click ⏹ Clock Out to end your shift.',
                    },
                ],
            },
            {
                id: 'locations',
                title: '3. Locations',
                subtitle: 'Directory of all operating locations.',
                howtos: [
                    {
                        title: 'How to use it',
                        body: 'If a client in a specific area requests a service and you need to know which location operates there, navigate to this panel.',
                    },
                    {
                        title: 'Actions',
                        body: 'Every Location card displays their operating hours and services. Click the green Phone or WhatsApp button on that card to jump straight into a call or chat with the Owner of that location if you need technical validation before selling.',
                    },
                ],
            },
            {
                id: 'map',
                title: '4. Map View',
                subtitle: 'Logistics map for pinpointing clients and locations.',
                howtos: [
                    {
                        title: 'How to use it',
                        body: 'Use the zoom controls to look at the coastal area, hotels, and tourist spots.',
                    },
                    {
                        title: 'Reading the Map',
                        body: 'Orange pins 📍 represent business Locations. Blue/Red pins represent previous clients or current booking requests. Click on a blue Client pin, and the map will trace a line to the nearest orange Location pin, helping you sell the best and closest spot for that client.',
                    },
                ],
            },
        ],
    },

    admin: {
        label: 'Admin / Super Admin',
        shortLabel: 'Admin',
        Icon: ShieldCheck,
        intro: 'As an Administrator, you have access to everything the Sales Rep and Location Owner can do, plus powerful tools for team management, routing, pricing strategies, and system configuration.',
        colors: {
            tab: 'bg-brand-700 text-white border-brand-700',
            tabInactive: 'text-brand-700 border-brand-200 hover:bg-brand-50',
            stepBadge: 'bg-brand-100 text-brand-700',
            intro: 'bg-brand-50 border-brand-200',
            introText: 'text-brand-900',
            sectionBorder: 'border-brand-100',
            sectionHeaderBg: 'hover:bg-brand-50',
            iconColor: 'text-brand-600',
            warningBg: 'bg-amber-50 border-amber-100 text-amber-800',
            gradient: 'from-brand-50 to-white',
            cardBorder: 'border-brand-100',
            cardBg: 'bg-brand-50',
            linkText: 'text-brand-700 hover:text-brand-900',
        },
        sections: [
            {
                id: 'staff',
                title: '1. Staff',
                subtitle: 'Team Management — create and manage user accounts.',
                howtos: [
                    {
                        title: 'How to Create an Account for a New Owner or Rep',
                        steps: [
                            'Navigate to the Staff page and click + Add User in the top right.',
                            'Fill in the required fields: Corporate email, Name, and a strong temporary password.',
                            'In the "Role" dropdown, select carefully: LOCATION_OWNER will prompt you to link them to their Location; SALES_REP allows you to assign their hourly rate if applicable.',
                            'Press Save. Instruct the new employee to log in using the provided credentials.',
                        ],
                    },
                    {
                        title: 'How to Disable an Employee',
                        body: 'Click on their name in the list, locate their status toggle, and switch it off — or simply change their password so they lose access immediately.',
                    },
                ],
            },
            {
                id: 'pricing',
                title: '2. Pricing',
                subtitle: 'Rates & Percentages — configure base prices and fixed deposits.',
                howtos: [
                    {
                        title: 'How to Add a New Pricing Rule',
                        steps: [
                            'Go to the Pricing tab in your settings. Click + New Pricing Rule.',
                            'Select the Activity this rule applies to.',
                            'Fill in the "Base Price" and the legally required standard amount in "Fixed Deposit". By setting a fixed deposit (e.g., $50 per Jetski), the Booking Modal will force the Sales Rep to collect at least that minimum amount.',
                            'Click Save. This takes effect immediately on all future bookings.',
                        ],
                    },
                ],
            },
            {
                id: 'promos',
                title: '3. Promo Codes',
                subtitle: 'Create marketing coupons and discounts.',
                howtos: [
                    {
                        title: 'How to Create a Marketing Coupon',
                        steps: [
                            'Find the Promo Codes tab and click + New Code.',
                            'In the Discount Type selector, choose either -X USD for a flat discount, or X% for a percentage off the total balance.',
                            'Set a Usage Limit if this is meant to be a scarcity campaign (e.g., capping it to the first 25 bookings). Set expiration dates, and the coupon will be ready to be redeemed by reps on the New Booking screen.',
                        ],
                    },
                ],
            },
            {
                id: 'timetracker',
                title: '4. Time Tracker',
                subtitle: 'Payroll and Approvals — audit and approve team shifts.',
                howtos: [
                    {
                        title: 'How to Audit and Approve Shifts',
                        steps: [
                            "This table displays your team's names along with their respective Clock In and Out timestamps for the day.",
                            'If an employee forgot to clock out, click the three dots or the "Edit" button on their shift row to fix their time manually.',
                            'Once everything is correct, use the checkboxes on the left side to select all approved shifts and click Mark as Paid to clear them from your pending accounting records.',
                        ],
                    },
                ],
            },
            {
                id: 'canned',
                title: '5. Canned Messages',
                subtitle: 'Quick Replies — manage and update SMS templates.',
                howtos: [
                    {
                        title: 'How to Modify an SMS Template',
                        steps: [
                            'Go to the Canned Messages list and click on the template you want to edit (e.g., "Paid Confirmation").',
                            'Edit the message in the text box.',
                            'Save the template. Reps will immediately see the updated text on their next booking.',
                        ],
                        warning: '⚠ Do NOT delete the bracketed formulas like {customerName} or {bookingRef}. The system automatically replaces these tags with real client data before sending.',
                    },
                ],
            },
            {
                id: 'simulation',
                title: '6. Role Simulation',
                subtitle: 'Super Admin exclusive — view the app as any role.',
                howtos: [
                    {
                        title: 'How to Use Role Simulation',
                        steps: [
                            'Look for the "View as:" panel below your name in the left sidebar.',
                            'Click a button like SALES REP or OWNER. The application will instantly hide all admin menus and copy exactly what that employee sees.',
                            'When you are done, click the Super Admin button to restore your full access.',
                        ],
                        warning: "💡 Use this for tech support when an employee says \"I can't find the charge button\" — simulate their view and guide them step by step.",
                    },
                ],
            },
        ],
    },
};

export const ROLE_ORDER = ['owner', 'rep', 'admin'] as const;
