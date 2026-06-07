const weights = [
  ["Fundamental quality", 25, "fundamentals"],
  ["Financial strength", 15, "financialStrength"],
  ["Valuation", 15, "valuation"],
  ["Growth outlook", 15, "growth"],
  ["Technical health", 10, "technical"],
  ["News/event risk", 10, "news"],
  ["Geopolitical/macro risk", 5, "geopolitical"],
  ["Management/governance", 5, "management"],
];

const monthlyPickLimit = 6;
const minEligibilityScore = 65;
const minLiquidityScore = 60;
const minDataQualityScore = 70;
const maxSectorPicks = 2;
const requiredEtfPicks = 1;

const stocks = [
  createInstrument({
    ticker: "RELIANCE.NS",
    name: "Reliance Industries",
    sector: "Energy + Consumer",
    assetType: "Stock",
    scores: scoreSet(88, 84, 68, 86, 79, 82, 72, 86),
    liquidityScore: 96,
    dataQualityScore: 95,
    investorFit: "Long-term Indian large-cap investors",
    thesis: "Diversified energy-to-consumer platform with retail, digital, and cash-flow optionality.",
    mainRisk: "Energy-cycle volatility and capex intensity can pressure near-term returns.",
    removalTrigger: "Downgrade if refining weakness, debt pressure, or weak technical action reduces the long-term thesis.",
    technicalView: "Positive trend with assumed price strength versus the Nifty 50.",
    newsView: "No thesis-breaking India-specific news is flagged in this sample data; energy and telecom regulation remain watch items.",
  }),
  createInstrument({
    ticker: "HDFCBANK.NS",
    name: "HDFC Bank",
    sector: "Financials",
    assetType: "Stock",
    scores: scoreSet(86, 88, 74, 76, 68, 78, 82, 84),
    liquidityScore: 98,
    dataQualityScore: 96,
    investorFit: "Long-term banking and financial-sector investors",
    thesis: "Large deposit franchise, improving valuation, and long-term credit growth opportunity.",
    mainRisk: "Post-merger execution, margin pressure, and asset-quality cycle risk should be monitored.",
    removalTrigger: "Downgrade if asset quality worsens, deposit growth weakens, or the technical recovery fails.",
    technicalView: "Improving, but still needs sustained relative strength confirmation versus Bank Nifty.",
    newsView: "Banking regulation, deposit growth, and margin commentary are the key watch items.",
  }),
  createInstrument({
    ticker: "INFY.NS",
    name: "Infosys",
    sector: "Information Technology",
    assetType: "Stock",
    scores: scoreSet(82, 90, 70, 72, 76, 74, 70, 82),
    liquidityScore: 94,
    dataQualityScore: 95,
    investorFit: "Long-term IT services investors",
    thesis: "Net-cash balance sheet, resilient margins, reasonable valuation, and improving IT-services momentum.",
    mainRisk: "International discretionary tech spending slowdown can delay revenue acceleration.",
    removalTrigger: "Downgrade if large-deal momentum weakens, guidance disappoints, or rupee/client-demand risk rises materially.",
    technicalView: "Constructive momentum among large-cap IT names.",
    newsView: "Overseas client budgets, rupee movement, and IT-services demand are the most important variables.",
  }),
  createInstrument({
    ticker: "TCS.NS",
    name: "Tata Consultancy Services",
    sector: "Information Technology",
    assetType: "Stock",
    scores: scoreSet(86, 92, 62, 70, 72, 76, 72, 88),
    liquidityScore: 95,
    dataQualityScore: 96,
    investorFit: "Quality-focused IT investors",
    thesis: "High-quality IT services franchise with strong cash conversion and durable enterprise relationships.",
    mainRisk: "Premium valuation and slower overseas discretionary spending can limit upside.",
    removalTrigger: "Downgrade if margin discipline weakens or deal conversion disappoints.",
    technicalView: "Stable trend but slightly less attractive valuation setup than Infosys in this sample.",
    newsView: "Client spending and currency movement are key watch items.",
  }),
  createInstrument({
    ticker: "ICICIBANK.NS",
    name: "ICICI Bank",
    sector: "Financials",
    assetType: "Stock",
    scores: scoreSet(84, 84, 67, 78, 75, 76, 82, 81),
    liquidityScore: 97,
    dataQualityScore: 95,
    investorFit: "Moderate investors seeking private-bank exposure",
    thesis: "Healthy private-bank franchise, consistent execution, strong asset quality, and positive sector momentum.",
    mainRisk: "Banking-cycle risk, margin pressure, and sector concentration if paired with other financial stocks.",
    removalTrigger: "Downgrade if asset-quality indicators weaken, margins compress sharply, or Bank Nifty leadership breaks.",
    technicalView: "Positive and supported by private-bank sector momentum.",
    newsView: "Credit growth, deposit competition, RBI policy, and asset-quality commentary are key watch items.",
  }),
  createInstrument({
    ticker: "BHARTIARTL.NS",
    name: "Bharti Airtel",
    sector: "Telecom",
    assetType: "Stock",
    scores: scoreSet(82, 78, 64, 82, 82, 78, 76, 80),
    liquidityScore: 93,
    dataQualityScore: 94,
    investorFit: "Long-term India telecom and digital-infrastructure investors",
    thesis: "Pricing power, premium subscriber mix, and steady telecom cash-flow improvement.",
    mainRisk: "Spectrum costs, leverage, and regulatory pricing pressure remain watch items.",
    removalTrigger: "Downgrade if ARPU growth stalls, leverage worsens, or technical leadership breaks.",
    technicalView: "Strong relative strength and positive long-term trend in this sample model.",
    newsView: "Tariff changes, regulatory actions, and capex commentary are important.",
  }),
  createInstrument({
    ticker: "LT.NS",
    name: "Larsen & Toubro",
    sector: "Industrials",
    assetType: "Stock",
    scores: scoreSet(83, 82, 66, 81, 78, 77, 74, 84),
    liquidityScore: 92,
    dataQualityScore: 94,
    investorFit: "Infrastructure and capex-cycle investors",
    thesis: "Strong order book, execution capability, and India capex-cycle exposure.",
    mainRisk: "Execution delays, input costs, and capex-cycle sensitivity can affect returns.",
    removalTrigger: "Downgrade if order inflows weaken, margins compress, or project execution deteriorates.",
    technicalView: "Constructive trend with cyclical leadership support.",
    newsView: "Government capex, infrastructure orders, and margin commentary drive the thesis.",
  }),
  createInstrument({
    ticker: "SBIN.NS",
    name: "State Bank of India",
    sector: "Financials",
    assetType: "Stock",
    scores: scoreSet(78, 80, 72, 74, 76, 74, 80, 76),
    liquidityScore: 96,
    dataQualityScore: 92,
    investorFit: "Investors comfortable with public-sector banking exposure",
    thesis: "Large deposit base, improving profitability, and broad credit-cycle participation.",
    mainRisk: "Public-sector bank cyclicality and asset-quality sensitivity can increase volatility.",
    removalTrigger: "Downgrade if credit costs rise materially or public-sector banking momentum breaks.",
    technicalView: "Positive but more cyclical than private-bank picks.",
    newsView: "RBI policy, credit cycle, and government ownership considerations matter.",
  }),
  createInstrument({
    ticker: "ITC.NS",
    name: "ITC",
    sector: "Consumer Staples",
    assetType: "Stock",
    scores: scoreSet(80, 88, 70, 68, 72, 78, 80, 82),
    liquidityScore: 94,
    dataQualityScore: 95,
    investorFit: "Defensive India large-cap investors",
    thesis: "Defensive cash flows, strong brands, and stable dividend profile.",
    mainRisk: "Regulatory/tax risk and slower growth can reduce rerating potential.",
    removalTrigger: "Downgrade if regulation worsens, growth slows sharply, or defensive leadership fades.",
    technicalView: "Stable trend with lower volatility than many growth names.",
    newsView: "Tax policy and FMCG growth commentary are key.",
  }),
  createInstrument({
    ticker: "SUNPHARMA.NS",
    name: "Sun Pharmaceutical",
    sector: "Healthcare",
    assetType: "Stock",
    scores: scoreSet(79, 84, 66, 76, 74, 72, 78, 80),
    liquidityScore: 90,
    dataQualityScore: 94,
    investorFit: "Healthcare investors seeking Indian pharma exposure",
    thesis: "Specialty pharma opportunity, strong balance sheet, and defensive healthcare demand.",
    mainRisk: "USFDA, pricing, and product-specific risks can affect earnings quality.",
    removalTrigger: "Downgrade if regulatory news worsens or specialty growth disappoints.",
    technicalView: "Constructive but not as strong as top-ranked names.",
    newsView: "USFDA updates and specialty portfolio execution matter most.",
  }),
  createInstrument({
    ticker: "M&M.NS",
    name: "Mahindra & Mahindra",
    sector: "Automobiles",
    assetType: "Stock",
    scores: scoreSet(78, 78, 62, 82, 80, 74, 70, 78),
    liquidityScore: 90,
    dataQualityScore: 93,
    investorFit: "Auto and rural-demand investors",
    thesis: "SUV strength, tractor cycle exposure, and improving capital allocation.",
    mainRisk: "Auto cyclicality, commodity costs, and rural-demand volatility.",
    removalTrigger: "Downgrade if demand weakens, margins compress, or auto sector trend breaks.",
    technicalView: "Strong momentum but valuation and cyclicality reduce score.",
    newsView: "Monthly auto volumes, rural demand, and input costs are key.",
  }),
  createInstrument({
    ticker: "MARUTI.NS",
    name: "Maruti Suzuki India",
    sector: "Automobiles",
    assetType: "Stock",
    scores: scoreSet(76, 84, 58, 74, 70, 72, 72, 80),
    liquidityScore: 88,
    dataQualityScore: 93,
    investorFit: "Auto investors seeking passenger-vehicle exposure",
    thesis: "Strong passenger-vehicle franchise and improving premiumization.",
    mainRisk: "Valuation, competition, and demand cyclicality can limit upside.",
    removalTrigger: "Downgrade if volume growth or margins disappoint.",
    technicalView: "Neutral-positive but not a top technical setup.",
    newsView: "Monthly sales, commodity costs, and product launches matter.",
  }),
  createInstrument({
    ticker: "NIFTYBEES.NS",
    name: "Nippon India ETF Nifty 50 BeES",
    sector: "Broad Market ETF",
    assetType: "ETF",
    scores: scoreSet(78, 82, 68, 76, 80, 78, 76, 80),
    liquidityScore: 95,
    dataQualityScore: 94,
    investorFit: "Beginners and diversified India investors",
    thesis: "Diversified Nifty 50 exposure, lower single-stock risk, strong liquidity, and positive broad-market trend.",
    mainRisk: "Returns depend on overall Nifty 50 market direction and India large-cap valuation levels.",
    removalTrigger: "Downgrade if broad-market trend breaks, India macro risk rises sharply, or valuation risk becomes extreme.",
    technicalView: "Constructive Nifty 50 trend with broad-market support.",
    newsView: "Macro, FII/DII flows, RBI policy, currency movement, and earnings breadth are ETF-level watch items.",
  }),
  createInstrument({
    ticker: "BANKBEES.NS",
    name: "Nippon India ETF Bank BeES",
    sector: "Financials ETF",
    assetType: "ETF",
    scores: scoreSet(76, 80, 66, 76, 74, 76, 80, 78),
    liquidityScore: 90,
    dataQualityScore: 92,
    investorFit: "Investors seeking diversified Indian bank exposure",
    thesis: "Diversified Bank Nifty exposure with strong liquidity and lower single-bank risk.",
    mainRisk: "Banking-sector concentration and rate/credit-cycle sensitivity.",
    removalTrigger: "Downgrade if Bank Nifty trend breaks or asset-quality risk rises.",
    technicalView: "Positive but below the strongest single-bank setups.",
    newsView: "RBI policy, deposit competition, and credit growth drive the ETF view.",
  }),
  createInstrument({
    ticker: "JUNIORBEES.NS",
    name: "Nippon India ETF Junior BeES",
    sector: "Broad Market ETF",
    assetType: "ETF",
    scores: scoreSet(70, 74, 58, 74, 62, 70, 72, 72),
    liquidityScore: 82,
    dataQualityScore: 90,
    investorFit: "Aggressive investors seeking Nifty Next 50 exposure",
    thesis: "Diversified Nifty Next 50 exposure with higher growth optionality than Nifty 50.",
    mainRisk: "Nifty Next 50 can be more volatile and valuation-sensitive than large-cap index exposure.",
    removalTrigger: "Upgrade if breadth improves and technical trend strengthens; downgrade if risk appetite weakens.",
    technicalView: "Neutral-positive but not strong enough for top monthly pick ranking.",
    newsView: "Domestic liquidity, mid-cap sentiment, and valuation risk are key watch items.",
  }),
  createInstrument({
    ticker: "GOLDBEES.NS",
    name: "Nippon India ETF Gold BeES",
    sector: "Gold ETF",
    assetType: "ETF",
    scores: scoreSet(68, 78, 70, 64, 72, 74, 82, 78),
    liquidityScore: 88,
    dataQualityScore: 92,
    investorFit: "Diversification and hedge-focused investors",
    thesis: "Liquid gold ETF exposure that can diversify equity-heavy Indian portfolios.",
    mainRisk: "Gold can underperform when real yields rise or risk appetite improves.",
    removalTrigger: "Downgrade if gold trend breaks or portfolio hedge value declines.",
    technicalView: "Positive hedge trend but not a pure equity growth pick.",
    newsView: "Rupee movement, global gold prices, inflation, and rate expectations matter.",
  }),
  createInstrument({
    ticker: "YESBANK.NS",
    name: "Yes Bank",
    sector: "Financials",
    assetType: "Stock",
    scores: scoreSet(48, 52, 56, 58, 50, 48, 72, 46),
    liquidityScore: 86,
    dataQualityScore: 80,
    redFlags: ["Turnaround uncertainty", "Weak quality score"],
    investorFit: "Speculative investors only",
    thesis: "Turnaround optionality exists, but quality and confidence are below monthly-pick standards.",
    mainRisk: "Turnaround risk and weak profitability clarity.",
    removalTrigger: "Not eligible until fundamentals, profitability, and governance confidence improve.",
    technicalView: "Volatile and below preferred quality threshold.",
    newsView: "Turnaround progress and asset-quality updates are critical.",
  }),
  createInstrument({
    ticker: "IDEA.NS",
    name: "Vodafone Idea",
    sector: "Telecom",
    assetType: "Stock",
    scores: scoreSet(38, 32, 44, 60, 52, 45, 70, 40),
    liquidityScore: 88,
    dataQualityScore: 78,
    redFlags: ["High debt/funding risk", "Weak financial strength"],
    investorFit: "Speculative investors only",
    thesis: "High-risk telecom turnaround candidate, not suitable for core monthly picks.",
    mainRisk: "Debt, dilution, funding, and competitive pressure.",
    removalTrigger: "Not eligible until balance-sheet risk and cash-flow clarity improve materially.",
    technicalView: "Speculative price movement, not a quality technical setup.",
    newsView: "Funding and regulatory developments dominate the thesis.",
  }),
  createInstrument({
    ticker: "PAYTM.NS",
    name: "One 97 Communications",
    sector: "Financial Technology",
    assetType: "Stock",
    scores: scoreSet(54, 60, 50, 66, 56, 46, 68, 48),
    liquidityScore: 84,
    dataQualityScore: 82,
    redFlags: ["Regulatory overhang", "Profitability uncertainty"],
    investorFit: "Aggressive/speculative fintech investors",
    thesis: "Fintech optionality exists, but regulatory and profitability clarity are not strong enough for monthly picks.",
    mainRisk: "Regulatory action and business-model uncertainty.",
    removalTrigger: "Upgrade only if regulatory clarity, profitability, and technical trend improve.",
    technicalView: "Weak to neutral trend with high headline sensitivity.",
    newsView: "Regulatory and payment-bank related news can materially alter the thesis.",
  }),
  createInstrument({
    ticker: "LOWLIQETF.NS",
    name: "Sample Low Liquidity ETF",
    sector: "ETF",
    assetType: "ETF",
    scores: scoreSet(70, 70, 68, 68, 66, 70, 72, 70),
    liquidityScore: 38,
    dataQualityScore: 78,
    redFlags: ["Low liquidity"],
    investorFit: "Not suitable for monthly picks",
    thesis: "Demonstrates why the screener filters out illiquid ETFs before ranking.",
    mainRisk: "Bid-ask spreads and poor execution quality.",
    removalTrigger: "Not eligible until liquidity improves materially.",
    technicalView: "Insufficient liquidity for reliable technical confirmation.",
    newsView: "No major news issue; liquidity itself is the problem.",
  }),
];

