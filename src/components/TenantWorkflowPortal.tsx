import React, { useState } from 'react';
import { Check, Shield, FileText, Wrench, Home } from 'lucide-react';
import { OfficialHeader, OfficialFooter } from './OfficialSiteChrome';
import { SAMPLE_PROPERTIES } from '../data/properties';

export function TenantWorkflowPortal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '(555) 019-2834',
    income: '8500',
    pets: '1 dog',
    notes: 'Looking to move in by next month.'
  });

  const property = SAMPLE_PROPERTIES[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <OfficialHeader />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-[#231f20] text-white p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9fcc3b]">Resident Portal &amp; Leasing Workflow</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Tenant Leasing &amp; Residency Center</h1>
            <p className="text-sm text-slate-300 mt-1">Complete your application, review holding terms, manage maintenance, and sign lease documents.</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex border-b border-slate-200 pb-4 gap-2 overflow-x-auto">
              {['1. Application', '2. Screening', '3. Hold Terms', '4. Lease Review', '5. Maintenance'].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setStep(idx + 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    step === idx + 1 ? 'bg-[#04a54f] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#231f20]">Step 1: Household &amp; Application</h3>
                <p className="text-xs text-slate-600">Applying for: <strong>{property.title}</strong> ({property.address}, {property.city}, {property.state})</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name:</label>
                    <input 
                      type="text" 
                      value={formData.fullName} 
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address:</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number:</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Household Income ($):</label>
                    <input 
                      type="text" 
                      value={formData.income} 
                      onChange={e => setFormData({...formData, income: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="mt-6 px-6 py-3 bg-[#04a54f] text-white rounded-xl text-xs font-extrabold hover:bg-[#0b763c] shadow-md transition"
                >
                  Save &amp; Proceed to Screening →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#231f20]">Step 2: Screening &amp; Background Verification</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#04a54f] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Identity &amp; Background Check Verified</p>
                    <p className="text-emerald-700 mt-0.5">Credit score criteria met (&gt;620), income-to-rent ratio verified at 3.4x.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="mt-4 px-6 py-3 bg-[#04a54f] text-white rounded-xl text-xs font-extrabold hover:bg-[#0b763c] shadow-md transition"
                >
                  Proceed to Hold Terms →
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#231f20]">Step 3: Holding Deposit &amp; Terms</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Placing a holding deposit ensures the property is taken off the market for 48 hours while your lease is prepared.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Holding Deposit Amount:</span>
                    <span>$500.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Applied to Move-In Balance:</span>
                    <span>Yes</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(4)}
                  className="mt-4 px-6 py-3 bg-[#04a54f] text-white rounded-xl text-xs font-extrabold hover:bg-[#0b763c] shadow-md transition"
                >
                  Acknowledge &amp; Proceed to Lease →
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#231f20]">Step 4: Lease Review &amp; Execution</h3>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono space-y-1 text-slate-700 max-h-48 overflow-y-auto">
                  <p className="font-bold">RESIDENTIAL LEASE AGREEMENT - INVITATION HOMES</p>
                  <p>1. PARTIES: Landlord (Invitation Homes Inc.) and Tenant ({formData.fullName})...</p>
                  <p>2. PROPERTY: {property.address}, {property.city}, {property.state} {property.zipCode}</p>
                  <p>3. TERM: 12-Month Lease commencing November 1, 2026.</p>
                  <p>4. RENT: ${property.monthlyRent.toLocaleString()} due on the 1st of each month.</p>
                </div>
                <button 
                  onClick={() => setStep(5)}
                  className="mt-4 px-6 py-3 bg-[#04a54f] text-white rounded-xl text-xs font-extrabold hover:bg-[#0b763c] shadow-md transition"
                >
                  Sign &amp; Execute Lease →
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#231f20]">Step 5: ProCare™ Maintenance &amp; Residency</h3>
                <p className="text-xs text-slate-600">Lease executed! You can now submit maintenance requests anytime.</p>
                
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-800">Submit New Maintenance Ticket:</h4>
                  <input type="text" placeholder="Describe issue (e.g., Kitchen faucet dripping)..." className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs" />
                  <button onClick={() => alert('Maintenance ticket submitted successfully! ProCare team notified.')} className="px-4 py-2 bg-[#231f20] text-white rounded-lg text-xs font-bold">
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <OfficialFooter />
    </div>
  );
}
