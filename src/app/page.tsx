"use client";

import React, { useState } from "react";
import {
  Globe,
  Briefcase,
  BarChart3,
  Code,
  CheckCircle2,
  GraduationCap,
  Calculator,
  Send,
  X,
  CreditCard,
  Laptop,
  Check,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tech" | "finance">("tech");

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(1000);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(1);
  const monthlyInterestRate = 0.3; // 30% per month

  const totalInterest = Math.round(loanAmount * monthlyInterestRate * loanTermMonths);
  const totalRepayment = Math.round(loanAmount + totalInterest);
  const monthlyRepayment = Math.round(totalRepayment / loanTermMonths);

  // Modal States
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Field States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "Student",
    monthlyIncome: "",
    projectDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Safe JSON Parsing Submission Handler
  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          userType: formData.userType,
          monthlyIncome: formData.monthlyIncome,
          loanAmount,
          loanTermMonths,
          totalInterest,
          totalRepayment,
          monthlyRepayment,
        }),
      });

      // Safely parse JSON or capture plain text/HTML error from server
      const text = await response.text();
      let resData;
      try {
        resData = JSON.parse(text);
      } catch (e) {
        console.error("Server returned non-JSON response:", text);
        alert(`Server error (${response.status}): Check browser console or terminal logs.`);
        return;
      }

      if (response.ok && resData.success) {
        setSubmittedMessage(
          `Thank you ${formData.fullName}! Your loan application for R${loanAmount.toLocaleString()} (${loanTermMonths} mo) has been submitted successfully via email. We will review it shortly.`
        );
        setIsLoanModalOpen(false);
      } else {
        alert(`Failed to send application: ${resData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(
      `Thank you ${formData.fullName}! Your request for "${selectedService}" has been submitted. We'll contact you within 24 hours with a custom quote.`
    );
    setSelectedService(null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
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
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "tech"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Laptop className="w-4 h-4" /> Tech Solutions
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "finance"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <CreditCard className="w-4 h-4" /> Financial Services
            </button>
          </div>
        </div>
      </header>

      {/* SUCCESS CONFIRMATION BANNER */}
      {submittedMessage && (
        <div className="max-w-4xl mx-auto mt-6 px-6">
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-lg shadow-emerald-950/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="text-sm font-medium">{submittedMessage}</p>
            </div>
            <button
              onClick={() => setSubmittedMessage(null)}
              className="text-xs font-bold text-emerald-400 hover:text-white uppercase tracking-wider bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-700/50"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-10 text-center">
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
            : "Accessible, transparent short-term advances with fixed 30% monthly rates and zero hidden charges."}
        </p>
      </section>

      {/* TAB CONTENT: TECH SOLUTIONS */}
      {activeTab === "tech" && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-950/60 border border-blue-800/50 w-fit rounded-xl text-blue-400 mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Advert & Static Sites</h3>
                <p className="text-sm text-slate-400 mb-4">
                  High-speed landing pages and promo websites built to convert visitors into clients.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Responsive mobile layout
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Contact form integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Search engine (SEO) setup
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R2,500 – R6,500</div>
                <button
                  onClick={() => setSelectedService("Advert & Static Sites")}
                  className="w-full text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-950/60 border border-blue-800/50 w-fit rounded-xl text-blue-400 mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Business Websites</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Multi-page corporate platforms with full brand identity and social integration.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> 5–8 pages included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Domain & hosting config
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Google Analytics setup
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R7,500 – R15,000</div>
                <button
                  onClick={() => setSelectedService("Business Websites")}
                  className="w-full text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-900/60 border border-blue-500/40 rounded-2xl p-6 hover:border-blue-500 transition-all flex flex-col justify-between relative shadow-lg shadow-blue-950/50">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <div className="p-3 bg-blue-600/20 border border-blue-500/50 w-fit rounded-xl text-blue-400 mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Data Dashboards</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Interactive real-time visual analytics and reporting tools tailored for operations.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Data visualization charts
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Secure user authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Automated PDF exports
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R12,000 – R28,000</div>
                <button
                  onClick={() => setSelectedService("Data Dashboards")}
                  className="w-full text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-950/60 border border-blue-800/50 w-fit rounded-xl text-blue-400 mb-4">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Custom Web Apps</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Full-stack software application with customized backend databases and APIs.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Scalable SQL/NoSQL DB
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Role-based access control
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" /> Custom API integration
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xl font-extrabold text-blue-400 mb-4">R18,000+</div>
                <button
                  onClick={() => setSelectedService("Custom Web Apps")}
                  className="w-full text-center py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Request Quote
                </button>
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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-800/50 rounded-xl text-emerald-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Short-Term Loan Calculator
                </h3>
              </div>

              {/* Amount Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-400 font-medium">Loan Amount</label>
                  <span className="text-xl font-bold text-emerald-400">
                    R{loanAmount.toLocaleString()}
                  </span>
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
                  <span className="text-slate-400">Monthly Interest Rate</span>
                  <span className="text-amber-400 font-medium">30% / month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Interest</span>
                  <span className="text-slate-200 font-medium">R{totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Repayment</span>
                  <span className="text-slate-200 font-medium">R{totalRepayment.toLocaleString()}</span>
                </div>
                <hr className="border-slate-800 my-2" />
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-slate-200">Monthly Payment</span>
                  <span className="text-emerald-400 text-lg">
                    R{monthlyRepayment.toLocaleString()} / mo
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLoanModalOpen(true)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Apply for Loan
              </button>
            </div>

            {/* REQUIREMENTS & ELIGIBILITY */}
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-950/60 border border-emerald-800/50 rounded-lg text-emerald-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">For Students</h4>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Quick short-term advances to assist with study materials, living expenses, or emergency needs.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Valid Student ID / Enrollment proof
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> South African ID document
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 3-Month Bank Statement or Stipend proof
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-950/60 border border-emerald-800/50 rounded-lg text-emerald-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">For Workers</h4>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Payday bridges to help manage unexpected costs before your next salary cycle.
                </p>
                <ul className="text-xs text-slate-300 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Proof of employment / Latest Payslip
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> South African ID document
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 3-Month official bank statements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LOAN APPLICATION MODAL */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsLoanModalOpen(false)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-slate-400 hover:text-white disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-white mb-1">Loan Application</h3>
            <p className="text-xs text-slate-400 mb-4">
              Applying for{" "}
              <span className="text-emerald-400 font-bold">R{loanAmount.toLocaleString()}</span>{" "}
              over <span className="text-emerald-400 font-bold">{loanTermMonths} month(s)</span>.
            </p>

            <form onSubmit={handleLoanSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Sipho Ndlovu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@mail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="071 234 5678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Applicant Type
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Worker">Worker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Est. Monthly Income
                  </label>
                  <input
                    type="text"
                    name="monthlyIncome"
                    required
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    placeholder="e.g. R3,500"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-xl font-bold text-sm transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Loan Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TECH QUOTE MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-white mb-1">Request Quote</h3>
            <p className="text-xs text-slate-400 mb-4">
              Service: <span className="text-blue-400 font-bold">{selectedService}</span>
            </p>

            <form onSubmit={handleTechSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Megan Ruiters"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@mail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="071 234 5678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Details / Requirements
                </label>
                <textarea
                  name="projectDetails"
                  rows={3}
                  required
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  placeholder="Tell us what you want to build (e.g. target audience, key features, deadline)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-colors mt-2 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Quote Request
              </button>
            </form>
          </div>
        </div>
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