const previousSelections = {
  "RELIANCE.NS": { picked: "2026-06-01", returnText: "+3.2%" },
  "HDFCBANK.NS": { picked: "2026-05-01", returnText: "+1.8%" },
  "NIFTYBEES.NS": { picked: "2026-04-01", returnText: "+5.7%" },
};

const manualPortfolioRows = [
  {
    ticker: "OLDMIDCAP.NS",
    picked: "2026-03-01",
    returnText: "-9.4%",
    status: "Removed",
    reason: "Removed after valuation risk, weak breadth, and technical breakdown reduced the thesis.",
  },
];

const riskEvents = [
  {
    label: "India macro",
    severity: "High relevance",
    headline: "RBI policy, inflation, and rupee movement remain key market variables",
    affected: "Banks, IT exporters, ETFs, rate-sensitive sectors",
    impact: "Mixed impact",
    thesisImpact: "Supports careful ranking between banks, exporters, and broad-market ETFs depending on rates and currency direction.",
  },
  {
    label: "India earnings",
    severity: "Material",
    headline: "Large-cap earnings quality decides this month’s shortlist",
    affected: "RELIANCE.NS, HDFCBANK.NS, INFY.NS, ICICIBANK.NS",
    impact: "Positive for quality names",
    thesisImpact: "The model favors companies with strong franchises, cash generation, and stable execution over speculative momentum.",
  },
  {
    label: "ETF flows",
    severity: "Watch",
    headline: "Domestic flows and FII activity influence broad-market ETF picks",
    affected: "NIFTYBEES.NS, BANKBEES.NS, JUNIORBEES.NS, GOLDBEES.NS",
    impact: "Market-direction dependent",
    thesisImpact: "ETF picks remain useful for diversification, but they are sensitive to overall Indian market valuation and liquidity.",
  },
  {
    label: "Geopolitical",
    severity: "Moderate",
    headline: "Energy and supply-chain risk can affect Indian large caps",
    affected: "Energy, autos, industrials, airlines, import-heavy businesses",
    impact: "Mixed impact",
    thesisImpact: "Higher crude or supply-chain stress can pressure margins, while diversified large caps may handle volatility better.",
  },
];

