const stocks = [
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    rank: 1,
    signal: "Strong Monthly Pick",
    confidence: "High",
    risk: "Moderate",
    valuation: "Slightly Expensive",
    trend: "Positive",
    investorFit: "Long-term growth investors",
    status: "Continued Pick",
    score: 86,
    scores: {
      fundamentals: 93,
      financialStrength: 88,
      valuation: 66,
      growth: 89,
      technical: 78,
      news: 84,
      geopolitical: 72,
      management: 91,
    },
    whyPicked: "Strong recurring revenue, high free cash flow, durable AI/cloud growth, and positive technical momentum.",
    mainRisk: "Premium valuation could limit near-term upside if cloud growth slows.",
    removalTrigger: "Downgrade if cloud growth slows materially, valuation becomes extreme, or price breaks below long-term support.",
    advisorSummary:
      "Microsoft remains a high-quality compounder with durable enterprise demand, strong cash generation, and a broad AI/cloud runway. The main caution is valuation, so it fits best as a core or core-satellite holding rather than an aggressive chase.",
    technicalView: "Trading above its 50-day and 200-day moving averages with positive relative strength versus the broad market.",
    newsView: "Recent news flow is supportive, with no detected thesis-breaking company or geopolitical event in this demo data.",
  },
  {
    ticker: "COST",
    name: "Costco Wholesale",
    rank: 2,
    signal: "Core Long-Term Candidate",
    confidence: "High",
    risk: "Low-Moderate",
    valuation: "Expensive",
    trend: "Positive",
    investorFit: "Conservative and moderate long-term investors",
    status: "New Pick",
    score: 82,
    scores: {
      fundamentals: 90,
      financialStrength: 86,
      valuation: 58,
      growth: 76,
      technical: 81,
      news: 80,
      geopolitical: 76,
      management: 88,
    },
    whyPicked: "Defensive demand, loyal membership economics, consistent cash flow, and a resilient long-term trend.",
    mainRisk: "Valuation remains rich compared with most retail peers.",
    removalTrigger: "Downgrade if membership trends weaken, margins compress, or valuation becomes unsupported by earnings growth.",
    advisorSummary:
      "Costco screens as a durable defensive compounder. The business quality is high, but its valuation leaves less room for error, making disciplined position sizing important.",
    technicalView: "Long-term uptrend is intact and volatility remains controlled compared with higher-beta growth stocks.",
    newsView: "News risk is low in this demo, with no major regulatory, funding, or geopolitical issue affecting the thesis.",
  },
  {
    ticker: "V",
    name: "Visa Inc.",
    rank: 3,
    signal: "Investable",
    confidence: "Medium-High",
    risk: "Moderate",
    valuation: "Reasonable Premium",
    trend: "Positive",
    investorFit: "Long-term quality investors",
    status: "Continued Pick",
    score: 80,
    scores: {
      fundamentals: 91,
      financialStrength: 83,
      valuation: 68,
      growth: 77,
      technical: 74,
      news: 75,
      geopolitical: 70,
      management: 85,
    },
    whyPicked: "High-margin network moat, strong cash generation, global payments growth, and constructive relative strength.",
    mainRisk: "Regulatory pressure on payment fees could reduce future profitability.",
    removalTrigger: "Downgrade if regulatory risk becomes severe, cross-border volume weakens, or technical leadership breaks.",
    advisorSummary:
      "Visa combines an asset-light model, strong margins, and long-term digital payment tailwinds. Regulatory risk is the primary issue to monitor.",
    technicalView: "Trend is constructive, with price action holding above key moving averages and relative strength improving.",
    newsView: "Regulatory news is monitored closely, but current demo impact remains moderate rather than thesis-breaking.",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com",
    rank: 4,
    signal: "Investable With Caution",
    confidence: "Medium",
    risk: "Moderate-High",
    valuation: "Fair-to-Premium",
    trend: "Improving",
    investorFit: "Aggressive long-term growth investors",
    status: "Upgraded Pick",
    score: 78,
    scores: {
      fundamentals: 84,
      financialStrength: 76,
      valuation: 64,
      growth: 86,
      technical: 73,
      news: 72,
      geopolitical: 64,
      management: 80,
    },
    whyPicked: "Improving margins, AWS strength, strong growth runway, and recovering technical momentum.",
    mainRisk: "Retail margin volatility and cloud competition can pressure earnings quality.",
    removalTrigger: "Downgrade if AWS growth disappoints, margins reverse, or news risk rises from antitrust or labor pressure.",
    advisorSummary:
      "Amazon is selected for improving profitability and a strong long-term growth runway. Its risk profile is higher than defensive picks, so it is better suited for investors comfortable with volatility.",
    technicalView: "Momentum has improved after a base-building period, but the stock still needs confirmation from sustained relative strength.",
    newsView: "Antitrust and labor headlines remain watch items, but the current demo data does not flag a thesis-breaking event.",
  },
  {
    ticker: "UNH",
    name: "UnitedHealth Group",
    rank: 5,
    signal: "Watchlist-to-Pick",
    confidence: "Medium",
    risk: "Moderate",
    valuation: "Attractive if execution stabilizes",
    trend: "Neutral-Improving",
    investorFit: "Moderate investors seeking healthcare exposure",
    status: "New Pick",
    score: 75,
    scores: {
      fundamentals: 79,
      financialStrength: 74,
      valuation: 72,
      growth: 70,
      technical: 62,
      news: 66,
      geopolitical: 78,
      management: 74,
    },
    whyPicked: "Healthcare scale, recurring demand, improved valuation, and early signs of technical stabilization.",
    mainRisk: "Regulatory, reimbursement, and execution risks remain elevated.",
    removalTrigger: "Downgrade if regulatory headlines worsen, margins fail to stabilize, or the stock loses its recovery trend.",
    advisorSummary:
      "UnitedHealth is a more conditional pick. It offers defensive healthcare exposure and better valuation, but the confidence level is lower because regulatory and execution risks require monitoring.",
    technicalView: "The trend is stabilizing but not yet as strong as the highest-ranked picks.",
    newsView: "Healthcare policy news is material for this stock, so the platform keeps a higher monitoring frequency.",
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    rank: 12,
    signal: "Watchlist",
    confidence: "Low-Medium",
    risk: "High",
    valuation: "Expensive",
    trend: "Weak",
    investorFit: "Aggressive investors only",
    status: "Not Picked",
    score: 58,
    scores: {
      fundamentals: 61,
      financialStrength: 70,
      valuation: 38,
      growth: 72,
      technical: 42,
      news: 52,
      geopolitical: 62,
      management: 55,
    },
    whyPicked: "Not picked: valuation risk, weaker technical trend, and elevated news sensitivity offset the growth opportunity.",
    mainRisk: "Margin pressure and demand uncertainty can weaken the long-term thesis.",
    removalTrigger: "Upgrade only if margins stabilize, relative strength improves, and valuation becomes better supported by earnings growth.",
    advisorSummary:
      "Tesla remains an innovative company with substantial optionality, but it does not currently meet the monthly pick criteria in this demo because valuation, technicals, and news risk reduce clarity.",
    technicalView: "Price action is weak relative to stronger large-cap candidates and remains below preferred trend thresholds.",
    newsView: "News flow is more volatile than the top picks, increasing the need for caution.",
  },
];

