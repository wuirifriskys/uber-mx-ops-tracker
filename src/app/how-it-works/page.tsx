import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Link
            href="/"
            className="text-[#276EF1] text-sm font-medium hover:underline mb-6 inline-block"
          >
            &larr; Back to Analysis
          </Link>
          <p className="text-[#276EF1] font-semibold text-sm uppercase tracking-widest mb-4">
            What I&apos;d Build for Uber&apos;s S&amp;O Team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            5 Tools for Delivery<br />Partner Operations
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            The analysis you just saw &mdash; 40,800 reviews, regulatory data, interactive calculator &mdash; was built in one working day. Here are the operational tools I&apos;d build for the team, and the system that makes it possible.
          </p>
        </div>
      </section>

      {/* PROPOSED S&O TOOLS — MOVED UP: lead with value */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-2">What I&apos;d Build First</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            Five systems that solve specific operational pain points for delivery partner operations.
            Start with one, prove value, scale from there.
          </p>

          <div className="space-y-6">
            {[
              {
                name: "Partner Income Monitor",
                trigger: "Runs daily",
                does: "Tracks which delivery partners are approaching the formal employment threshold. Flags threshold-crossing events for IMSS batch processing, reducing registration errors and improving monthly batch accuracy.",
                impact: "Reduce IMSS registration errors, improve monthly batch accuracy, prevent compliance gaps before they happen.",
                phase: "Phase 1",
              },
              {
                name: "Compliance Deadline Engine",
                trigger: "Runs continuously",
                does: "Auto-tracks all IMSS, SAT, and INFONAVIT obligations with dependency mapping. Alerts the team 30, 15, and 7 days before each deadline with required actions and responsible owners.",
                impact: "Prevent missed filings, reduce penalty risk, eliminate the spreadsheet tracking that inevitably falls behind.",
                phase: "Phase 1",
              },
              {
                name: "Partner Sentiment Tracker",
                trigger: "Runs weekly",
                does: "Scrapes Google Play reviews and driver forum mentions. NLP sentiment analysis with reform-keyword flagging surfaces emerging complaints before they become retention crises.",
                impact: "Early warning on partner satisfaction drops — before they show up in retention metrics or media coverage.",
                phase: "Phase 2",
              },
              {
                name: "Regulatory Change Scanner",
                trigger: "Runs daily",
                does: "Monitors DOF (Diario Oficial), STPS announcements, and SAT bulletins. Flags changes that affect platform worker obligations and summarizes relevance to Uber&apos;s Mexico operations.",
                impact: "Days or weeks of lead time vs. manual monitoring. Never blindsided by regulatory changes.",
                phase: "Phase 2",
              },
              {
                name: "Cross-functional Coordination Dashboard",
                trigger: "On-demand",
                does: "Single view of compliance status across Legal, Product, Ops, and Support. Tracks which team owns which obligation, current status, and blockers in real time.",
                impact: "Replaces status meetings with real-time visibility. Everyone sees the same truth.",
                phase: "Phase 3",
              },
            ].map((system, i) => (
              <div key={system.name} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 hover:border-[#276EF1]/30 transition">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#276EF1] font-mono font-bold text-sm">0{i + 1}</span>
                      <h3 className="font-bold text-lg">{system.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{system.trigger}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{system.phase}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-500 mb-1">What it does</p>
                    <p className="text-gray-600">{system.does}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 mb-1">Impact</p>
                    <p className="text-gray-600">{system.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THIS IS POSSIBLE — transition heading */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <p className="text-[#276EF1] font-semibold text-sm uppercase tracking-widest mb-2">
          How This Is Possible
        </p>
        <h2 className="text-3xl font-bold mb-2">The System Behind the Speed</h2>
        <p className="text-gray-500 max-w-2xl">
          Every tool above can be built because of an AI agent system I operate daily.
          Here&apos;s how it works.
        </p>
      </section>

      {/* TRADITIONAL VS AGENTIC */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">The Traditional Way vs. The Agentic Way</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-400">Traditional Approach</h3>
            <p className="text-sm text-gray-500 mb-4">What this analysis would typically require:</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="text-gray-300 shrink-0">01</span>
                <span>Market researcher collects regulatory and competitor data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300 shrink-0">02</span>
                <span>Data analyst processes app reviews and complaint datasets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300 shrink-0">03</span>
                <span>Policy specialist verifies compliance across IMSS, SAT, STPS, INFONAVIT</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300 shrink-0">04</span>
                <span>Web developer builds calculator, charts, and deploys the application</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-gray-400 text-sm">Team of 3-4 people &bull; 1-2 weeks &bull; Multiple handoffs and version conflicts</p>
            </div>
          </div>

          <div className="bg-black rounded-xl p-8 text-white">
            <h3 className="font-bold text-lg mb-4 text-[#06C167]">How This Was Built</h3>
            <p className="text-sm text-gray-400 mb-4">One person + coordinated AI agent system:</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="text-[#06C167] shrink-0">01</span>
                <span><strong>Data agents</strong> scraped 40,800 Google Play reviews across 4 apps in parallel</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#06C167] shrink-0">02</span>
                <span><strong>Research agents</strong> verified regulatory data across DOF, STPS, SAT, IMSS, INFONAVIT</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#06C167] shrink-0">03</span>
                <span><strong>I designed</strong> the analytical framework, chose partner economics as the lens</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#06C167] shrink-0">04</span>
                <span><strong>Execution agents</strong> built the pipeline, calculator, visualizations, and deployed</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">Single working day &bull; Zero handoffs &bull; Every figure human-verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE SYSTEM WORKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-2">How the System Works</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            Not a chatbot. A coordinated system of specialist agents that I design,
            direct, and quality-control. The agents handle execution at speed —
            I focus on strategy, frameworks, and judgment calls.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Data Agents",
                  color: "bg-blue-50 border-[#276EF1]/20",
                  titleColor: "text-[#276EF1]",
                  items: [
                    "Google Play review scraping (4 apps, 40,800 reviews)",
                    "Profeco complaints dataset (554,655 records)",
                    "IMSS employment data processing (4.6M rows per file)",
                    "Automated data cleaning and JSON export",
                  ],
                },
                {
                  title: "Research Agents",
                  color: "bg-green-50 border-[#06C167]/20",
                  titleColor: "text-[#06C167]",
                  items: [
                    "Regulatory verification across DOF, STPS, SAT, IMSS, INFONAVIT",
                    "Cross-referencing dates and rates across 6 legal sources",
                    "Identified 2 errors in initial research (Ch. IX Bis, exclusion rates)",
                    "Competitor pricing and positioning analysis",
                  ],
                },
                {
                  title: "Execution Agents",
                  color: "bg-orange-50 border-[#FF6937]/20",
                  titleColor: "text-[#FF6937]",
                  items: [
                    "Python data processing pipeline",
                    "Next.js application build with Recharts",
                    "Interactive calculator with real-time computation",
                    "Vercel deployment and QA",
                  ],
                },
              ].map((col) => (
                <div key={col.title} className={`rounded-xl p-6 border ${col.color}`}>
                  <h3 className={`font-bold mb-3 ${col.titleColor}`}>{col.title}</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-gray-300">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Human layer */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#276EF1] to-transparent" />
              <div className="bg-black rounded-xl p-6 md:p-8 text-white mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#276EF1] flex items-center justify-center font-bold text-sm">AF</div>
                  <div>
                    <p className="font-bold">Strategic Layer — Human in the Loop</p>
                    <p className="text-gray-400 text-sm">Where judgment, creativity, and accountability live</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  {[
                    ["Framework Design", "Chose partner economics as the analytical lens"],
                    ["Insight Extraction", "Identified the threshold break-even as the non-obvious finding"],
                    ["Quality Control", "Verified every regulatory figure against primary sources"],
                    ["Decision Making", "What to include, what to cut, how to frame the narrative"],
                  ].map(([title, desc]) => (
                    <div key={title}>
                      <p className="font-semibold text-[#276EF1] mb-1">{title}</p>
                      <p className="text-gray-400 text-xs">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UBER IS ALREADY AI-FIRST */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">Uber Is Already AI-First</h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          I&apos;m not proposing to &ldquo;bring AI to Uber&rdquo; — Uber already runs
          one of the most sophisticated ML infrastructures in the world. The question
          is how to extend these capabilities into S&amp;O workflows.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              name: "Michelangelo",
              desc: "Uber's ML platform powering ETA predictions, pricing, fraud detection across billions of trips.",
            },
            {
              name: "Driver Safety ML",
              desc: "Real-time trip monitoring, anomaly detection, crash detection algorithms protecting millions of rides daily.",
            },
            {
              name: "Customer Service AI",
              desc: "Automated resolution for common support issues, reducing ticket volume and response times at scale.",
            },
            {
              name: "Marketplace Optimization",
              desc: "Dynamic pricing, supply-demand matching, surge prediction — all powered by real-time ML pipelines.",
            },
          ].map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#276EF1]/20">
          <p className="text-sm text-gray-700">
            Applying AI agent systems to S&amp;O workflows is a natural extension of
            Uber&apos;s existing AI infrastructure — not a new capability, but a new
            application of what Uber already does better than almost anyone.
          </p>
        </div>
      </section>


      {/* WHAT AGENTS CAN'T DO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">What Agents Can&apos;t Do</h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Intellectual honesty about limitations is what separates useful AI
          deployment from hype. Here&apos;s where the human layer is irreplaceable:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-[#06C167]">Agents excel at</h3>
            {[
              "Structured data collection at scale",
              "Parallel research across multiple sources",
              "Pattern detection in large datasets",
              "Report generation and visualization",
              "Code generation and deployment",
              "Monitoring and alerting",
            ].map((item) => (
              <p key={item} className="flex gap-2 text-sm text-gray-600">
                <span className="text-[#06C167] shrink-0">&#10003;</span>
                {item}
              </p>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-red-600">Humans are essential for</h3>
            {[
              "Stakeholder relationships and negotiation",
              "Defining the right questions to ask",
              "Novel strategic decisions under ambiguity",
              "Vendor and partner management",
              "Quality control — agents hallucinate, every figure was human-verified",
              "Knowing when data doesn't tell the full story",
            ].map((item) => (
              <p key={item} className="flex gap-2 text-sm text-gray-600">
                <span className="text-red-400 shrink-0">&#10005;</span>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-white rounded-xl p-6 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>The deployment principle:</strong> Start small, prove value, scale incrementally.
            Not every process benefits from automation. The systems above are proposed
            as personal tools first — once they save measurable hours, they become team
            tools. No Big Bang deployments.
          </p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-6">Background &amp; Credentials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                This isn&apos;t theoretical — I&apos;ve been building and operating with
                AI agent systems daily for over a year. The infrastructure that
                produced this analysis is the same one I use to run my own business.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#276EF1] mt-1.5 shrink-0" />
                  <p className="text-gray-600">
                    <strong>Claude Code Certified by Anthropic</strong> — trained and
                    certified on agentic AI development with Claude&apos;s agent
                    infrastructure
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#276EF1] mt-1.5 shrink-0" />
                  <p className="text-gray-600">
                    <strong>Daily production use</strong> — research, data pipelines,
                    monitoring, content generation, and full-stack development through
                    coordinated agent workflows
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#276EF1] mt-1.5 shrink-0" />
                  <p className="text-gray-600">
                    <strong>Real business impact</strong> — built and operate Bookids,
                    an AI-powered e-commerce platform across 3 markets with zero
                    external funding
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-xl p-8 text-white">
              <h3 className="font-bold text-lg mb-4">The reference points</h3>
              <p className="text-gray-400 text-sm mb-4">
                Companies already operating this way at enterprise scale:
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Uber — Michelangelo, Safety ML, Marketplace AI</p>
                  <p className="text-gray-400">Already runs one of the world&apos;s most advanced ML platforms. Agent systems for S&amp;O extend existing infrastructure into new workflows.</p>
                </div>
                <div>
                  <p className="font-semibold">Block (Square) — &ldquo;Goose&rdquo;</p>
                  <p className="text-gray-400">150+ internal service integrations. 8-10 hours saved per employee per week. Used by HR, legal, ops, and strategy teams.</p>
                </div>
                <div>
                  <p className="font-semibold">Nubank</p>
                  <p className="text-gray-400">5,000+ employees use AI tools monthly across operations. 70% response time reduction. 13M+ customers in Mexico alone.</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-6">
                Sources: Uber Engineering Blog, Couchbase case study, Block/Sequoia podcast, Nubank tech blog
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-2xl text-gray-300 mb-2">You&apos;re not hiring one person.</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You&apos;re hiring a force multiplier.
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Every tool proposed above can be built. The question is which one
            creates the most value first.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="bg-[#276EF1] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a5cd4] transition"
            >
              &larr; Back to Analysis
            </Link>
            <a
              href="mailto:alexfriedlander01@gmail.com"
              className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition"
            >
              alexfriedlander01@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
