import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const appRoot = normalize(join(__dirname, ".."));
const port = Number(process.env.PORT || 3000);

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

const previousSelections = {
  "RELIANCE.NS": { picked: "2026-06-01", returnText: "+3.2%" },
  "HDFCBANK.NS": { picked: "2026-05-01", returnText: "+1.8%" },
  "NIFTYBEES.NS": { picked: "2026-04-01", returnText: "+5.7%" },
};

const indianMarketUniverse = [
  backendInstrument("RELIANCE.NS", "Reliance Industries", "Energy + Consumer", "Stock", [88, 84, 68, 86, 79, 82, 72, 86], 96, 95, {
    investorFit: "Long-term Indian large-cap investors",
    thesis: "Diversified energy-to-consumer platform with retail, digital, and cash-flow optionality.",
    mainRisk: "Energy-cycle volatility and capex intensity can pressure near-term returns.",
    removalTrigger: "Downgrade if refining weakness, debt pressure, or weak technical action reduces the long-term thesis.",
    technicalView: "Positive trend with assumed price strength versus the Nifty 50.",
    newsView: "No thesis-breaking India-specific news is flagged; energy and telecom regulation remain watch items.",
  }),
  backendInstrument("HDFCBANK.NS", "HDFC Bank", "Financials", "Stock", [86, 88, 74, 76, 68, 78, 82, 84], 98, 96, {
    investorFit: "Long-term banking and financial-sector investors",
    thesis: "Large deposit franchise, improving valuation, and long-term credit growth opportunity.",
    mainRisk: "Post-merger execution, margin pressure, and asset-quality cycle risk should be monitored.",
    removalTrigger: "Downgrade if asset quality worsens, deposit growth weakens, or the technical recovery fails.",
    technicalView: "Improving, but still needs sustained relative strength confirmation versus Bank Nifty.",
    newsView: "Banking regulation, deposit growth, and margin commentary are the key watch items.",
  }),
  backendInstrument("INFY.NS", "Infosys", "Information Technology", "Stock", [82, 90, 70, 72, 76, 74, 70, 82], 94, 95, {
    investorFit: "Long-term IT services investors",
    thesis: "Net-cash balance sheet, resilient margins, reasonable valuation, and improving IT-services momentum.",
    mainRisk: "International discretionary tech spending slowdown can delay revenue acceleration.",
    removalTrigger: "Downgrade if large-deal momentum weakens, guidance disappoints, or rupee/client-demand risk rises materially.",
    technicalView: "Constructive momentum among large-cap IT names.",
    newsView: "Overseas client budgets, rupee movement, and IT-services demand are the most important variables.",
  }),
  backendInstrument("TCS.NS", "Tata Consultancy Services", "Information Technology", "Stock", [86, 92, 62, 70, 72, 76, 72, 88], 95, 96, {
    investorFit: "Quality-focused IT investors",
    thesis: "High-quality IT services franchise with strong cash conversion and durable enterprise relationships.",
    mainRisk: "Premium valuation and slower overseas discretionary spending can limit upside.",
    removalTrigger: "Downgrade if margin discipline weakens or deal conversion disappoints.",
    technicalView: "Stable trend but slightly less attractive valuation setup than Infosys in this sample.",
    newsView: "Client spending and currency movement are key watch items.",
  }),
  backendInstrument("ICICIBANK.NS", "ICICI Bank", "Financials", "Stock", [84, 84, 67, 78, 75, 76, 82, 81], 97, 95, {
    investorFit: "Moderate investors seeking private-bank exposure",
    thesis: "Healthy private-bank franchise, consistent execution, strong asset quality, and positive sector momentum.",
    mainRisk: "Banking-cycle risk, margin pressure, and sector concentration if paired with other financial stocks.",
    removalTrigger: "Downgrade if asset-quality indicators weaken, margins compress sharply, or Bank Nifty leadership breaks.",
    technicalView: "Positive and supported by private-bank sector momentum.",
    newsView: "Credit growth, deposit competition, RBI policy, and asset-quality commentary are key watch items.",
  }),
  backendInstrument("BHARTIARTL.NS", "Bharti Airtel", "Telecom", "Stock", [82, 78, 64, 82, 82, 78, 76, 80], 93, 94, {
    investorFit: "Long-term India telecom and digital-infrastructure investors",
    thesis: "Pricing power, premium subscriber mix, and steady telecom cash-flow improvement.",
    mainRisk: "Spectrum costs, leverage, and regulatory pricing pressure remain watch items.",
    removalTrigger: "Downgrade if ARPU growth stalls, leverage worsens, or technical leadership breaks.",
    technicalView: "Strong relative strength and positive long-term trend in this sample model.",
    newsView: "Tariff changes, regulatory actions, and capex commentary are important.",
  }),
  backendInstrument("LT.NS", "Larsen & Toubro", "Industrials", "Stock", [83, 82, 66, 81, 78, 77, 74, 84], 92, 94, {
    investorFit: "Infrastructure and capex-cycle investors",
    thesis: "Strong order book, execution capability, and India capex-cycle exposure.",
    mainRisk: "Execution delays, input costs, and capex-cycle sensitivity can affect returns.",
    removalTrigger: "Downgrade if order inflows weaken, margins compress, or project execution deteriorates.",
    technicalView: "Constructive trend with cyclical leadership support.",
    newsView: "Government capex, infrastructure orders, and margin commentary drive the thesis.",
  }),
  backendInstrument("SBIN.NS", "State Bank of India", "Financials", "Stock", [78, 80, 72, 74, 76, 74, 80, 76], 96, 92, {
    investorFit: "Investors comfortable with public-sector banking exposure",
    thesis: "Large deposit base, improving profitability, and broad credit-cycle participation.",
    mainRisk: "Public-sector bank cyclicality and asset-quality sensitivity can increase volatility.",
    removalTrigger: "Downgrade if credit costs rise materially or public-sector banking momentum breaks.",
    technicalView: "Positive but more cyclical than private-bank picks.",
    newsView: "RBI policy, credit cycle, and government ownership considerations matter.",
  }),
  backendInstrument("ITC.NS", "ITC", "Consumer Staples", "Stock", [80, 88, 70, 68, 72, 78, 80, 82], 94, 95, {
    investorFit: "Defensive India large-cap investors",
    thesis: "Defensive cash flows, strong brands, and stable dividend profile.",
    mainRisk: "Regulatory/tax risk and slower growth can reduce rerating potential.",
    removalTrigger: "Downgrade if regulation worsens, growth slows sharply, or defensive leadership fades.",
    technicalView: "Stable trend with lower volatility than many growth names.",
    newsView: "Tax policy and FMCG growth commentary are key.",
  }),
  backendInstrument("SUNPHARMA.NS", "Sun Pharmaceutical", "Healthcare", "Stock", [79, 84, 66, 76, 74, 72, 78, 80], 90, 94, {
    investorFit: "Healthcare investors seeking Indian pharma exposure",
    thesis: "Specialty pharma opportunity, strong balance sheet, and defensive healthcare demand.",
    mainRisk: "USFDA, pricing, and product-specific risks can affect earnings quality.",
    removalTrigger: "Downgrade if regulatory news worsens or specialty growth disappoints.",
    technicalView: "Constructive but not as strong as top-ranked names.",
    newsView: "USFDA updates and specialty portfolio execution matter most.",
  }),
  backendInstrument("M&M.NS", "Mahindra & Mahindra", "Automobiles", "Stock", [78, 78, 62, 82, 80, 74, 70, 78], 90, 93, {
    investorFit: "Auto and rural-demand investors",
    thesis: "SUV strength, tractor cycle exposure, and improving capital allocation.",
    mainRisk: "Auto cyclicality, commodity costs, and rural-demand volatility.",
    removalTrigger: "Downgrade if demand weakens, margins compress, or auto sector trend breaks.",
    technicalView: "Strong momentum but valuation and cyclicality reduce score.",
    newsView: "Monthly auto volumes, rural demand, and input costs are key.",
  }),
  backendInstrument("MARUTI.NS", "Maruti Suzuki India", "Automobiles", "Stock", [76, 84, 58, 74, 70, 72, 72, 80], 88, 93, {
    investorFit: "Auto investors seeking passenger-vehicle exposure",
    thesis: "Strong passenger-vehicle franchise and improving premiumization.",
    mainRisk: "Valuation, competition, and demand cyclicality can limit upside.",
    removalTrigger: "Downgrade if volume growth or margins disappoint.",
    technicalView: "Neutral-positive but not a top technical setup.",
    newsView: "Monthly sales, commodity costs, and product launches matter.",
  }),
  backendInstrument("NIFTYBEES.NS", "Nippon India ETF Nifty 50 BeES", "Broad Market ETF", "ETF", [78, 82, 68, 76, 80, 78, 76, 80], 95, 94, {
    investorFit: "Beginners and diversified India investors",
    thesis: "Diversified Nifty 50 exposure, lower single-stock risk, strong liquidity, and positive broad-market trend.",
    mainRisk: "Returns depend on overall Nifty 50 market direction and India large-cap valuation levels.",
    removalTrigger: "Downgrade if broad-market trend breaks, India macro risk rises sharply, or valuation risk becomes extreme.",
    technicalView: "Constructive Nifty 50 trend with broad-market support.",
    newsView: "Macro, FII/DII flows, RBI policy, currency movement, and earnings breadth are ETF-level watch items.",
  }),
  backendInstrument("BANKBEES.NS", "Nippon India ETF Bank BeES", "Financials ETF", "ETF", [76, 80, 66, 76, 74, 76, 80, 78], 90, 92, {
    investorFit: "Investors seeking diversified Indian bank exposure",
    thesis: "Diversified Bank Nifty exposure with strong liquidity and lower single-bank risk.",
    mainRisk: "Banking-sector concentration and rate/credit-cycle sensitivity.",
    removalTrigger: "Downgrade if Bank Nifty trend breaks or asset-quality risk rises.",
    technicalView: "Positive but below the strongest single-bank setups.",
    newsView: "RBI policy, deposit competition, and credit growth drive the ETF view.",
  }),
  backendInstrument("JUNIORBEES.NS", "Nippon India ETF Junior BeES", "Broad Market ETF", "ETF", [70, 74, 58, 74, 62, 70, 72, 72], 82, 90, {
    investorFit: "Aggressive investors seeking Nifty Next 50 exposure",
    thesis: "Diversified Nifty Next 50 exposure with higher growth optionality than Nifty 50.",
    mainRisk: "Nifty Next 50 can be more volatile and valuation-sensitive than large-cap index exposure.",
    removalTrigger: "Upgrade if breadth improves and technical trend strengthens; downgrade if risk appetite weakens.",
    technicalView: "Neutral-positive but not strong enough for top monthly pick ranking.",
    newsView: "Domestic liquidity, mid-cap sentiment, and valuation risk are key watch items.",
  }),
  backendInstrument("GOLDBEES.NS", "Nippon India ETF Gold BeES", "Gold ETF", "ETF", [68, 78, 70, 64, 72, 74, 82, 78], 88, 92, {
    investorFit: "Diversification and hedge-focused investors",
    thesis: "Liquid gold ETF exposure that can diversify equity-heavy Indian portfolios.",
    mainRisk: "Gold can underperform when real yields rise or risk appetite improves.",
    removalTrigger: "Downgrade if gold trend breaks or portfolio hedge value declines.",
    technicalView: "Positive hedge trend but not a pure equity growth pick.",
    newsView: "Rupee movement, global gold prices, inflation, and rate expectations matter.",
  }),
  backendInstrument("YESBANK.NS", "Yes Bank", "Financials", "Stock", [48, 52, 56, 58, 50, 48, 72, 46], 86, 80, {
    redFlags: ["Turnaround uncertainty", "Weak quality score"],
    investorFit: "Speculative investors only",
    thesis: "Turnaround optionality exists, but quality and confidence are below monthly-pick standards.",
    mainRisk: "Turnaround risk and weak profitability clarity.",
    removalTrigger: "Not eligible until fundamentals, profitability, and governance confidence improve.",
    technicalView: "Volatile and below preferred quality threshold.",
    newsView: "Turnaround progress and asset-quality updates are critical.",
  }),
  backendInstrument("IDEA.NS", "Vodafone Idea", "Telecom", "Stock", [38, 32, 44, 60, 52, 45, 70, 40], 88, 78, {
    redFlags: ["High debt/funding risk", "Weak financial strength"],
    investorFit: "Speculative investors only",
    thesis: "High-risk telecom turnaround candidate, not suitable for core monthly picks.",
    mainRisk: "Debt, dilution, funding, and competitive pressure.",
    removalTrigger: "Not eligible until balance-sheet risk and cash-flow clarity improve materially.",
    technicalView: "Speculative price movement, not a quality technical setup.",
    newsView: "Funding and regulatory developments dominate the thesis.",
  }),
  backendInstrument("PAYTM.NS", "One 97 Communications", "Financial Technology", "Stock", [54, 60, 50, 66, 56, 46, 68, 48], 84, 82, {
    redFlags: ["Regulatory overhang", "Profitability uncertainty"],
    investorFit: "Aggressive/speculative fintech investors",
    thesis: "Fintech optionality exists, but regulatory and profitability clarity are not strong enough for monthly picks.",
    mainRisk: "Regulatory action and business-model uncertainty.",
    removalTrigger: "Upgrade only if regulatory clarity, profitability, and technical trend improve.",
    technicalView: "Weak to neutral trend with high headline sensitivity.",
    newsView: "Regulatory and payment-bank related news can materially alter the thesis.",
  }),
  backendInstrument("LOWLIQETF.NS", "Sample Low Liquidity ETF", "ETF", "ETF", [70, 70, 68, 68, 66, 70, 72, 70], 38, 78, {
    redFlags: ["Low liquidity"],
    investorFit: "Not suitable for monthly picks",
    thesis: "Demonstrates why the screener filters out illiquid ETFs before ranking.",
    mainRisk: "Bid-ask spreads and poor execution quality.",
    removalTrigger: "Not eligible until liquidity improves materially.",
    technicalView: "Insufficient liquidity for reliable technical confirmation.",
    newsView: "No major news issue; liquidity itself is the problem.",
  }),
];

