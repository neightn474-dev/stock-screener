# AdvisorIQ Stock Research MVP

AdvisorIQ is a static MVP for an advisor-style stock research website. It demonstrates how a user can search a stock, review a short advisor-style reason, compare monthly picks, monitor previous picks, and read risk/news context.

This first version is intentionally simple: it uses mock data in `src/app.js` and has no backend or paid market-data API yet.

## How to run it locally

```bash
npm start
```

Then open:

```text
http://127.0.0.1:3000/
```


## Manual tickers vs automatic screening

For this MVP, the tickers are entered manually in the mock `stocks` array inside `src/app.js`. That means the current site is a working front-end demo, not a real automatic market screener yet.

In the production version, you should not manually choose every ticker. The screener should automatically:

1. Load as broad a stock universe as practical, starting with the S&P 500 or Nifty 500 and expanding toward all major-exchange stocks.
2. Fetch fundamentals, valuation ratios, price history, news, and macro/geopolitical risk data from APIs.
3. Score every stock using the AdvisorIQ scoring model.
4. Apply red-flag filters and sector diversification rules.
5. Select the best monthly picks automatically.
6. Monitor old picks and downgrade or remove them when the thesis weakens.

So the answer is:

```text
MVP: tickers are manually mocked for demo.
Production: screener finds and ranks the best candidates automatically.
```

### Example production flow

```text
Stock universe: S&P 500
  ↓
Fetch market + fundamental + news data
  ↓
Score every stock
  ↓
Remove red-flag stocks
  ↓
Rank by final score
  ↓
Pick top monthly candidates
  ↓
Generate short “Why Picked” reasons
```


## Stock universe coverage target

The production screener should look at as many stocks as practical, not only a tiny manual list. The goal is broad coverage with sensible quality controls.

Recommended rollout:

| Phase | Universe | Why |
|---|---|---|
| 1 | S&P 500 / Nifty 500 | High-quality data, liquid stocks, easier validation |
| 2 | Large + mid caps | More opportunities while keeping liquidity reasonable |
| 3 | All major-exchange stocks | Broad coverage across NYSE, Nasdaq, AMEX, NSE, BSE, etc. |
| 4 | Global developed markets | International diversification and wider opportunity set |
| 5 | Small caps / microcaps | Optional advanced mode because risk, liquidity, and data quality are harder |

Important: more stocks does not mean every stock should be eligible for monthly picks. The screener should scan broadly, then filter aggressively.

### Broad screener filters

Before ranking, the system should remove or flag stocks with:

- Missing or unreliable financial data
- Very low trading volume
- Very small market cap, unless the user enables speculative mode
- Bankruptcy warnings or going-concern issues
- Severe accounting/governance red flags
- Extreme dilution or funding distress
- Unavailable price history for technical analysis

### Production universe flow

```text
Load all available tickers from selected exchanges
  ↓
Normalize ticker, exchange, sector, industry, country, and currency
  ↓
Remove stocks with missing data or poor liquidity
  ↓
Run fundamental, valuation, technical, news, and geopolitical scoring
  ↓
Rank eligible stocks
  ↓
Apply diversification rules
  ↓
Publish monthly picks with short “Why Picked” reasons
```

## How the demo works

### 1. Search a stock

Use the search box on the homepage and try one of these tickers:

```text
MSFT
COST
V
AMZN
UNH
TSLA
```

The app looks for the ticker in the mock `stocks` array and renders the advisor-style report.

### 2. Read the short reason

Every report shows a short answer first:

```text
Why picked:
Strong recurring revenue, high free cash flow, durable AI/cloud growth, and positive technical momentum.
```

For stocks that are not selected, the same area becomes:

```text
Why not picked:
Not picked: valuation risk, weaker technical trend, and elevated news sensitivity offset the growth opportunity.
```

### 3. Review the scorecard

The scorecard is based on these demo categories:

| Category | Weight |
|---|---:|
| Fundamental quality | 25% |
| Financial strength | 15% |
| Valuation | 15% |
| Growth outlook | 15% |
| Technical health | 10% |
| News/event risk | 10% |
| Geopolitical/macro risk | 5% |
| Management/governance | 5% |

### 4. Check monthly picks

The monthly picks section renders all stocks whose `status` is not `Not Picked`.

Each pick includes:

- Signal
- Score
- Risk level
- Technical trend
- Short `Why picked` reason
- Main risk
- Removal trigger
- Best-fit investor type

### 5. Check previous-pick monitoring

The model portfolio section shows example previous picks with statuses like:

- `Hold`
- `Upgraded`
- `Downgraded`
- `Removed`

This is meant to demonstrate that the platform should not sell just because a stock is temporarily down. It should downgrade or remove a stock when the thesis changes.

## Where to make common changes

### Change a stock pick or reason

Edit the `stocks` array in:

```text
src/app.js
```

Example fields you can change:

```js
{
  ticker: "MSFT",
  score: 86,
  signal: "Strong Monthly Pick",
  whyPicked: "Strong recurring revenue, high free cash flow, durable AI/cloud growth, and positive technical momentum.",
  mainRisk: "Premium valuation could limit near-term upside if cloud growth slows.",
  removalTrigger: "Downgrade if cloud growth slows materially, valuation becomes extreme, or price breaks below long-term support."
}
```

### Change homepage text or page sections

Edit:

```text
index.html
```

### Change colors, spacing, cards, or mobile layout

Edit:

```text
src/styles.css
```

### Change validation rules

Edit:

```text
scripts/validate.mjs
```

## How to validate before pushing

Run:

```bash
npm run validate
```

This checks that the core files exist, important MVP phrases are present, and enough sample stock definitions exist.

## Safe GitHub workflow to avoid conflicts

Conflicts usually happen when the same file and same lines are changed in two places: for example, you edit `src/app.js` locally while someone else also edits the same `stocks` array on GitHub.

Use this workflow before making changes:

```bash
git status
git pull --rebase origin main
# make your edits
npm run validate
git add .
git commit -m "Describe your change"
git push origin main
```

If you are working on a separate branch, replace `main` with your branch name.

## Practical tips to reduce conflicts

- Pull the latest code before editing.
- Make small commits instead of one huge commit.
- Avoid editing the same file from GitHub web editor and locally at the same time.
- If one person is changing UI text in `index.html`, another person should avoid editing the same section until the first change is merged.
- Put future real stock data in separate data files instead of one large `src/app.js` file. That will reduce conflicts later.

## Recommended next refactor

To reduce future Git conflicts, split `src/app.js` like this:

```text
src/data/stocks.js
src/data/portfolio.js
src/data/risk-events.js
src/render/analysis.js
src/render/picks.js
src/render/portfolio.js
src/render/risk-feed.js
```

That way, changing a stock reason will not conflict with changing the UI rendering code.
