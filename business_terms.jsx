import { useState } from "react";

const categories = [
  {
    id: "revenue",
    name: "Revenue Metrics",
    emoji: "💰",
    color: "#00C9A7",
    desc: "How much money is coming in",
    terms: [
      {
        term: "Revenue",
        abbr: null,
        definition: "Total money earned from sales before any deductions",
        formula: "Price × Quantity Sold",
        example: "Zerodha charges ₹20/trade × 1M trades = ₹2Cr revenue",
        fintech: "Brokerage fees, subscription fees, interest income",
        interview: "Always clarify: Gross Revenue (before deductions) vs Net Revenue (after refunds)",
        level: "basic"
      },
      {
        term: "Gross Revenue",
        abbr: "GMV",
        definition: "Total value of transactions processed (not what company keeps)",
        formula: "Sum of all transaction values",
        example: "Groww processes ₹100Cr in trades — that's GMV. They keep 0.05% = ₹5L",
        fintech: "Total trading volume on a platform",
        interview: "GMV ≠ Revenue! Common trap in interviews. Company only keeps a small %",
        level: "basic"
      },
      {
        term: "Monthly Recurring Revenue",
        abbr: "MRR",
        definition: "Predictable revenue expected every month from subscriptions",
        formula: "Number of Subscribers × Average Revenue Per User",
        example: "500 premium users × ₹999/month = ₹4.99L MRR",
        fintech: "Used by SaaS fintechs (portfolio tools, advisory platforms)",
        interview: "MRR growth % month-over-month shows business health",
        level: "intermediate"
      },
      {
        term: "Annual Recurring Revenue",
        abbr: "ARR",
        definition: "MRR × 12. The annualized view of subscription revenue",
        formula: "MRR × 12",
        example: "₹4.99L MRR × 12 = ₹59.9L ARR",
        fintech: "Investors use ARR to value subscription-based fintechs",
        interview: "ARR is a forecast, not actual. Good for investor presentations",
        level: "intermediate"
      },
      {
        term: "Average Order Value",
        abbr: "AOV",
        definition: "Average amount spent per transaction",
        formula: "Total Revenue ÷ Number of Orders",
        example: "₹10L revenue from 1000 orders = ₹1000 AOV",
        fintech: "Average trade size, average loan amount, average deposit",
        interview: "Increase AOV = upsell/cross-sell strategy. Key lever for growth",
        level: "basic"
      },
      {
        term: "Average Revenue Per User",
        abbr: "ARPU",
        definition: "Average revenue generated per user in a period",
        formula: "Total Revenue ÷ Total Active Users",
        example: "₹1Cr revenue from 10,000 users = ₹1000 ARPU",
        fintech: "Compare ARPU of premium vs free users to see tier value",
        interview: "ARPU dropping? Either prices fell or low-value users growing faster",
        level: "intermediate"
      }
    ]
  },
  {
    id: "customer",
    name: "Customer Metrics",
    emoji: "👥",
    color: "#4ECDC4",
    desc: "Understanding your users",
    terms: [
      {
        term: "Daily Active Users",
        abbr: "DAU",
        definition: "Unique users who perform a meaningful action in a day",
        formula: "Count of unique users active on a given day",
        example: "50,000 users logged in and placed at least 1 trade today",
        fintech: "Zerodha DAU = traders who placed at least 1 order",
        interview: "Define 'active' carefully — logging in vs actually trading",
        level: "basic"
      },
      {
        term: "Monthly Active Users",
        abbr: "MAU",
        definition: "Unique users who perform a meaningful action in a month",
        formula: "Count of unique users active in a 30-day window",
        example: "2M users traded at least once in January",
        fintech: "Industry standard for platform health measurement",
        interview: "DAU/MAU ratio = Stickiness. High ratio = users return daily",
        level: "basic"
      },
      {
        term: "DAU/MAU Ratio",
        abbr: "Stickiness",
        definition: "How often monthly users return daily. Shows product engagement",
        formula: "DAU ÷ MAU × 100",
        example: "50K DAU / 500K MAU = 10% stickiness",
        fintech: "WhatsApp ~70%, Facebook ~50%, Trading apps ~15-25%",
        interview: "Higher is better. <10% = low engagement. >50% = excellent",
        level: "intermediate"
      },
      {
        term: "Customer Acquisition Cost",
        abbr: "CAC",
        definition: "Total cost to acquire one new customer",
        formula: "Total Marketing + Sales Spend ÷ New Customers Acquired",
        example: "Spent ₹10L on ads, got 1000 new users = ₹1000 CAC",
        fintech: "Cost to open one new demat account",
        interview: "CAC should be < LTV/3 for healthy business (LTV:CAC ratio)",
        level: "intermediate"
      },
      {
        term: "Customer Lifetime Value",
        abbr: "LTV / CLV",
        definition: "Total revenue expected from a customer over their entire relationship",
        formula: "ARPU × Average Customer Lifespan",
        example: "₹500/month × 36 months = ₹18,000 LTV",
        fintech: "A long-term investor has much higher LTV than a one-time trader",
        interview: "LTV:CAC > 3:1 is healthy. < 1:1 means losing money per customer!",
        level: "intermediate"
      },
      {
        term: "Churn Rate",
        abbr: null,
        definition: "Percentage of customers who stop using your product in a period",
        formula: "Lost Customers ÷ Customers at Start × 100",
        example: "100 customers Jan 1, lost 5 by Jan 31 = 5% monthly churn",
        fintech: "Accounts closed, subscriptions cancelled, traders gone inactive",
        interview: "5% monthly churn = 46% annual churn. Compounding kills retention!",
        level: "basic"
      },
      {
        term: "Retention Rate",
        abbr: null,
        definition: "Percentage of customers who STAYED in a period",
        formula: "100% - Churn Rate",
        example: "5% churn = 95% retention",
        fintech: "Month 1 retention for new traders is critical signal",
        interview: "Retention by cohort shows if product is improving over time",
        level: "basic"
      },
      {
        term: "Net Promoter Score",
        abbr: "NPS",
        definition: "How likely are customers to recommend you? Scale 0-10",
        formula: "% Promoters (9-10) - % Detractors (0-6)",
        example: "60% promoters - 15% detractors = NPS of 45",
        fintech: "Zerodha famous for high NPS in Indian fintech",
        interview: ">50 is excellent, >70 is world-class. Apple ~72, Tesla ~97",
        level: "basic"
      }
    ]
  },
  {
    id: "growth",
    name: "Growth Metrics",
    emoji: "📈",
    color: "#FFE66D",
    desc: "How fast are you growing",
    terms: [
      {
        term: "Month-over-Month Growth",
        abbr: "MoM",
        definition: "Growth percentage compared to previous month",
        formula: "(This Month - Last Month) ÷ Last Month × 100",
        example: "Revenue: Jan ₹10L → Feb ₹12L = 20% MoM growth",
        fintech: "User signups, trading volume, revenue — all tracked MoM",
        interview: "Consistent 10% MoM = 3x growth per year. Very strong!",
        level: "basic"
      },
      {
        term: "Year-over-Year Growth",
        abbr: "YoY",
        definition: "Growth compared to same period last year",
        formula: "(This Year Period - Last Year Period) ÷ Last Year × 100",
        example: "Jan 2024 ₹10L vs Jan 2023 ₹7L = 43% YoY growth",
        fintech: "Removes seasonality — apples to apples comparison",
        interview: "Always prefer YoY over MoM for seasonal businesses",
        level: "basic"
      },
      {
        term: "Compound Annual Growth Rate",
        abbr: "CAGR",
        definition: "Smoothed annual growth rate over multiple years",
        formula: "(End Value / Start Value)^(1/Years) - 1",
        example: "₹100 → ₹161 in 3 years = 17.2% CAGR",
        fintech: "AUM growth, portfolio returns, platform user growth",
        interview: "CAGR hides year-to-year volatility. Always ask for annual breakdown too",
        level: "intermediate"
      },
      {
        term: "Growth Rate",
        abbr: null,
        definition: "Simple percentage change between two periods",
        formula: "(New - Old) ÷ Old × 100",
        example: "1000 users → 1200 users = 20% growth",
        fintech: "Applied to any metric: users, revenue, trades, AUM",
        interview: "Always ask: growth in absolute numbers or percentage? Both matter",
        level: "basic"
      },
      {
        term: "Viral Coefficient",
        abbr: "K-factor",
        definition: "How many new users each existing user brings in",
        formula: "Invites Sent per User × Conversion Rate of Invites",
        example: "Each user invites 5 friends, 20% convert = K-factor of 1.0",
        fintech: "Referral programs in Groww, Zerodha, CRED",
        interview: "K > 1 = exponential viral growth. K < 1 = needs paid acquisition",
        level: "advanced"
      }
    ]
  },
  {
    id: "product",
    name: "Product Metrics",
    emoji: "🎯",
    color: "#F97316",
    desc: "How users interact with product",
    terms: [
      {
        term: "Conversion Rate",
        abbr: "CVR",
        definition: "% of users who complete a desired action",
        formula: "Conversions ÷ Total Visitors × 100",
        example: "1000 users visit signup page, 150 sign up = 15% CVR",
        fintech: "Signup → KYC → First trade funnel conversion",
        interview: "Always specify: conversion from what to what? Define the funnel step",
        level: "basic"
      },
      {
        term: "Click-Through Rate",
        abbr: "CTR",
        definition: "% of people who click a link/button after seeing it",
        formula: "Clicks ÷ Impressions × 100",
        example: "1000 saw email, 80 clicked = 8% CTR",
        fintech: "Email campaigns, push notifications, in-app prompts",
        interview: "Good CTR varies by channel: Email 2-5%, Push notif 3-10%",
        level: "basic"
      },
      {
        term: "Bounce Rate",
        abbr: null,
        definition: "% of visitors who leave after viewing only one page",
        formula: "Single-page sessions ÷ Total sessions × 100",
        example: "1000 visitors, 600 left immediately = 60% bounce rate",
        fintech: "High bounce on signup page = registration is too complex",
        interview: "High bounce = bad UX or wrong audience targeting",
        level: "basic"
      },
      {
        term: "Session Duration",
        abbr: null,
        definition: "Average time a user spends in a single app/website session",
        formula: "Total session time ÷ Number of sessions",
        example: "Users spend avg 8 minutes per trading app session",
        fintech: "Longer sessions = more engaged traders = more trades",
        interview: "Context matters: news app wants long sessions, checkout wants short!",
        level: "basic"
      },
      {
        term: "Feature Adoption Rate",
        abbr: null,
        definition: "% of users using a specific feature",
        formula: "Users using feature ÷ Total users × 100",
        example: "SIP feature: 200K of 2M users use it = 10% adoption",
        fintech: "Which features drive retention? Build more of those!",
        interview: "Low adoption ≠ bad feature. Could be poor discoverability",
        level: "intermediate"
      },
      {
        term: "Time to Value",
        abbr: "TTV",
        definition: "How long it takes a new user to experience core product value",
        formula: "Average time from signup to first meaningful action",
        example: "New Zerodha user: signup → first trade in 3 days avg",
        fintech: "Shorter TTV = better onboarding = better retention",
        interview: "If TTV > 7 days, users likely churn before experiencing value",
        level: "intermediate"
      }
    ]
  },
  {
    id: "financial",
    name: "Financial KPIs",
    emoji: "🏦",
    color: "#A855F7",
    desc: "Business health indicators",
    terms: [
      {
        term: "Gross Margin",
        abbr: null,
        definition: "Revenue minus direct costs, as a percentage",
        formula: "(Revenue - COGS) ÷ Revenue × 100",
        example: "₹100 revenue, ₹30 direct costs = 70% gross margin",
        fintech: "Software fintechs have 70-90% margins. Lending fintechs lower",
        interview: "Higher gross margin = more room for growth investment",
        level: "intermediate"
      },
      {
        term: "Burn Rate",
        abbr: null,
        definition: "How much cash a startup spends per month",
        formula: "Monthly cash outflow (expenses)",
        example: "Startup spends ₹50L/month = ₹50L burn rate",
        fintech: "Critical for funded fintechs — how long until they run out?",
        interview: "Runway = Cash in bank ÷ Burn Rate (months until broke)",
        level: "intermediate"
      },
      {
        term: "Runway",
        abbr: null,
        definition: "How many months of operation left with current cash",
        formula: "Cash Balance ÷ Monthly Burn Rate",
        example: "₹5Cr cash, ₹50L burn = 10 months runway",
        fintech: "Startups aim for 18+ months runway before next fundraise",
        interview: "Short runway = pressure to raise money or cut costs fast",
        level: "intermediate"
      },
      {
        term: "Return on Investment",
        abbr: "ROI",
        definition: "Profit generated relative to investment made",
        formula: "(Gain - Cost) ÷ Cost × 100",
        example: "Invested ₹1L in campaign, got ₹3L revenue = 200% ROI",
        fintech: "Marketing ROI, feature ROI, product ROI",
        interview: "Always ask: over what time period? ROI without timeframe is meaningless",
        level: "basic"
      },
      {
        term: "Assets Under Management",
        abbr: "AUM",
        definition: "Total market value of assets managed on behalf of clients",
        formula: "Sum of all client portfolio values",
        example: "Zerodha manages ₹3.5 lakh crore AUM",
        fintech: "KEY metric for wealth management, mutual funds, robo-advisors",
        interview: "AUM growth = more fees. AUM = scale indicator for investment platforms",
        level: "intermediate"
      },
      {
        term: "Net Interest Margin",
        abbr: "NIM",
        definition: "Difference between interest earned and interest paid, as % of assets",
        formula: "(Interest Income - Interest Expense) ÷ Average Earning Assets × 100",
        example: "Lend at 12%, borrow at 7% = 5% NIM",
        fintech: "Critical for lending fintechs and NBFCs",
        interview: "Higher NIM = more profitable lending. Compressed by competition",
        level: "advanced"
      }
    ]
  },
  {
    id: "operational",
    name: "Operational Metrics",
    emoji: "⚙️",
    color: "#06B6D4",
    desc: "How efficiently things run",
    terms: [
      {
        term: "Uptime / Availability",
        abbr: "SLA",
        definition: "% of time the system is operational and accessible",
        formula: "(Total Time - Downtime) ÷ Total Time × 100",
        example: "99.9% uptime = 8.7 hours downtime per year",
        fintech: "Trading platforms: downtime during market hours = direct revenue loss!",
        interview: "Five 9s (99.999%) = 5 min/year downtime. Very high standard",
        level: "intermediate"
      },
      {
        term: "Mean Time to Resolution",
        abbr: "MTTR",
        definition: "Average time to fix an incident or bug",
        formula: "Total resolution time ÷ Number of incidents",
        example: "10 bugs, total fix time 20 hours = 2hr MTTR",
        fintech: "Critical for trading platforms where every minute = money lost",
        interview: "Lower MTTR = better engineering. Important for reliability-focused roles",
        level: "advanced"
      },
      {
        term: "Cost Per Acquisition",
        abbr: "CPA",
        definition: "Cost to acquire one specific action (not just customer)",
        formula: "Campaign Cost ÷ Number of Acquisitions",
        example: "₹1L ad spend, 500 account openings = ₹200 CPA",
        fintech: "Cost per demat account, cost per first trade, cost per KYC",
        interview: "More specific than CAC — can track CPA per campaign/channel",
        level: "intermediate"
      },
      {
        term: "Support Ticket Volume",
        abbr: null,
        definition: "Number of customer support requests in a period",
        formula: "Count of tickets raised",
        example: "500 tickets/day. After UI fix: 300 tickets/day",
        fintech: "High volume on specific feature = that feature needs fixing",
        interview: "Spikes in ticket volume = leading indicator of product problems",
        level: "basic"
      }
    ]
  },
  {
    id: "analyst",
    name: "Analyst-Specific Terms",
    emoji: "🔍",
    color: "#EC4899",
    desc: "Terms used daily in analyst work",
    terms: [
      {
        term: "Funnel",
        abbr: null,
        definition: "Sequential steps users take towards a goal, with drop-offs at each stage",
        formula: "Conversion Rate = Stage N ÷ Stage 1 × 100",
        example: "Visit → Signup → KYC → Deposit → Trade",
        fintech: "Entire customer journey from awareness to first trade",
        interview: "Always find the biggest drop-off point — that's where to focus",
        level: "basic"
      },
      {
        term: "Cohort",
        abbr: null,
        definition: "Group of users who share a common characteristic at the same time",
        formula: "GROUP BY signup_month (or first action month)",
        example: "Jan 2024 cohort = all users who signed up in January 2024",
        fintech: "Compare retention across acquisition cohorts",
        interview: "Cohort analysis reveals if product quality is improving over time",
        level: "basic"
      },
      {
        term: "Segmentation",
        abbr: null,
        definition: "Dividing users into groups based on shared characteristics",
        formula: "Group by: demographics, behavior, value, geography",
        example: "Power traders (>50 trades/month) vs casual (1-5 trades/month)",
        fintech: "High-value vs low-value customers require different strategies",
        interview: "Always ask: what segment is driving growth? Or causing churn?",
        level: "basic"
      },
      {
        term: "North Star Metric",
        abbr: "NSM",
        definition: "The ONE metric that best captures core product value",
        formula: "Company-specific. One metric that drives all others",
        example: "Zerodha NSM = Daily trades placed. Groww NSM = SIPs activated",
        fintech: "All teams align to improve this single metric",
        interview: "Knowing a company's NSM shows strategic understanding",
        level: "intermediate"
      },
      {
        term: "Leading vs Lagging Indicator",
        abbr: null,
        definition: "Leading = predicts future. Lagging = confirms past",
        formula: "N/A — conceptual framework",
        example: "Leading: trial signups. Lagging: revenue (result of signups)",
        fintech: "Leading: new demat accounts opened. Lagging: trading volume",
        interview: "Great analysts track leading indicators to predict lagging ones",
        level: "intermediate"
      },
      {
        term: "Vanity Metric",
        abbr: null,
        definition: "Metric that looks good but doesn't drive business decisions",
        formula: "N/A",
        example: "Total app downloads (many never open). Better: DAU",
        fintech: "Total registered users (vs active users who actually trade)",
        interview: "Interviewers love when you distinguish vanity vs actionable metrics",
        level: "intermediate"
      },
      {
        term: "Actionable Metric",
        abbr: null,
        definition: "Metric you can directly act on to change outcomes",
        formula: "N/A",
        example: "Day-7 retention rate → run re-engagement campaign on day 5",
        fintech: "% of KYC drop-offs → simplify KYC form",
        interview: "Every metric you track should answer: 'So what do we DO?'",
        level: "intermediate"
      },
      {
        term: "A/B Test",
        abbr: null,
        definition: "Controlled experiment comparing two versions of something",
        formula: "Lift = (B - A) ÷ A × 100",
        example: "Green button (A) vs Red button (B). B has 15% higher CTR",
        fintech: "Test new onboarding flow vs old. Test fee structure changes",
        interview: "State: hypothesis, sample size, duration, success metric",
        level: "intermediate"
      },
      {
        term: "Root Cause Analysis",
        abbr: "RCA",
        definition: "Finding WHY a metric changed, not just that it changed",
        formula: "5 Whys: Keep asking 'why?' until root cause found",
        example: "DAU fell 20% → why? → app crash → why? → bad deployment",
        fintech: "Trading volume dropped → market holiday? System issue? Competition?",
        interview: "Don't just report the metric. Explain the WHY. This impresses!",
        level: "basic"
      },
      {
        term: "Data Granularity",
        abbr: null,
        definition: "Level of detail in data — hourly, daily, weekly, monthly",
        formula: "DATE_TRUNC('day'/'week'/'month', timestamp)",
        example: "Daily granularity for ops. Monthly for business reviews",
        fintech: "Tick data (every trade) vs daily OHLCV (Open High Low Close Volume)",
        interview: "Always match granularity to the question being answered",
        level: "intermediate"
      }
    ]
  },
  {
    id: "capital_markets",
    name: "Capital Markets Terms",
    emoji: "💹",
    color: "#00C9A7",
    desc: "Fintech & trading specific",
    terms: [
      {
        term: "Assets Under Management",
        abbr: "AUM",
        definition: "Total value of all client assets managed by a firm",
        formula: "Sum of all portfolio values",
        example: "Mirae Asset manages ₹1.5 lakh crore AUM",
        fintech: "Larger AUM = more fee income = larger firm",
        interview: "AUM growth rate shows business momentum",
        level: "basic"
      },
      {
        term: "OHLCV",
        abbr: null,
        definition: "Open, High, Low, Close, Volume — standard price data format",
        formula: "Daily: first price, highest, lowest, last price, shares traded",
        example: "Reliance on 1 Jan: O=2400, H=2450, L=2380, C=2430, V=2M",
        fintech: "Foundation of all technical analysis and charting",
        interview: "Every trading analyst must know this cold",
        level: "basic"
      },
      {
        term: "Alpha",
        abbr: "α",
        definition: "Returns above the benchmark (excess return)",
        formula: "Portfolio Return - Benchmark Return",
        example: "Portfolio +15%, Nifty +10% = Alpha of +5%",
        fintech: "Fund managers are judged by alpha generation",
        interview: "Positive alpha = manager adds value beyond market returns",
        level: "intermediate"
      },
      {
        term: "Beta",
        abbr: "β",
        definition: "How much a stock moves relative to the market",
        formula: "Cov(Stock, Market) ÷ Var(Market)",
        example: "Beta 1.5 = stock moves 1.5x market. Market +10% → Stock +15%",
        fintech: "High beta = aggressive stock. Beta <1 = defensive stock",
        interview: "Beta >1 = amplifies market moves. Beta <1 = cushions them",
        level: "intermediate"
      },
      {
        term: "Sharpe Ratio",
        abbr: null,
        definition: "Return per unit of risk. Higher = better risk-adjusted return",
        formula: "(Portfolio Return - Risk Free Rate) ÷ Std Dev of Returns",
        example: "Return 15%, Risk-free 6%, Std Dev 9% = Sharpe of 1.0",
        fintech: "Comparing two funds: Fund A Sharpe 1.5 > Fund B Sharpe 0.8",
        interview: ">1 is good. >2 is very good. >3 is excellent",
        level: "advanced"
      },
      {
        term: "Drawdown",
        abbr: null,
        definition: "Peak-to-trough decline in portfolio value",
        formula: "(Trough Value - Peak Value) ÷ Peak Value × 100",
        example: "Portfolio hit ₹10L peak, fell to ₹7L = -30% drawdown",
        fintech: "Max drawdown = worst loss from peak. Risk metric for strategies",
        interview: "Low max drawdown = strategy protects capital in downturns",
        level: "intermediate"
      },
      {
        term: "Liquidity",
        abbr: null,
        definition: "Ease of buying/selling an asset without affecting its price",
        formula: "Measured by: bid-ask spread, trading volume, market depth",
        example: "Nifty 50 stocks = highly liquid. Small-cap = low liquidity",
        fintech: "Liquidity risk = can't exit position at desired price",
        interview: "Always ask: how liquid is this asset? Illiquid = higher risk",
        level: "basic"
      },
      {
        term: "Basis Points",
        abbr: "bps",
        definition: "1/100th of 1 percent. Used for small rate changes",
        formula: "1 bps = 0.01% = 0.0001",
        example: "RBI raised rates by 25 bps = 0.25% increase",
        fintech: "Fees, interest rates, spreads all quoted in bps",
        interview: "Know this cold! '50 bps' comes up constantly in finance",
        level: "basic"
      },
      {
        term: "P&L",
        abbr: "PnL",
        definition: "Profit and Loss — realized and unrealized gains/losses",
        formula: "Realized PnL + Unrealized PnL",
        example: "Sold stock: +₹5000 realized. Holding stock: +₹2000 unrealized",
        fintech: "Daily PnL tracking for traders and portfolio managers",
        interview: "Realized vs Unrealized is an important distinction",
        level: "basic"
      }
    ]
  }
];