const currency = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
let screeningResults = runScreener();
let backendStatus = { connected: false, message: "Using browser fallback until backend responds.", source: "Browser sample engine" };

function scoreSet(fundamentals, financialStrength, valuation, growth, technical, news, geopolitical, management) {
  return { fundamentals, financialStrength, valuation, growth, technical, news, geopolitical, management };
}

function createInstrument(input) {
  return {
    redFlags: [],
    ...input,
  };
}

function calculateScore(scores) {
  const weightedScore = weights.reduce((sum, [, weight, key]) => sum + scores[key] * (weight / 100), 0);
  return Math.round(weightedScore);
}

function getSignal(instrument) {
  if (!instrument.eligible) return "Filtered Out";
  if (instrument.assetType === "ETF" && instrument.finalScore >= 76) return "ETF Monthly Pick";
  if (instrument.finalScore >= 84) return "Strong Monthly Pick";
  if (instrument.finalScore >= 78) return "Core Long-Term Candidate";
  if (instrument.finalScore >= 72) return "Investable";
  if (instrument.finalScore >= 65) return "Watchlist";
  return "Speculative";
}

function getConfidence(score) {
  if (score >= 84) return "High";
  if (score >= 76) return "Medium-High";
  if (score >= 68) return "Medium";
  return "Low-Medium";
}

