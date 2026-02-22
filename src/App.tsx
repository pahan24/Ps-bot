/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 border-b border-slate-800 pb-6">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">WhatsApp Bot Server</h1>
            <p className="text-slate-400">Production-ready automation server</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="font-semibold text-white">System Status</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Server</span>
                <span className="text-green-400">Running</span>
              </div>
              <div className="flex justify-between">
                <span>Port</span>
                <span className="font-mono">3000</span>
              </div>
              <div className="flex justify-between">
                <span>Environment</span>
                <span className="font-mono">Development</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-white">Endpoints</h3>
            </div>
            <div className="space-y-2 text-sm font-mono text-slate-400">
              <div className="flex justify-between items-center p-2 bg-slate-950 rounded">
                <span>GET /api/webhook</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">VERIFY</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-950 rounded">
                <span>POST /api/webhook</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">MSG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Setup Instructions</h2>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-mono text-slate-500">Environment Configuration</span>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-slate-400">
                Ensure your <code className="text-orange-400">.env</code> file is configured with your Meta Developer credentials:
              </p>
              <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
{`WHATSAPP_TOKEN="EAAG..."
PHONE_NUMBER_ID="100..."
VERIFY_TOKEN="my_secure_token"`}
              </pre>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
              Next Steps
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
              <li>Go to the <a href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Meta App Dashboard</a>.</li>
              <li>Navigate to <strong>WhatsApp</strong> &gt; <strong>Configuration</strong>.</li>
              <li>Click <strong>Edit</strong> in the Webhook section.</li>
              <li>Enter the Callback URL: <code className="bg-slate-800 px-1 py-0.5 rounded text-white">{window.location.origin}/api/webhook</code></li>
              <li>Enter your Verify Token (from .env).</li>
              <li>Verify and Save.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
