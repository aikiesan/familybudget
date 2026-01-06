# 💰 Personal Finance Balance Sheet WebApp

A modern, interactive personal finance management application built with Next.js 14+, Tailwind CSS, and Chart.js. Track your income, expenses, and savings goals with beautiful visualizations.

## 🚀 Features

### Core Functionality
- **Income Management**: Track monthly salary with payment dates
- **Expense Tracking**: 
  - One-time expenses with date tracking
  - Recurring expenses (monthly/weekly) with automatic calculations
  - 19+ pre-defined categories with custom icons
- **Germany Trip Savings Tracker**: 
  - Track progress toward your R$ 20,000 goal
  - Auto-calculated monthly recommendations
  - Visual progress indicators with status alerts
- **Time Period Views**: 
  - Weekly and monthly views
  - Navigate through previous/next periods
  - Historical tracking across months

### Visualizations
- **Pie Chart**: Expense distribution by category
- **Bar Chart**: Top 5 spending categories
- **Line Chart**: Monthly spending trends over time
- **Doughnut Chart**: Recurring vs one-time expenses breakdown

### Smart Insights
- Automatic spending analysis
- Category-based recommendations
- Budget alerts and warnings
- Savings opportunities identification
- Month-over-month comparisons

### Data Management
- **Local Storage**: All data stored in browser
- **Export**: Download data as JSON
- **Import**: Upload previous data backups
- **Clear**: Reset all data with confirmation

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Currency**: Brazilian Real (R$) formatting
- **Storage**: Browser localStorage
- **TypeScript**: Full type safety

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project_budget
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy this app is using Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

That's it! Your app will be live in minutes.

### Manual Deployment

Build the production version:
```bash
npm run build
npm start
```

## 📱 Usage

### Getting Started

1. **Set Your Income**: Click on the income card to enter your monthly salary
2. **Add Expenses**: Use the expense form to add one-time or recurring expenses
3. **Set Trip Goal**: Configure your Germany trip savings target and deadline
4. **Track Progress**: View your spending patterns through interactive charts
5. **Get Insights**: See personalized recommendations based on your spending

### Category List

- 🏠 Housing (Rent/Mortgage)
- ⚡ Utilities (Electricity, Water, Gas, Internet)
- 🍔 Food & Groceries
- 🍽️ Dining Out & Restaurants
- 🚗 Transportation
- 🏥 Healthcare & Pharmacy
- 🎓 Education & Research
- 📱 Subscriptions
- 🛍️ Shopping & Personal Care
- 🎮 Entertainment & Leisure
- 🚴 Sports & Fitness
- ✈️ Travel & Tourism
- 📚 Books & Learning
- 💻 Technology & Gadgets
- 🎁 Gifts & Donations
- 🔧 Maintenance & Repairs
- 🐾 Pets
- 💳 Bank Fees & Taxes
- 📦 Other

### Data Backup

⚠️ **Important**: All data is stored locally in your browser. Make sure to:
- Export your data regularly
- Save backups in a secure location
- Import data when switching browsers or devices

## 🎨 Design Highlights

### Minimalist & Elegant Design
- Clean, modern interface with subtle shadows
- Minimal color palette focused on usability
- Refined typography with proper hierarchy
- Generous white space for clarity
- Rounded corners (2xl) for modern feel
- Subtle borders instead of heavy shadows

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Floating action button on mobile

### Smart Calculations
- Automatic monthly expense totals
- Recurring expense prorating
- Balance calculations
- Trip savings recommendations

### Visual Feedback
- Color-coded categories with soft backgrounds
- Progress bars and indicators
- Status badges (on-track/behind/close)
- Smooth, refined animations

## 🔐 Privacy

- **100% Local**: No data sent to external servers
- **No Account Required**: No sign-up or login needed
- **Your Data, Your Control**: Export and delete anytime

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 💡 Tips

1. **Regular Exports**: Export your data weekly to prevent loss
2. **Categorize Properly**: Use consistent categories for better insights
3. **Track Everything**: Include all expenses for accurate analysis
4. **Set Realistic Goals**: Adjust your savings targets based on insights
5. **Review Monthly**: Check your monthly snapshots to track progress

## 🎯 Germany Trip Savings

The app includes a special feature to track savings for a Germany trip:
- Target: R$ 20,000
- Deadline: July 2026
- Automatic calculations for monthly savings needed
- Visual progress tracking with status indicators
- Customizable target and deadline

## 🐛 Known Issues

- Data is browser-specific (use export/import to transfer)
- No cloud sync (coming in future updates)
- No mobile app (PWA support planned)

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.

---

**Made with ❤️ for better financial management**