function getRisk(instrument) {
  if (instrument.redFlags.length > 1) return "High";
  if (instrument.assetType === "ETF") return instrument.sector === "Gold ETF" ? "Hedge/Market-Level" : "Market-Level";
  if (instrument.scores.financialStrength < 60 || instrument.scores.news < 55) return "High";
  if (instrument.scores.valuation < 62 || instrument.scores.technical < 65) return "Moderate-High";
  return "Moderate";
}

function getValuationLabel(score, assetType) {
  if (assetType === "ETF") return "Index-linked";
  if (score >= 74) return "Attractive";
  if (score >= 66) return "Reasonable";
  if (score >= 58) return "Fair-to-Premium";
  return "Expensive";
}

function getTrendLabel(score) {
  if (score >= 80) return "Strong Positive";
  if (score >= 72) return "Positive";
  if (score >= 64) return "Neutral-Positive";
  if (score >= 55) return "Weak/Neutral";
  return "Weak";
}

function getEligibilityReasons(instrument) {
  const reasons = [];
  if (instrument.finalScore < minEligibilityScore) reasons.push(`score below ${minEligibilityScore}`);
  if (instrument.liquidityScore < minLiquidityScore) reasons.push("liquidity below threshold");
  if (instrument.dataQualityScore < minDataQualityScore) reasons.push("data quality below threshold");
  if (instrument.redFlags.length) reasons.push(...instrument.redFlags);
  return reasons;
}

