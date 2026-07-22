"use client";

import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tech" | "finance">("tech");

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(1000);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(1);
  const interestRate = 0.15; // 15% interest for demonstration

  const totalRepayment = Math.round(loanAmount * (1 + interestRate * loanTermMonths));
  const monthlyRepayment = Math.round(totalRepayment / loanTermMonths);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              BUKAYINKOSI SOLUTIONS
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Founded & Managed by Liyema Vanda
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "tech"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              💻 Tech Solutions
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "finance"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              💳 Financial Services
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/50 rounded-full inline-block mb-4">
          Professional Services Platform
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          {activeTab === "tech"
            ? "Tailored Digital & Software Solutions for Growth"
            : "Short-Term Financial Support for Students & Workers"}
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {activeTab === "tech"
            ? "From sleek promotional websites to sophisticated analytics dashboards, we build fast, secure software at competitive market prices."
            : "Accessible, transparent, and flexible short-term liquidity when you need it most. Clear repayment options with zero hidden fees."}
        </p>
      </section>

      {/* TAB CONTENT: TECH SOLUTIONS */}
      {activeTab === "tech" && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">🌐</span>
                <h3 className="text-xl font-bold text-white mb-2">Advert & Static Sites</h3>
                <p className="text-sm text-slate-400 mb-4">
                  High-speed landing pages and promo websites built to convert visitors into clients.
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li>✓ Responsive mobile layout</li>
                  <li>✓ Contact form integration</li>
                  <li>✓ SEO setup</li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R2,500 – R6,500</div>
                <a
                  href="#contact"
                  className="block text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">💼</span>
                <h3 className="text-xl font-bold text-white mb-2">Business Websites</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Multi-page corporate platforms with full brand identity and social integration.
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li>✓ 5–8 pages included</li>
                  <li>✓ Domain & hosting config</li>
                  <li>✓ Google Analytics setup</li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R7,500 – R15,000</div>
                <a
                  href="#contact"
                  className="block text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-900/60 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500 transition-all flex flex-col justify-between relative shadow-lg shadow-blue-950/50">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Popular
              </span>
              <div>
                <span className="text-2xl mb-3 block">📊</span>
                <h3 className="text-xl font-bold text-white mb-2">Data Dashboards</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Interactive real-time visual analytics and reporting tools tailored for operations.
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li>✓ Data visualization charts</li>
                  <li>✓ Secure user authentication</li>
                  <li>✓ Automated PDF exports</li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R12,000 – R28,000</div>
                <a
                  href="#contact"
                  className="block text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </a>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">⚙️</span>
                <h3 className="text-xl font-bold text-white mb-2">Custom Web Apps</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Full-stack software application with customized backend databases and APIs.
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li>✓ Scalable SQL/NoSQL DB</li>
                  <li>✓ Role-based access control</li>
                  <li>✓ Custom API integration</li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R18,000+</div>
                <a
                  href="#contact"
                  className="block text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: FINANCIAL SERVICES (LOANS) */}
      {activeTab === "finance" && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LOAN CALCULATOR WIDGET */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-extrabold text-white mb-6">
                Short-Term Loan Calculator
              </h3>

              {/* Amount Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-400 font-medium">Loan Amount</label>
                  <span className="text-xl font-bold text-emerald-400">R{loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>R300</span>
                  <span>R5,000</span>
                </div>
              </div>

              {/* Term Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-400 font-medium">Repayment Term</label>
                  <span className="text-xl font-bold text-emerald-400">
                    {loanTermMonths} {loanTermMonths === 1 ? "Month" : "Months"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1 Month</span>
                  <span>3 Months</span>
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Principal Amount</span>
                  <span className="text-slate-200 font-medium">R{loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Estimated Repayment</span>
                  <span className="text-slate-200 font-medium">R{totalRepayment.toLocaleString()}</span>
                </div>
                <hr className="border-slate-800 my-2" />
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-slate-200">Monthly Repayment</span>
                  <span className="text-emerald-400 text-lg">R{monthlyRepayment.toLocaleString()} / mo</span>
                </div>
              </div>

              <a
                href="#apply"
                className="block text-center w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-colors"
              >
                Apply for Loan
              </a>
            </div>

            {/* REQUIREMENTS & ELIGIBILITY */}
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-3">🎓 For Students</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Quick short-term advances to assist with study materials, living expenses, or emergency needs.
                </p>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Valid Student ID / Enrollment proof
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> South African ID document
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> 3-Month Bank Statement or Stipend proof
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-3">💼 For Workers</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Payday bridges to help manage unexpected costs before your next salary cycle.
                </p>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Proof of employment / Latest Payslip
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> South African ID document
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> 3-Month official bank statements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-2">
            © {new Date().getFullYear()} BUKAYINKOSI SOLUTIONS — Founded by Liyema Vanda. All Rights Reserved.
          </p>
          <p className="text-slate-600">Built with Next.js, React, and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}