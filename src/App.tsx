import React, { useState } from 'react';
import { Header } from './components/Header';
import { LiveCloneView } from './components/LiveCloneView';
import { FutureUseCases } from './components/FutureUseCases';
import { ClonerStudio } from './components/ClonerStudio';
import { AccuracyAudit } from './components/AccuracyAudit';
import { RepoAnalysis } from './components/RepoAnalysis';
import { OfflineGuide } from './components/OfflineGuide';
import { QuickTranspiler } from './components/QuickTranspiler';
import { ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'live' | 'future' | 'accuracy' | 'studio' | 'breakdown' | 'setup-guide' | 'transpiler'>('future');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Global Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'live' && <LiveCloneView />}
        {activeTab === 'future' && <FutureUseCases />}
        {activeTab === 'accuracy' && <AccuracyAudit />}
        {activeTab === 'studio' && <ClonerStudio />}
        {activeTab === 'breakdown' && <RepoAnalysis />}
        {activeTab === 'setup-guide' && <OfflineGuide />}
        {activeTab === 'transpiler' && <QuickTranspiler />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Invitation Homes Reconstructed • Zero-AI Cloner Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('live')}
              className="hover:text-white transition font-medium"
            >
              Live Cloned Site
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('future')}
              className="hover:text-white transition font-medium text-amber-400"
            >
              Future Playbooks
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('accuracy')}
              className="hover:text-white transition"
            >
              Accuracy Audit
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('studio')}
              className="hover:text-white transition"
            >
              Cloner Studio &amp; ZIP
            </button>
            <span>•</span>
            <a
              href="https://www.invitationhomes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              <span>Original Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