function enrichInstrument(instrument) {
  const finalScore = calculateScore(instrument.scores);
  const eligibilityReasons = getEligibilityReasons({ ...instrument, finalScore });
  const eligible = eligibilityReasons.length === 0;
  return {
    ...instrument,
    finalScore,
    score: finalScore,
    eligible,
    eligibilityReasons,
    confidence: getConfidence(finalScore),
    risk: getRisk(instrument),
    valuation: getValuationLabel(instrument.scores.valuation, instrument.assetType),
    trend: getTrendLabel(instrument.scores.technical),
    signal: getSignal({ ...instrument, finalScore, eligible }),
  };
}

function buildPickReason(instrument) {
  if (!instrument.eligible) return `Filtered out: ${instrument.eligibilityReasons.join(", ")}.`;
  return instrument.thesis;
}

function runScreener() {
  const analyzed = stocks.map(enrichInstrument);
  const eligible = analyzed.filter((instrument) => instrument.eligible).sort((a, b) => b.finalScore - a.finalScore);
  const picks = [];
  const sectorCounts = {};

  for (const instrument of eligible) {
    const sectorCount = sectorCounts[instrument.sector] || 0;
    if (sectorCount >= maxSectorPicks) continue;
    picks.push(instrument);
    sectorCounts[instrument.sector] = sectorCount + 1;
    if (picks.length >= monthlyPickLimit) break;
  }

  const hasRequiredEtf = picks.filter((instrument) => instrument.assetType === "ETF").length >= requiredEtfPicks;
  const topEtfCandidate = eligible.find((instrument) => instrument.assetType === "ETF");
  if (!hasRequiredEtf && topEtfCandidate && !picks.includes(topEtfCandidate)) {
    const replacementIndex = picks.findLastIndex((instrument) => instrument.assetType !== "ETF");
    if (replacementIndex >= 0) {
      picks.splice(replacementIndex, 1, topEtfCandidate);
    } else if (picks.length < monthlyPickLimit) {
      picks.push(topEtfCandidate);
    }
  }

  picks.sort((a, b) => b.finalScore - a.finalScore);

  const filteredOut = analyzed.filter((instrument) => !instrument.eligible);
  return {
    analyzed,
    eligible,
    picks: picks.map((pick, index) => ({
      ...pick,
      rank: index + 1,
      status: previousSelections[pick.ticker] ? "Continued Pick" : "New Pick",
      whyPicked: buildPickReason(pick),
    })),
    filteredOut,
    stats: {
      scanned: analyzed.length,
      eligible: eligible.length,
      filtered: filteredOut.length,
      stocks: analyzed.filter((instrument) => instrument.assetType === "Stock").length,
      etfs: analyzed.filter((instrument) => instrument.assetType === "ETF").length,
      picks: Math.min(monthlyPickLimit, picks.length),
      requiredEtfPicks,
    },
  };
}

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
  return weights
    .map(
      ([label, , key]) => `
        <div class="score-row">
          <div><span>${label}</span><strong>${stock.scores[key]}/100</strong></div>
          <div class="score-track"><span class="${scoreClass(stock.scores[key])}" style="width:${stock.scores[key]}%"></span></div>
        </div>
      `,
    )
    .join("");
}