const portfolioRows = [
  {
    ticker: "MSFT",
    picked: "2026-04-01",
    returnText: "+8.4%",
    status: "Hold",
    reason: "Thesis intact; fundamentals and trend remain supportive.",
  },
  {
    ticker: "AMZN",
    picked: "2026-05-01",
    returnText: "+4.1%",
    status: "Upgraded",
    reason: "Margin trend and technical recovery improved the score.",
  },
  {
    ticker: "XYZ",
    picked: "2026-03-01",
    returnText: "-14.8%",
    status: "Removed",
    reason: "Guidance cut, negative news, and 200-day moving average breakdown.",
  },
  {
    ticker: "ABC",
    picked: "2026-02-01",
    returnText: "+18.2%",
    status: "Downgraded",
    reason: "Valuation became extreme after a rapid move without matching earnings growth.",
  },
];

const riskEvents = [
  {
    label: "Geopolitical",
    severity: "High relevance",
    headline: "Shipping-route tension lifts energy and logistics risk",
    affected: "Energy, airlines, shipping, global retailers",
    impact: "Mixed impact",
    thesisImpact: "Raises input-cost risk for consumer and airline stocks while supporting selected energy names.",
  },
  {
    label: "Company news",
    severity: "Material",
    headline: "Large software vendors continue AI infrastructure spending",
    affected: "MSFT, AMZN, NVDA, cloud ecosystem",
    impact: "Positive",
    thesisImpact: "Supports cloud and AI revenue runway, but also keeps valuation expectations high.",
  },
  {
    label: "Funding / capital",
    severity: "Watch",
    headline: "Speculative growth firms increase convertible debt issuance",
    affected: "Unprofitable growth and small-cap technology",
    impact: "Negative",
    thesisImpact: "Improves liquidity for some firms but can increase dilution and refinancing risk.",
  },
  {
    label: "Macro",
    severity: "Moderate",
    headline: "Rate expectations keep pressure on highly valued long-duration stocks",
    affected: "High-growth technology, REITs, leveraged firms",
    impact: "Negative for expensive names",
    thesisImpact: "Valuation scores are penalized when expected return depends too heavily on multiple expansion.",
  },
];

