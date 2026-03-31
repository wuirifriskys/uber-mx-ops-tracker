"use client";

import dynamic from "next/dynamic";
import reviewSentiment from "@/data/review_sentiment.json";
import reformTimeline from "@/data/reform_timeline.json";
import competitive from "@/data/competitive.json";
import profeco from "@/data/profeco.json";
import calculatorParams from "@/data/calculator_params.json";

/* ---------- dynamic chart imports (ssr: false) ---------- */

const loadingSkeleton = (h = 350) => (
  <div
    className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
    style={{ height: h }}
  />
);

const DynCharts = {
  MonthlyRatings: dynamic(
    () => import("@/components/Charts").then((m) => m.Charts.MonthlyRatings),
    { ssr: false, loading: () => loadingSkeleton(400) }
  ),
  KeywordComparison: dynamic(
    () => import("@/components/Charts").then((m) => m.Charts.KeywordComparison),
    { ssr: false, loading: () => loadingSkeleton(400) }
  ),
  PilotEnrollment: dynamic(
    () => import("@/components/Charts").then((m) => m.Charts.PilotEnrollment),
    { ssr: false, loading: () => loadingSkeleton(300) }
  ),
  BreakEvenChart: dynamic(
    () => import("@/components/Charts").then((m) => m.Charts.BreakEvenChart),
    { ssr: false, loading: () => loadingSkeleton(400) }
  ),
  CompetitiveRatings: dynamic(
    () =>
      import("@/components/Charts").then((m) => m.Charts.CompetitiveRatings),
    { ssr: false, loading: () => loadingSkeleton(300) }
  ),
};

const DynCalculator = dynamic(
  () => import("@/components/Calculator").then((m) => m.Calculator),
  { ssr: false }
);

/* ---------- pre-computed data ---------- */

const uberDriver = reviewSentiment["Uber Driver"];
const didiDriver = reviewSentiment["DiDi Driver"];

// Monthly ratings: align Uber Driver & DiDi Driver on overlapping months
const allMonths = [
  ...new Set([
    ...uberDriver.monthly.map((m) => m.month),
    ...didiDriver.monthly.map((m) => m.month),
  ]),
].sort();
const uberMap = Object.fromEntries(
  uberDriver.monthly.map((m) => [m.month, m.avg])
);
const didiMap = Object.fromEntries(
  didiDriver.monthly.map((m) => [m.month, m.avg])
);
const monthlyRatingsData = allMonths.map((month) => {
  const label = new Date(month + "-01").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return {
    month: label,
    uber_driver: uberMap[month] ?? 0,
    didi_driver: didiMap[month] ?? 0,
  };
});

// Keyword comparison: top 10 keywords from Uber vs DiDi 1-star
const uberKw = Object.fromEntries(
  uberDriver.top_keywords_1star.map((k) => [k.word, k.count])
);
const didiKw = Object.fromEntries(
  didiDriver.top_keywords_1star.map((k) => [k.word, k.count])
);
const allKeywords = [
  ...new Set([
    ...uberDriver.top_keywords_1star.map((k) => k.word),
    ...didiDriver.top_keywords_1star.map((k) => k.word),
  ]),
];
const keywordData = allKeywords
  .map((word) => ({
    word,
    uber: uberKw[word] ?? 0,
    didi: didiKw[word] ?? 0,
  }))
  .sort((a, b) => b.uber + b.didi - (a.uber + a.didi))
  .slice(0, 10);

// Break-even pre-computation
const breakEvenData = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(
  (hours) => {
    const grossMonthly = hours * 100 * calculatorParams.weeks_per_month;
    const calc = (type: "car" | "motorcycle" | "bicycle") => {
      const exclusionRate =
        calculatorParams.exclusion_rates[type];
      const taxableIncome = grossMonthly * (1 - exclusionRate);
      const isrDeduction = grossMonthly * calculatorParams.isr.with_rfc;
      const threshold =
        calculatorParams.income_thresholds_mxn[type];
      const imssContrib =
        taxableIncome >= threshold
          ? taxableIncome * calculatorParams.imss_worker_contribution
          : 0;
      return Math.round(grossMonthly - isrDeduction - imssContrib);
    };
    return {
      hours,
      car: calc("car"),
      motorcycle: calc("motorcycle"),
      bicycle: calc("bicycle"),
    };
  }
);