function scoreSet(values) {
  const [fundamentals, financialStrength, valuation, growth, technical, news, geopolitical, management] = values;
  return { fundamentals, financialStrength, valuation, growth, technical, news, geopolitical, management };
}

function backendInstrument(ticker, name, sector, assetType, scoreValues, liquidityScore, dataQualityScore, details) {
  return {
    ticker,
    name,
    sector,
    assetType,
    scores: scoreSet(scoreValues),
    liquidityScore,
    dataQualityScore,
    redFlags: [],
    ...details,
  };
}

function calculateScore(scores) {
  return Math.round(weights.reduce((sum, [, weight, key]) => sum + scores[key] * (weight / 100), 0));
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

function runIndianMarketScreener() {
  const analyzed = indianMarketUniverse.map(enrichInstrument);
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
    source: "AdvisorIQ backend sample Indian universe",
    generatedAt: new Date().toISOString(),
    analyzed,
    eligible,
    picks: picks.map((pick, index) => ({
      ...pick,
      rank: index + 1,
      status: previousSelections[pick.ticker] ? "Continued Pick" : "New Pick",
      whyPicked: pick.thesis,
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
    thresholds: {
      monthlyPickLimit,
      minEligibilityScore,
      minLiquidityScore,
      minDataQualityScore,
      maxSectorPicks,
      requiredEtfPicks,
    },
  };
}

function findAnalyzedInstrument(query) {
  const normalized = decodeURIComponent(query || "").trim().toUpperCase();
  const results = runIndianMarketScreener();
  return results.analyzed.find(
    (stock) => stock.ticker === normalized || stock.ticker.replace(".NS", "") === normalized || stock.name.toUpperCase().includes(normalized),
  );
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function notFound(response, message = "Not found") {
  sendJson(response, 404, { error: message });
}

function contentType(filePath) {
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
  };
  return types[extname(filePath)] || "application/octet-stream";
}

async function serveStatic(requestPath, response, method = "GET") {
  const safePath = normalize(requestPath === "/" ? "/index.html" : requestPath).replace(/^[/\\]+/, "");
  const filePath = normalize(join(appRoot, safePath));

  if (!filePath.startsWith(appRoot)) {
    notFound(response);
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) {
      notFound(response);
      return;
    }
    response.writeHead(200, { "Content-Type": contentType(filePath), "Content-Length": fileInfo.size });
    if (method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  } catch {
    notFound(response);
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { error: "Only GET and HEAD requests are supported in the MVP backend." });
    return;
  }

  if (url.pathname === "/api/health") {
    sendJson(response, 200, {
      status: "ok",
      service: "AdvisorIQ Indian market backend",
      universeSize: indianMarketUniverse.length,
      endpoints: ["/api/screener/monthly-picks", "/api/universe", "/api/stocks/:ticker"],
    });
    return;
  }

  if (url.pathname === "/api/screener/monthly-picks") {
    sendJson(response, 200, runIndianMarketScreener());
    return;
  }

  if (url.pathname === "/api/universe") {
    const results = runIndianMarketScreener();
    sendJson(response, 200, { source: results.source, generatedAt: results.generatedAt, stats: results.stats, instruments: results.analyzed });
    return;
  }

  if (url.pathname.startsWith("/api/stocks/")) {
    const ticker = url.pathname.slice("/api/stocks/".length);
    const instrument = findAnalyzedInstrument(ticker);
    if (!instrument) {
      notFound(response, `No Indian stock or ETF found for ${decodeURIComponent(ticker)}`);
      return;
    }
    sendJson(response, 200, { source: "AdvisorIQ backend sample Indian universe", generatedAt: new Date().toISOString(), instrument });
    return;
  }

  await serveStatic(url.pathname, response, request.method);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AdvisorIQ backend serving site and API at http://127.0.0.1:${port}/`);
  console.log(`Monthly picks API: http://127.0.0.1:${port}/api/screener/monthly-picks`);
});