const weights = [
  ["Fundamental quality", 25],
  ["Financial strength", 15],
  ["Valuation", 15],
  ["Growth outlook", 15],
  ["Technical health", 10],
  ["News/event risk", 10],
  ["Geopolitical/macro risk", 5],
  ["Management/governance", 5],
];

const currency = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function scoreClass(score) {
  if (score >= 80) return "score-strong";
  if (score >= 65) return "score-good";
  if (score >= 50) return "score-watch";
  return "score-weak";
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function renderScoreBars(stock) {
  const entries = [
    ["Fundamentals", stock.scores.fundamentals],
    ["Financial strength", stock.scores.financialStrength],
    ["Valuation", stock.scores.valuation],
    ["Growth", stock.scores.growth],
    ["Technicals", stock.scores.technical],
    ["News risk", stock.scores.news],
    ["Geo/macro", stock.scores.geopolitical],
    ["Management", stock.scores.management],
  ];

  return entries
    .map(
      ([label, value]) => `
        <div class="score-row">
          <div><span>${label}</span><strong>${value}/100</strong></div>
          <div class="score-track"><span class="${scoreClass(value)}" style="width:${value}%"></span></div>
        </div>
      `,
    )
    .join("");
}

function renderAnalysis(stock) {
  const isPicked = stock.status !== "Not Picked";
  document.getElementById("analysis-card").innerHTML = `
    <div class="analysis-top">
      <div>
        <p class="eyebrow">${isPicked ? "Current report" : "Why not picked"}</p>
        <h3>${stock.name} <span>${stock.ticker}</span></h3>
        <p>${stock.advisorSummary}</p>
      </div>
      <div class="big-score ${scoreClass(stock.score)}">
        <span>${stock.score}</span>
        <small>/100</small>
      </div>
    </div>
    <div class="tag-row">
      <span>${stock.signal}</span>
      <span>Confidence: ${stock.confidence}</span>
      <span>Risk: ${stock.risk}</span>
      <span>Valuation: ${stock.valuation}</span>
      <span>Trend: ${stock.trend}</span>
    </div>
    <div class="reason-grid">
      <div class="reason-card primary-reason">
        <span>Short answer</span>
        <h4>${isPicked ? "Why picked" : "Why not picked"}</h4>
        <p>${stock.whyPicked}</p>
      </div>
      <div class="reason-card">
        <span>Main risk</span>
        <p>${stock.mainRisk}</p>
      </div>
      <div class="reason-card">
        <span>${isPicked ? "Removal trigger" : "Upgrade trigger"}</span>
        <p>${stock.removalTrigger}</p>
      </div>
    </div>
    <div class="analysis-details">
      <div>
        <h4>Score breakdown</h4>
        ${renderScoreBars(stock)}
      </div>
      <div class="detail-stack">
        <article>
          <h4>Technical view</h4>
          <p>${stock.technicalView}</p>
        </article>
        <article>
          <h4>News/geopolitical view</h4>
          <p>${stock.newsView}</p>
        </article>
        <article>
          <h4>Best fit</h4>
          <p>${stock.investorFit}</p>
        </article>
      </div>
    </div>
  `;
}

function renderPicks() {
  const picks = stocks.filter((stock) => stock.status !== "Not Picked").sort((a, b) => a.rank - b.rank);
  document.getElementById("monthly-picks").innerHTML = picks
    .map(
      (stock) => `
      <article class="pick-card">
        <div class="pick-header">
          <div>
            <span class="rank">#${stock.rank}</span>
            <h3>${stock.name}</h3>
            <p>${stock.ticker} · ${stock.status}</p>
          </div>
          <div class="mini-score ${scoreClass(stock.score)}">${stock.score}</div>
        </div>
        <div class="pick-tags">
          <span>${stock.signal}</span>
          <span>${stock.trend}</span>
          <span>${stock.risk}</span>
        </div>
        <div class="short-reason">
          <span>Why picked</span>
          <p>${stock.whyPicked}</p>
        </div>
        <dl>
          <div><dt>Main risk</dt><dd>${stock.mainRisk}</dd></div>
          <div><dt>Removal trigger</dt><dd>${stock.removalTrigger}</dd></div>
          <div><dt>Best for</dt><dd>${stock.investorFit}</dd></div>
        </dl>
        <button type="button" data-ticker="${stock.ticker}">View report</button>
      </article>
    `,
    )
    .join("");

  document.querySelectorAll(".pick-card button").forEach((button) => {
    button.addEventListener("click", () => {
      const stock = stocks.find((item) => item.ticker === button.dataset.ticker);
      if (stock) {
        renderAnalysis(stock);
        document.getElementById("analysis").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderPortfolio() {
  document.getElementById("portfolio-body").innerHTML = portfolioRows
    .map(
      (row) => `
      <tr>
        <td><strong>${row.ticker}</strong></td>
        <td>${row.picked}</td>
        <td>${row.returnText}</td>
        <td><span class="portfolio-status ${statusClass(row.status)}">${row.status}</span></td>
        <td>${row.reason}</td>
      </tr>
    `,
    )
    .join("");
}

function renderRiskFeed() {
  document.getElementById("risk-feed-list").innerHTML = riskEvents
    .map(
      (event) => `
      <article class="risk-card">
        <div>
          <span>${event.label}</span>
          <strong>${event.severity}</strong>
        </div>
        <h3>${event.headline}</h3>
        <p><b>Affected:</b> ${event.affected}</p>
        <p><b>Impact:</b> ${event.impact}</p>
        <p>${event.thesisImpact}</p>
      </article>
    `,
    )
    .join("");
}

function renderMethodologyWeights() {
  const container = document.querySelector(".method-grid");
  const scoreCard = document.createElement("article");
  scoreCard.className = "weight-card";
  scoreCard.innerHTML = `
    <span>05</span>
    <h3>Composite score</h3>
    <p>The MVP uses a ${currency.format(100)}-point model:</p>
    <ul>${weights.map(([label, value]) => `<li><span>${label}</span><strong>${value}%</strong></li>`).join("")}</ul>
  `;
  container.append(scoreCard);
}

function findStock(query) {
  const normalized = query.trim().toUpperCase();
  return stocks.find((stock) => stock.ticker === normalized || stock.name.toUpperCase().includes(normalized));
}

document.getElementById("stock-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const query = String(formData.get("ticker") || "");
  const stock = findStock(query) || stocks[0];
  renderAnalysis(stock);
  document.getElementById("analysis").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("rerank-button").addEventListener("click", () => {
  const cards = document.querySelectorAll(".pick-card");
  cards.forEach((card, index) => {
    card.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: `translateY(${index % 2 === 0 ? "-10px" : "10px"})`, opacity: 0.8 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { duration: 450, easing: "ease-out" },
    );
  });
});

renderAnalysis(stocks[0]);
renderPicks();
renderPortfolio();
renderRiskFeed();
renderMethodologyWeights();