function renderScreenerSummary() {
  const { stats } = screeningResults;
  const summary = document.getElementById("screener-summary");
  if (!summary) return;
  summary.innerHTML = `
    <article>
      <span>Universe scanned</span>
      <strong>${stats.scanned}</strong>
      <p>${stats.stocks} Indian stocks + ${stats.etfs} Indian ETFs in this working sample universe.</p>
    </article>
    <article>
      <span>Eligible after filters</span>
      <strong>${stats.eligible}</strong>
      <p>Passed score, liquidity, data-quality, and red-flag checks.</p>
    </article>
    <article>
      <span>This month’s picks</span>
      <strong>${stats.picks}</strong>
      <p>Automatically selected with sector limits and at least ${stats.requiredEtfPicks} ETF slot.</p>
    </article>
    <article>
      <span>Filtered out</span>
      <strong>${stats.filtered}</strong>
      <p>Rejected before ranking because one or more criteria failed.</p>
    </article>
  `;
}

function renderBackendStatus() {
  const container = document.getElementById("backend-status");
  if (!container) return;
  const generatedAt = screeningResults.generatedAt ? new Date(screeningResults.generatedAt).toLocaleString("en-IN") : "Local browser run";
  const apiLabel = backendStatus.connected ? "Connected" : "Fallback mode";
  container.innerHTML = `
    <article>
      <span>API status</span>
      <strong>${apiLabel}</strong>
      <p>${backendStatus.message}</p>
    </article>
    <article>
      <span>Backend route</span>
      <strong>/api/screener/monthly-picks</strong>
      <p>Returns ranked Indian stocks and ETFs with scores, reasons, risks, and filter results.</p>
    </article>
    <article>
      <span>Universe analyzed</span>
      <strong>${screeningResults.stats.scanned}</strong>
      <p>${screeningResults.stats.stocks} stocks and ${screeningResults.stats.etfs} ETFs checked before ranking.</p>
    </article>
    <article>
      <span>Generated</span>
      <strong>${generatedAt}</strong>
      <p>${screeningResults.source || backendStatus.source}</p>
    </article>
  `;
}

