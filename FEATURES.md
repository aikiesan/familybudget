# ✨ Features Overview

## Core Features

### 💵 Income Management
- Single salary input with amount and payment date
- Edit anytime with inline form
- Displayed prominently with Brazilian Real (R$) formatting
- Automatic integration into monthly calculations

### 💸 Expense Tracking

#### One-Time Expenses
- Category selection from 19+ pre-defined categories
- Amount input with Brazilian Real formatting
- Optional description field
- Date picker for transaction date
- Add, edit, and delete functionality
- Visual category icons and color coding

#### Recurring Expenses
- All features of one-time expenses
- Frequency selection (Monthly or Weekly)
- Auto-calculation of monthly impact (Weekly × 4.33)
- Start date tracking
- Active/Pause toggle
- Visual badge to distinguish from one-time
- Automatic inclusion in monthly totals

### 📊 Expense Categories

Complete list with emoji icons:
- 🏠 **Housing**: Rent/Mortgage
- ⚡ **Utilities**: Electricity, Water, Gas, Internet
- 🍔 **Food & Groceries**: Supermarket shopping
- 🍽️ **Dining Out & Restaurants**: Eating out
- 🚗 **Transportation**: Gas, Public Transport, Uber
- 🏥 **Healthcare & Pharmacy**: Medical expenses
- 🎓 **Education & Research**: Learning materials
- 📱 **Subscriptions**: Netflix, Spotify, etc.
- 🛍️ **Shopping & Personal Care**: Clothing, beauty
- 🎮 **Entertainment & Leisure**: Movies, games
- 🚴 **Sports & Fitness**: Gym, sports equipment
- ✈️ **Travel & Tourism**: Trips and vacations
- 📚 **Books & Learning**: Books and courses
- 💻 **Technology & Gadgets**: Electronics
- 🎁 **Gifts & Donations**: Presents and charity
- 🔧 **Maintenance & Repairs**: Home/car repairs
- 🐾 **Pets**: Pet food and veterinary
- 💳 **Bank Fees & Taxes**: Banking costs
- 📦 **Other**: Miscellaneous expenses

### 🎯 Germany Trip Savings Tracker

Special dedicated feature for your R$ 20,000 goal:
- **Target Amount**: Customizable (default R$ 20,000)
- **Deadline**: Customizable (default July 2026)
- **Progress Bar**: Visual representation of savings
- **Percentage Complete**: Real-time calculation
- **Months Remaining**: Auto-calculated countdown
- **Days Remaining**: Precise time tracking
- **Recommended Monthly Savings**: Smart calculation based on remaining time
- **Status Indicators**:
  - 🟢 On Track: Meeting or exceeding expected progress
  - 🟡 Close: Within 80% of expected progress
  - 🔴 Behind: Below 80% of expected progress
- **Savings History**: Track all savings contributions
- **Manual Savings Entry**: Add savings whenever you set money aside
- **Settings Panel**: Adjust target and deadline anytime

### 📅 Time Period Views

#### Weekly View
- Sunday to Saturday breakdown
- Current week by default
- Navigate to previous/next weeks
- Expenses filtered to current week
- Prorated recurring expenses

#### Monthly View
- Full calendar month
- Current month by default
- Navigate to previous/next months
- Complete expense history for the month
- Full recurring expense amounts

#### Navigation
- Previous/Next arrows
- "Today" button to return to current period
- Period label with formatted dates
- Smooth transitions between periods

### 📈 Dashboard & Visualizations

#### Summary Cards
Four key metrics displayed prominently:

1. **Total Income**
   - Monthly salary
   - Green gradient background
   - "This month" indicator

2. **Total Expenses**
   - Combined one-time and recurring
   - Red gradient background
   - Transaction count

3. **Balance Remaining**
   - Income minus expenses
   - Blue (positive) or Gray (negative)
   - "Available" or "Over budget" status

4. **Germany Trip Progress**
   - Current savings amount
   - Purple gradient background
   - Percentage of goal

#### Interactive Charts

**1. Pie Chart - Expense Distribution**
- Shows all categories with expenses
- Color-coded by category
- Hover for detailed amounts
- Percentage breakdowns
- Legend with category names

**2. Bar Chart - Top 5 Categories**
- Highlights biggest spending areas
- Sorted by amount (highest first)
- Category colors maintained
- Easy comparison between categories
- Horizontal labels for readability

**3. Line Chart - Monthly Spending Trend**
- Last 6 months of data
- Smooth curved line
- Fill under curve
- Hover for exact amounts
- Month labels on X-axis
- Ideal for spotting patterns

