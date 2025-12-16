import React, { useState, useEffect } from 'react';
import { Calculator, Settings, Info, RefreshCw, Trash2 } from 'lucide-react';
import { InputCard } from './components/InputCard';
import { ResultsSection } from './components/ResultsSection';
import { calculateStakes } from './utils';
import { BetInputs, CalculationResult } from './types';

const App: React.FC = () => {
  // Use strings for input state to allow smooth typing of decimals (e.g. "2." or empty field)
  const [inputs, setInputs] = useState({
    totalStake: "20",
    backOdds: "2.3", // Default from user image
    layOdds: "2.1",  // Default from user image
    exchangeCommission: "0" // Optional
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    // Parse strings to numbers for calculation
    const numInputs: BetInputs = {
      totalStake: parseFloat(inputs.totalStake.replace(',', '.')) || 0,
      backOdds: parseFloat(inputs.backOdds.replace(',', '.')) || 0,
      layOdds: parseFloat(inputs.layOdds.replace(',', '.')) || 0,
      exchangeCommission: parseFloat(inputs.exchangeCommission.replace(',', '.')) || 0
    };
    setResult(calculateStakes(numInputs));
  }, [inputs]);

  const updateInput = (key: keyof typeof inputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearInputs = () => {
    setInputs({
      totalStake: "20", // Keep stake default or clear? Keeping 20 as it's the base.
      backOdds: "",
      layOdds: "",
      exchangeCommission: "0"
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg shadow-md">
              <Calculator size={24} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">Expert Betting Calc</h1>
              <p className="text-xs text-amber-100 font-medium opacity-90">Stratégie 0-0 vs Under 0.5</p>
            </div>
          </div>
          <button 
            onClick={clearInputs}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/10 hover:bg-slate-900/20 text-white rounded-lg text-xs transition-colors border border-white/20 backdrop-blur-sm"
          >
            <Trash2 size={14} />
            Effacer Cotes
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Strategy Explanation Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-full hidden sm:block">
              <Info size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">Calculateur de Mises</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Saisissez vos cotes ci-dessous pour obtenir la répartition exacte.
                <br />
                Le calculateur ajuste mathématiquement les mises pour garantir un <strong>remboursement complet</strong> si le score reste 0-0 à la mi-temps.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputCard 
            label="Mise Totale (Risque)" 
            value={inputs.totalStake} 
            onChange={(v) => updateInput('totalStake', v)}
            suffix="€"
            className="md:col-span-1 border-amber-200 ring-4 ring-amber-50/50"
          />
          <InputCard 
            label="Cote Under 0.5 (Back)" 
            value={inputs.backOdds} 
            onChange={(v) => updateInput('backOdds', v)}
            step="0.01"
            className="md:col-span-1"
          />
          <InputCard 
            label="Cote 0-0 (Lay)" 
            value={inputs.layOdds} 
            onChange={(v) => updateInput('layOdds', v)}
            step="0.01"
            className="md:col-span-1"
          />
        </div>

        {/* Results */}
        {result && <ResultsSection result={result} />}

        {/* Advanced / Disclaimer */}
        <div className="border-t border-slate-200 pt-6">
           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2 text-sm text-slate-500">
               <Settings size={16} />
               <span>Commission Exchange:</span>
               <input 
                  type="number" 
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-center focus:ring-amber-500 focus:border-amber-500"
                  value={inputs.exchangeCommission}
                  onChange={(e) => updateInput('exchangeCommission', e.target.value)}
                />
                <span>%</span>
             </div>
             <p className="text-xs text-slate-400 text-center sm:text-right max-w-md">
               Les résultats se mettent à jour automatiquement dès la saisie.
             </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;