const totalReviews = competitive.reduce((sum, c) => sum + c.review_count, 0);

/* ---------- component ---------- */

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#276EF1]/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[#276EF1] font-semibold text-sm uppercase tracking-widest mb-4">
            Strategy &amp; Operations Analysis
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            What Delivery Partners
            <br />
            Actually Take Home
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
            A data-driven analysis of Mexico&apos;s platform worker reform and
            its impact on Uber Eats delivery partner economics.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-white/10 px-4 py-2 rounded-full">
              {totalReviews.toLocaleString()} reviews analyzed
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              3 platforms compared
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              Real 2026 regulatory data
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              Interactive calculator
            </span>
          </div>
          <a
            href="/how-it-works"
            className="inline-block mt-8 text-sm text-gray-400 hover:text-white transition-colors"
          >
            See how this was built &rarr;
          </a>
        </div>
      </section>

      {/* ═══════════ 2. THE REFORM IN NUMBERS ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            The Reform in Numbers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                value: "1.35M",
                label: "Workers registered with IMSS",
              },
              {
                value: "10.3%",
                label: "Qualifying for full benefits",
              },
              { value: "Jun 2025", label: "Reform took effect" },
              { value: "Jan 2026", label: "Mandatory enforcement" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <p className="text-3xl font-bold text-[#276EF1]">{s.value}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed mb-4">
              On December 24, 2024, Mexico published Chapter IX Bis of the
              Federal Labor Law, creating the first legal framework for platform
              workers in Latin America. The reform classifies gig workers as a
              new category &mdash; neither fully independent nor traditional
              employees &mdash; requiring platforms to register them with IMSS
              (social security) and withhold ISR (income tax) based on vehicle
              type and income thresholds.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A six-month pilot began in July 2025, during which platforms
              voluntarily enrolled drivers. By December 2025, enrollment surged
              to over 206,000 qualifying workers as the January 2026 enforcement
              deadline approached. However, qualifying numbers dropped sharply to
              139,000 in January &mdash; suggesting many drivers fell below
              income thresholds once mandatory reporting began.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The next milestone is April 1, 2026, when SAT begins real-time tax
              integration with platform data. This will eliminate manual
              reporting and force full transparency on partner earnings.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Pilot Enrollment Progression
            </h3>
            <DynCharts.PilotEnrollment
              data={reformTimeline.pilot_progression}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ 3. WHAT PARTNERS ARE SAYING ═══════════ */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            What Partners Are Saying
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Sentiment analysis of {totalReviews.toLocaleString()} Google Play
            Store reviews across Uber Driver, DiDi Driver, Uber Eats, and Rappi.
          </p>

          {/* Monthly ratings chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Monthly Average Ratings &mdash; Uber Driver vs DiDi Driver
            </h3>
            <DynCharts.MonthlyRatings data={monthlyRatingsData} />
          </div>

          {/* Featured review callout */}
          <div className="bg-black text-white rounded-xl p-6 md:p-8 mb-8">
            <p className="text-[#276EF1] font-semibold text-xs uppercase tracking-widest mb-3">
              Most-Upvoted Uber Driver Review
            </p>
            <blockquote className="text-lg md:text-xl leading-relaxed mb-4 italic text-gray-200">
              &ldquo;{uberDriver.featured_review.text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                {uberDriver.featured_review.thumbsUpCount.toLocaleString()}{" "}
                thumbs up
              </span>
              <span>&bull;</span>
              <span>
                {new Date(
                  uberDriver.featured_review.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>&bull;</span>
              <span>{"★".repeat(uberDriver.featured_review.score)} rating</span>
            </div>
          </div>

          {/* Keyword comparison chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Top Keywords in 1-Star Reviews &mdash; Uber Driver vs DiDi Driver
            </h3>
            <DynCharts.KeywordComparison data={keywordData} />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2">Key Finding</h3>
            <p className="text-gray-600 leading-relaxed">
              The reform&apos;s impact is visible in partner sentiment. Uber
              Driver ratings dropped from 3.76 in December 2025 to 3.35 in
              March 2026 &mdash; coinciding exactly with the January enforcement
              deadline. The top 1-star keywords tell the story:{" "}
              <em>tarifas</em> (fares), <em>ganancias</em> (earnings), and{" "}
              <em>pagan</em> (they pay) dominate Uber complaints, while DiDi
              drivers focus on <em>pedido</em> (orders) and <em>servicio</em>{" "}
              (service). Uber partners are frustrated about money; DiDi partners
              are frustrated about the product itself.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 4. PARTNER ECONOMICS CALCULATOR ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Partner Economics Calculator
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Model what a delivery partner actually earns under Mexico&apos;s
            2026 regulatory framework. Adjust vehicle type, weekly hours, hourly
            rate, and RFC status to see how deductions, thresholds, and benefits
            interact.
          </p>
          <DynCalculator />
        </div>
      </section>

      {/* ═══════════ 5. THE BREAK-EVEN QUESTION ═══════════ */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            The Break-Even Question
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            At what weekly hours does each vehicle type cross the formal
            employment threshold? This chart models net monthly income at $100
            MXN/hr across 10&ndash;60 weekly hours, with IMSS thresholds
            overlaid.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <DynCharts.BreakEvenChart
              data={breakEvenData}
              thresholds={calculatorParams.income_thresholds_mxn}
            />
          </div>

          <div className="bg-[#276EF1]/5 border border-[#276EF1]/20 rounded-xl p-6">
            <h3 className="font-bold text-[#276EF1] mb-2">Key Insight</h3>
            <p className="text-gray-700 leading-relaxed">
              Bicycle partners cross the formal employment threshold at
              approximately <strong>16 hours/week</strong> &mdash; meaning even
              part-time cyclists qualify for full IMSS benefits. Motorcycle
              partners need roughly <strong>33 hours/week</strong>, while car
              partners &mdash; who receive the highest exclusion rate (48%)
              &mdash; need <strong>55+ hours/week</strong> to qualify. This
              creates a structural incentive gap: the partners working the
              hardest (car drivers in traffic) are the least likely to receive
              benefits.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. COMPETITIVE LANDSCAPE ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Competitive Landscape
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Google Play Store ratings and Profeco complaint data across
            Mexico&apos;s major delivery platforms.
          </p>

          {/* Competitive ratings chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Platform Ratings &amp; 1-Star Percentage
            </h3>
            <DynCharts.CompetitiveRatings data={competitive} />
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-black text-white text-left">
                  <th className="py-4 px-4 font-semibold">Platform</th>
                  <th className="py-4 px-4 font-semibold text-right">
                    Avg Rating
                  </th>
                  <th className="py-4 px-4 font-semibold text-right">
                    1-Star %
                  </th>
                  <th className="py-4 px-4 font-semibold text-right">
                    5-Star %
                  </th>
                  <th className="py-4 px-4 font-semibold text-right">
                    Reviews
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitive.map((c, i) => (
                  <tr
                    key={c.platform}
                    className={`border-b border-gray-100 ${
                      i === 0 ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-4 font-medium">
                      {c.platform}
                      {i === 0 && (
                        <span className="ml-2 text-xs bg-[#276EF1] text-white px-2 py-0.5 rounded-full">
                          Highest Rated
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-semibold">
                      {c.avg_rating.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono">
                      {c.one_star_pct}%
                    </td>
                    <td className="py-4 px-4 text-right font-mono">
                      {c.five_star_pct}%
                    </td>
                    <td className="py-4 px-4 text-right font-mono">
                      {c.review_count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Profeco complaint cards */}
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Profeco Complaints (2019 &ndash; Jan 2026)
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {profeco.platforms.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <p className="text-2xl font-bold text-[#276EF1]">
                  {p.total.toLocaleString()}
                </p>
                <p className="font-semibold text-gray-900 mt-1">{p.name}</p>
                <p className="text-sm text-gray-500 mt-2">{p.top_issue}</p>
                <p className="text-xs text-gray-400 mt-1">{p.trend}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2">Key Finding</h3>
            <p className="text-gray-600 leading-relaxed">
              DiDi&apos;s 1.52 average rating versus Uber&apos;s 3.47 represents
              a massive perception gap &mdash; 81% of DiDi reviews are 1-star.
              Yet DiDi has only 166 Profeco complaints versus Rappi&apos;s 1,663,
              suggesting DiDi&apos;s problems live in the app experience while
              Rappi&apos;s issues escalate to formal regulatory complaints. For
              Uber, the relatively low 201 Profeco complaints combined with
              stronger app ratings indicate a more operational &mdash; rather
              than product &mdash; set of challenges, which aligns with the
              reform-driven sentiment shift visible in the review data.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. WHAT I'D DO WITH INTERNAL DATA ═══════════ */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            What I&apos;d Do With Internal Data
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl">
            This analysis uses publicly available data &mdash; which is already
            substantial. Here&apos;s what becomes possible with Uber&apos;s
            internal datasets:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Calibrate the Calculator",
                desc: "With actual partner earnings distributions, identify the exact percentage of Uber Eats partners above each threshold. Model how seasonal demand fluctuations push partners in and out of benefit eligibility.",
              },
              {
                title: "Map Support Tickets to Reform",
                desc: "Cross-reference complaint categories with specific regulatory provisions to identify which compliance requirements create the most partner friction. Prioritize process fixes by ticket volume.",
              },
              {
                title: "Onboarding Funnel Analysis",
                desc: "Track where in the registration flow (INE, RFC, bank account, IMSS enrollment) partners drop out — and which steps can be automated. Each percentage point of funnel improvement directly impacts partner supply.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8. HOW THIS WAS BUILT ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#276EF1] font-semibold text-sm uppercase tracking-widest mb-4">
                How This Was Built
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                One person.
                <br />
                One session.
                <br />
                An agent system.
              </h2>
              <p className="text-gray-600 mb-4">
                This entire analysis &mdash; data collection, processing,
                visualization, and deployment &mdash; was built in a single
                working session using a personal AI agent system.
              </p>
              <p className="text-gray-600 mb-6">
                Not by copy-pasting into ChatGPT. Through coordinated specialist
                agents that I design, direct, and quality-control &mdash; the
                same system I&apos;d build for Uber&apos;s Strategy &amp; Ops
                team.
              </p>
              <a
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                See the full system breakdown &rarr;
              </a>
            </div>
            <div className="bg-black rounded-xl p-6 text-white text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-[#276EF1] text-xs font-bold">
                    D
                  </div>
                  <div>
                    <p className="font-semibold">Data Agents</p>
                    <p className="text-gray-400 text-xs">
                      Google Play scraping, Profeco API, IMSS data
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Research Agents</p>
                    <p className="text-gray-400 text-xs">
                      DOF regulatory analysis, SAT tax rates, KPMG reports
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold">
                    E
                  </div>
                  <div>
                    <p className="font-semibold">Execution Agents</p>
                    <p className="text-gray-400 text-xs">
                      Python pipeline, Next.js web, Vercel deploy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">
                    Q
                  </div>
                  <div>
                    <p className="font-semibold">Quality Agents</p>
                    <p className="text-gray-400 text-xs">
                      Visual audit, mobile test, data verification
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#276EF1]/30 flex items-center justify-center text-[#276EF1] text-xs font-bold">
                      AF
                    </div>
                    <div>
                      <p className="font-semibold">Strategic Layer (Me)</p>
                      <p className="text-gray-400 text-xs">
                        Framework design, insight extraction, quality control
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. ABOUT THIS ANALYSIS ═══════════ */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About This Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Bio */}
            <div>
              <p className="text-gray-600 mb-3 font-semibold text-lg">
                Alex Friedlander
              </p>
              <ul className="text-gray-600 text-sm space-y-2.5 mb-6">
                <li>
                  &bull;{" "}
                  <strong>BBA, ESADE Business School</strong> (Ramon Llull
                  University, Barcelona)
                </li>
                <li>
                  &bull;{" "}
                  <strong>4 years at Alfa Consulting / Accenture</strong>{" "}
                  &mdash; Strategy &amp; operational improvement for major
                  utilities across the US, Spain, and Singapore. Built Power BI
                  dashboards for executive decision-making, led maintenance
                  optimization, designed crew programs improving field
                  productivity.
                </li>
                <li>
                  &bull;{" "}
                  <strong>AI Business Development, ZenAI Group (APAC)</strong>{" "}
                  &mdash; Sole responsibility for expanding an AI solutions
                  company across Southeast Asia. Built enterprise sales pipeline
                  from scratch in a new market.
                </li>
                <li>
                  &bull; <strong>Founder, Bookids</strong> &mdash; AI-powered
                  personalized children&apos;s books. Built from zero to live
                  product across 3 markets with no external funding.
                </li>
                <li>
                  &bull; <strong>Spanish &amp; US citizen</strong> &mdash;
                  Native Spanish speaker with direct operational context for
                  Mexico&apos;s regulatory and cultural landscape.
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                alexfriedlander01@gmail.com
              </p>
            </div>

            {/* Right: Why This Matters */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">
                Why This Matters for the Role
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  [
                    "Design operational workflows",
                    "Interactive calculator models the registration/threshold workflow",
                  ],
                  [
                    "Identify partner pain points",
                    "40K review sentiment analysis across 4 platforms",
                  ],
                  [
                    "Use SQL and data tools",
                    "Python pipeline + regulatory data analysis + Next.js visualization",
                  ],
                  [
                    "Monitor compliance metrics",
                    "Full Chapter IX Bis analysis with enrollment tracking",
                  ],
                  [
                    "Stay informed on regulatory trends",
                    "Real-time reform tracking through SAT mandate date",
                  ],
                  [
                    "Advocate for delivery partners",
                    "Partner economics and sentiment front and center",
                  ],
                ].map(([req, proof]) => (
                  <div key={req} className="flex gap-3">
                    <span className="text-[#276EF1] mt-0.5 shrink-0 font-bold">
                      &#10003;
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">
                        &ldquo;{req}&rdquo;
                      </p>
                      <p className="text-gray-500">{proof}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 10. METHODOLOGY ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h3 className="font-bold text-lg mb-4">
            Methodology &amp; Data Sources
          </h3>
          <div className="text-sm text-gray-500 space-y-2">
            <p>
              <strong>Review data:</strong> Google Play Store, scraped March
              2026. 10,200 reviews per platform (Uber Driver, DiDi Driver, Uber
              Eats Consumer, Rappi Consumer). Sentiment and keyword analysis via
              Python NLP pipeline.
            </p>
            <p>
              <strong>Regulatory data:</strong> DOF (Diario Oficial de la
              Federaci&oacute;n), SAT published rates, IMSS datos abiertos,
              KPMG Mexico tax guides, Greenberg Traurig regulatory analysis.
            </p>
            <p>
              <strong>Complaint data:</strong> Profeco Bur&oacute; Comercial via
              datos.gob.mx &mdash;{" "}
              {profeco.total_complaints_in_dataset.toLocaleString()} total
              complaints in dataset ({profeco.date_range}).
            </p>
            <p>
              <strong>Calculator parameters:</strong> ISR withholding rates from
              Art. 113-A LISR. Exclusion rates and income thresholds from DOF
              December 2025 revision. IMSS worker contribution at 2.5% per
              official schedule.
            </p>
            <p className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800">
              <strong>Known limitations:</strong> Review data represents Google
              Play Store users, not a representative survey of all delivery
              partners. Calculator uses published rates &mdash; actual employer
              implementations may vary. IMSS pilot enrollment figures are from
              news reports, not raw IMSS data. Profeco complaints reflect
              formally filed cases, not total dissatisfaction.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              All data scraped and collected: March 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 11. FOOTER ═══════════ */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-6 text-sm text-center">
          <p>
            Alex Friedlander &bull; alexfriedlander01@gmail.com &bull; US &amp;
            Spanish Citizenship &bull; Open to relocate to CDMX
          </p>
        </div>
      </footer>
    </main>
  );
}