async function loadBackendScreener() {
  try {
    const response = await fetch("/api/screener/monthly-picks", { cache: "no-store" });
    if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
    const payload = await response.json();
    if (!payload?.picks?.length || !payload?.stats) throw new Error("Backend response did not include picks and stats");
    screeningResults = payload;
    backendStatus = {
      connected: true,
      message: "Backend API is analyzing the Indian sample universe and powering the displayed picks.",
      source: payload.source || "AdvisorIQ backend",
    };
  } catch (error) {
    screeningResults = runScreener();
    backendStatus = {
      connected: false,
      message: `Backend unavailable, so the browser fallback is running locally. ${error.message}`,
      source: "Browser sample engine",
    };
  }
  renderAll();
}

function renderCriteriaChecklist() {
  const checklist = document.getElementById("criteria-checklist");
  if (!checklist) return;
  const criteria = [
    ["India-only universe", "Only NSE-style Indian stock and ETF samples are scanned in this version."],
    ["Broad scan before ranking", `${screeningResults.stats.scanned} instruments are analyzed before picks are selected.`],
    ["Eligibility filters", "Liquidity, data quality, red flags, and minimum score are checked before ranking."],
    ["Weighted advisor score", "Fundamentals, valuation, growth, technicals, news, macro, and management are combined."],
    ["Monthly picks visible", "The top Indian stock/ETF picks are rendered directly in the Monthly Picks section."],
    ["Short reason included", "Every pick includes a one-paragraph reason, main risk, and removal trigger."],
    ["ETF included", "The ranking reserves room for at least one Indian ETF candidate."],
    ["Old picks monitored", "Previous selections are shown with hold/removed status and reasons."],
  ];

  checklist.innerHTML = criteria
    .map(
      ([title, detail]) => `
      <article>
        <span>✓</span>
        <div>
          <h3>${title}</h3>
          <p>${detail}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderAnalysis(stock) {
  const isPicked = screeningResults.picks.some((pick) => pick.ticker === stock.ticker);
  const shortTitle = stock.eligible ? (isPicked ? "Why picked" : "Why not monthly pick") : "Why filtered out";
  const shortReason = isPicked ? stock.whyPicked : buildPickReason(stock);
  document.getElementById("analysis-card").innerHTML = `
    <div class="analysis-top">
      <div>
        <p class="eyebrow">${stock.assetType} report · ${stock.sector}</p>
        <h3>${stock.name} <span>${stock.ticker}</span></h3>
        <p>${stock.eligible ? stock.thesis : `This instrument is not eligible for monthly picks because ${stock.eligibilityReasons.join(", ")}.`}</p>
      </div>
      <div class="big-score ${scoreClass(stock.finalScore)}">
        <span>${stock.finalScore}</span>
        <small>/100</small>
      </div>
    </div>
    <div class="tag-row">
      <span>${stock.signal}</span>
      <span>${stock.assetType}</span>
      <span>Confidence: ${stock.confidence}</span>
      <span>Risk: ${stock.risk}</span>
      <span>Valuation: ${stock.valuation}</span>
      <span>Trend: ${stock.trend}</span>
    </div>
    <div class="reason-grid">
      <div class="reason-card primary-reason">
        <span>Short answer</span>
        <h4>${shortTitle}</h4>
        <p>${shortReason}</p>
      </div>
      <div class="reason-card">
        <span>Main risk</span>
        <p>${stock.mainRisk}</p>
      </div>
      <div class="reason-card">
        <span>${stock.eligible ? "Removal trigger" : "Upgrade trigger"}</span>
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
  document.getElementById("monthly-picks").innerHTML = screeningResults.picks
    .map(
      (stock) => `
      <article class="pick-card">
        <div class="pick-header">
          <div>
            <span class="rank">#${stock.rank}</span>
            <h3>${stock.name}</h3>
            <p>${stock.ticker} · ${stock.assetType} · ${stock.status}</p>
          </div>
          <div class="mini-score ${scoreClass(stock.finalScore)}">${stock.finalScore}</div>
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
      const stock = findStock(button.dataset.ticker || "");
      if (stock) {
        renderAnalysis(stock);
        document.getElementById("analysis").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderPortfolio() {
  const activeRows = screeningResults.picks.slice(0, 3).map((pick) => {
    const previous = previousSelections[pick.ticker];
    return {
      ticker: pick.ticker,
      picked: previous?.picked || "2026-06-01",
      returnText: previous?.returnText || "New",
      status: previous ? "Hold" : "New Pick",
      reason: previous ? "Still meets this month’s criteria after the automatic screen." : "Newly selected by this month’s automatic screen.",
    };
  });
  const rows = [...activeRows, ...manualPortfolioRows];
  document.getElementById("portfolio-body").innerHTML = rows
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
  if (container.querySelector(".weight-card")) return;
  const scoreCard = document.createElement("article");
  scoreCard.className = "weight-card";
  scoreCard.innerHTML = `
    <span>05</span>
    <h3>Composite score</h3>
    <p>The working screener uses a ${currency.format(100)}-point model:</p>
    <ul>${weights.map(([label, value]) => `<li><span>${label}</span><strong>${value}%</strong></li>`).join("")}</ul>
  `;
  container.append(scoreCard);
}

function renderFilteredOut() {
  const container = document.getElementById("filtered-out-list");
  if (!container) return;
  container.innerHTML = screeningResults.filteredOut
    .map(
      (stock) => `
      <article>
        <strong>${stock.ticker}</strong>
        <span>${stock.name}</span>
        <p>${stock.eligibilityReasons.join(", ")}</p>
      </article>
    `,
    )
    .join("");
}

function findStock(query) {
  const normalized = query.trim().toUpperCase();
  return screeningResults.analyzed.find(
    (stock) => stock.ticker === normalized || stock.ticker.replace(".NS", "") === normalized || stock.name.toUpperCase().includes(normalized),
  );
}

function renderAll() {
  renderBackendStatus();
  renderScreenerSummary();
  renderCriteriaChecklist();
  renderPicks();
  renderPortfolio();
  renderRiskFeed();
  renderMethodologyWeights();
  renderFilteredOut();
  renderAnalysis(screeningResults.picks[0]);
}

document.getElementById("stock-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const query = String(formData.get("ticker") || "");
  const stock = findStock(query) || screeningResults.picks[0];
  renderAnalysis(stock);
  document.getElementById("analysis").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("rerank-button").addEventListener("click", async () => {
  await loadBackendScreener();
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

renderAll();
loadBackendScreener();