const levelColors = { basic: "#00C9A7", intermediate: "#FFE66D", advanced: "#FF6B6B" };
const levelLabels = { basic: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

export default function BusinessTerms() {
  const [activeCategory, setActiveCategory] = useState("revenue");
  const [activeTerm, setActiveTerm] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [flipped, setFlipped] = useState(new Set());

  const cat = categories.find(c => c.id === activeCategory);

  const allTerms = categories.flatMap(c => c.terms.map(t => ({ ...t, catColor: c.color, catName: c.name })));
  const searchResults = search.length > 1 ? allTerms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.abbr?.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const filteredTerms = cat?.terms.filter(t => filter === "all" || t.level === filter) || [];

  const totalTerms = categories.reduce((a, c) => a + c.terms.length, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Georgia', serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d0d0d, #111)", borderBottom: "1px solid #1a1a1a", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>Business Terms <span style={{ color: "#00C9A7" }}>& KPIs</span></div>
              <div style={{ color: "#555", fontSize: 13, marginTop: 2, fontFamily: "monospace" }}>{totalTerms} terms across {categories.length} categories · Fintech Edition</div>
            </div>
            <input
              placeholder="Search any term or abbreviation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: "#111", border: "1px solid #333", borderRadius: 8, padding: "10px 16px", color: "#fff", fontSize: 14, width: 280, outline: "none", fontFamily: "inherit" }}
            />
          </div>

          {/* Search Results */}
          {search.length > 1 && (
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: 12, marginBottom: 12, maxHeight: 200, overflowY: "auto" }}>
              {searchResults.length === 0 ? (
                <div style={{ color: "#555", fontSize: 13 }}>No terms found</div>
              ) : searchResults.map((t, i) => (
                <div key={i} onClick={() => { setSearch(""); setActiveCategory(categories.find(c => c.terms.includes(t) || c.name === t.catName)?.id || activeCategory); setActiveTerm(t); }}
                  style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #1a1a1a" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a1a1a"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ color: t.catColor, fontWeight: 700, fontSize: 14, minWidth: 120 }}>{t.term}</span>
                  {t.abbr && <span style={{ color: "#555", fontSize: 12, fontFamily: "monospace" }}>{t.abbr}</span>}
                  <span style={{ color: "#777", fontSize: 12, flex: 1 }}>{t.catName}</span>
                </div>
              ))}
            </div>
          )}

          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => { setActiveCategory(c.id); setActiveTerm(null); }} style={{
                padding: "7px 14px", borderRadius: 20, border: `1px solid ${activeCategory === c.id ? c.color : "#222"}`,
                background: activeCategory === c.id ? c.color + "18" : "transparent",
                color: activeCategory === c.id ? c.color : "#555",
                cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: activeCategory === c.id ? 700 : 400,
                transition: "all 0.2s"
              }}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px", display: "flex", gap: 20 }}>
        {/* Left: Term List */}
        <div style={{ width: activeTerm ? 300 : "100%", flexShrink: 0, transition: "width 0.3s" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ color: cat?.color, fontSize: 22 }}>{cat?.emoji}</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 17 }}>{cat?.name}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{cat?.desc}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["all", "basic", "intermediate", "advanced"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "4px 10px", borderRadius: 12, border: `1px solid ${filter === f ? (levelColors[f] || cat?.color) : "#222"}`,
                  background: filter === f ? (levelColors[f] || cat?.color) + "22" : "transparent",
                  color: filter === f ? (levelColors[f] || cat?.color) : "#555",
                  cursor: "pointer", fontSize: 11, fontFamily: "inherit"
                }}>{f === "all" ? "All" : levelLabels[f]}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredTerms.map((term, i) => (
              <div key={i} onClick={() => setActiveTerm(activeTerm?.term === term.term ? null : term)}
                style={{
                  background: activeTerm?.term === term.term ? cat?.color + "11" : "#0d0d0d",
                  border: `1px solid ${activeTerm?.term === term.term ? cat?.color + "44" : "#1a1a1a"}`,
                  borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { if (activeTerm?.term !== term.term) e.currentTarget.style.background = "#111" }}
                onMouseLeave={e => { if (activeTerm?.term !== term.term) e.currentTarget.style.background = "#0d0d0d" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: activeTerm?.term === term.term ? cat?.color : "#ddd" }}>{term.term}</span>
                      {term.abbr && <span style={{ color: "#444", fontSize: 12, fontFamily: "monospace", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4 }}>{term.abbr}</span>}
                      <span style={{ marginLeft: "auto", fontSize: 10, color: levelColors[term.level], background: levelColors[term.level] + "18", padding: "2px 8px", borderRadius: 10 }}>{levelLabels[term.level]}</span>
                    </div>
                    {!activeTerm && <div style={{ color: "#444", fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{term.definition}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Term Detail */}
        {activeTerm && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: "#0d0d0d", border: `1px solid ${cat?.color}33`, borderRadius: 14, overflow: "hidden" }}>
              {/* Term Header */}
              <div style={{ background: `linear-gradient(135deg, ${cat?.color}18, #0d0d0d)`, padding: 24, borderBottom: `1px solid ${cat?.color}22` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>{activeTerm.term}</div>
                    {activeTerm.abbr && <div style={{ color: cat?.color, fontFamily: "monospace", fontSize: 16, marginTop: 4 }}>{activeTerm.abbr}</div>}
                  </div>
                  <button onClick={() => setActiveTerm(null)} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#888", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
                </div>
                <div style={{ color: "#aaa", fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{activeTerm.definition}</div>
              </div>

              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Formula */}
                <div>
                  <div style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>📐 Formula</div>
                  <div style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: 14, fontFamily: "monospace", color: cat?.color, fontSize: 14, lineHeight: 1.6 }}>{activeTerm.formula}</div>
                </div>

                {/* Example */}
                <div>
                  <div style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>💡 Example</div>
                  <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: 14, color: "#ccc", fontSize: 14, lineHeight: 1.7 }}>{activeTerm.example}</div>
                </div>

                {/* Fintech Context */}
                <div>
                  <div style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>💹 Fintech Context</div>
                  <div style={{ background: "#0a1a15", border: "1px solid #00C9A722", borderRadius: 8, padding: 14, color: "#aaa", fontSize: 14, lineHeight: 1.7 }}>{activeTerm.fintech}</div>
                </div>

                {/* Interview Tip */}
                <div>
                  <div style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>🎯 Interview Tip</div>
                  <div style={{ background: "#1a1a0a", border: "1px solid #FFE66D22", borderRadius: 8, padding: 14, color: "#FFE66D", fontSize: 14, lineHeight: 1.7 }}>{activeTerm.interview}</div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: levelColors[activeTerm.level] + "11", border: `1px solid ${levelColors[activeTerm.level]}33`, borderRadius: 8, padding: 10, textAlign: "center" }}>
                    <div style={{ color: levelColors[activeTerm.level], fontWeight: 700, fontSize: 12 }}>Level</div>
                    <div style={{ color: "#aaa", fontSize: 13 }}>{levelLabels[activeTerm.level]}</div>
                  </div>
                  <div style={{ flex: 1, background: cat?.color + "11", border: `1px solid ${cat?.color}33`, borderRadius: 8, padding: 10, textAlign: "center" }}>
                    <div style={{ color: cat?.color, fontWeight: 700, fontSize: 12 }}>Category</div>
                    <div style={{ color: "#aaa", fontSize: 13 }}>{cat?.emoji} {cat?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