**4. Doughnut Chart - Recurring vs One-Time**
- Two-segment comparison
- Purple for recurring
- Green for one-time
- Shows spending pattern type
- Helps identify fixed vs variable costs

All charts feature:
- Responsive design
- Smooth animations
- Interactive tooltips
- Brazilian Real formatting
- Loading states
- Empty state messages

### 💡 Smart Insights & Recommendations

Auto-generated insights based on your data:

1. **Top Spending Category**
   - Identifies highest expense category
   - Shows amount and percentage
   - Blue info card

2. **Monthly Comparison**
   - Compares with previous month
   - Shows increase/decrease
   - Green (saving) or Red (spending more)
   - Actual difference amount

3. **Daily Average**
   - Average spending per day
   - Helps understand daily habits
   - Purple info card

4. **Trip Savings Goal**
   - Recommended monthly amount
   - Based on remaining time
   - Keeps you on track
   - Pink info card

5. **Budget Alert**
   - Warning when over budget
   - Shows overspend amount
   - Red alert card

6. **Savings Congratulation**
   - Positive feedback when under budget
   - Shows remaining balance
   - Percentage of income saved
   - Green success card

7. **Savings Opportunity**
   - Suggests 20% reduction in top category
   - Calculates potential savings
   - Yellow suggestion card

### 💾 Data Management

#### Export
- Download all data as JSON
- Includes full history
- Timestamped filename
- One-click export
- Preserves all relationships

#### Import
- Upload previous JSON backup
- Validates data structure
- Merges with defaults
- Error handling
- Overwrites current data

#### Clear All
- Double confirmation required
- Removes all data
- Resets to defaults
- Cannot be undone
- Warning messages

#### Local Storage
- All data browser-based
- No server required
- Instant save/load
- Privacy-focused
- Offline-capable

### 📱 Responsive Design

#### Mobile (< 768px)
- Single column layout
- Stacked cards
- Full-width charts
- Touch-friendly buttons
- Floating Action Button
- Bottom navigation
- Optimized forms
- Swipe gestures ready

#### Tablet (768px - 1024px)
- Two-column layout
- Side-by-side cards
- Responsive charts
- Balanced spacing
- Touch and mouse support

#### Desktop (> 1024px)
- Three-column layout
- Full dashboard view
- Large charts
- Sticky trip tracker
- Hover effects
- Keyboard shortcuts ready

### 🎨 UI/UX Features

#### Design Elements
- Gradient backgrounds
- Rounded corners
- Soft shadows
- Smooth animations
- Color-coded categories
- Icon system
- Typography hierarchy
- White space optimization

#### Interactions
- Hover states
- Click feedback
- Loading states
- Success messages
- Error handling
- Form validation
- Confirmation dialogs
- Smooth transitions

#### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast
- Readable fonts
- Clear labels

### 🔒 Privacy & Security

- **100% Local**: No data leaves your browser
- **No Backend**: No server to hack
- **No Account**: No email or password needed
- **No Tracking**: No analytics by default
- **Your Control**: Export and delete anytime
- **Offline Works**: Full functionality offline

## Calculations

### Automatic Calculations

1. **Recurring Monthly Total**
   - Monthly expenses: Direct amount
   - Weekly expenses: Amount × 4.33
   - Sum of all active recurring expenses

2. **Total Monthly Expenses**
   - Recurring monthly total
   - One-time expenses in current month
   - Combined for accurate total

3. **Balance**
   - Income - Total Expenses
   - Updated in real-time
   - Color-coded positive/negative

4. **Trip Savings Metrics**
   - Remaining amount: Target - Saved
   - Percentage: (Saved / Target) × 100
   - Months remaining: Deadline - Today
   - Recommended monthly: Remaining / Months
   - On-track calculation: Expected vs Actual

5. **Category Percentages**
   - (Category Total / All Expenses) × 100
   - Shown in pie chart
   - Used for insights

6. **Daily Average**
   - Total Expenses / Days in Month
   - Real-time calculation
   - Helps budget daily spending

### Smart Features

- **Auto-save**: Every change saved instantly
- **Auto-calculate**: All totals update automatically
- **Auto-snapshot**: Monthly summaries created
- **Auto-insights**: Generated based on patterns
- **Auto-format**: Currency formatted correctly

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Brave
- ⚠️ Internet Explorer (Not supported)

## Future Enhancements

Potential features for future versions:
- Dark mode toggle
- Multiple currency support
- Budget limits per category
- Recurring expense templates
- PDF report generation
- Email reminders
- Mobile app (PWA)
- Cloud sync (optional)
- Multiple trip goals
- Category customization
- Expense search
- Advanced filtering
- Comparison charts
- Year-over-year analysis
- Budget forecasting

---

**Current Version: 1.0.0**

