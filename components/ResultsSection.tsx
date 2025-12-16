import React from 'react';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils';
import { TrendingUp, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

interface ResultsSectionProps {
  result: CalculationResult;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  // Display Error if present
  if (result.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
        <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={24} />
        <div>
          <h3 className="text-red-800 font-bold text-sm uppercase tracking-wide">Attention</h3>
          <p className="text-red-700 font-medium">{result.error}</p>
        </div>
      </div>
    );
  }

  if (!result.isValid) return null;

  const isProfitPositive = result.profitIfGoal >= 0;

  return (
    <div className="space-y-6">
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Bookmaker Action - Now Gold */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
          <h3 className="text-amber-800 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
            1. Bookmaker (Back)
          </h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-amber-700 mb-1">Miser sur <span className="font-bold">Under 0.5</span></p>
              <p className="text-3xl font-bold text-amber-950">{formatCurrency(result.backStake)}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-amber-600 font-medium">Gain potentiel</span>
              <p className="text-lg font-semibold text-amber-700">
                +{formatCurrency(result.backProfit)}
              </p>
            </div>
          </div>
        </div>

        {/* Exchange Action - Stays Rose/Red */}
        <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl shadow-sm">
          <h3 className="text-rose-800 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
            2. Exchange (Lay)
          </h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-rose-600 mb-1">Mise Backer (Stake)</p>
              <p className="text-3xl font-bold text-rose-900">{formatCurrency(result.layStake)}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-rose-400 font-medium">Responsabilité (Risk)</span>
              <p className="text-lg font-semibold text-rose-700">
                -{formatCurrency(result.layLiability)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Table */}
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Simulation des Résultats</h3>
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full font-medium">Net Profit</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {/* Scenario: Goal Scored */}
          <div className={`px-6 py-4 flex items-center justify-between transition-colors ${isProfitPositive ? 'hover:bg-emerald-50' : 'hover:bg-red-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${isProfitPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-800">But Marqué (Score &ne; 0-0)</p>
                <p className="text-sm text-slate-500">Le Lay 0-0 gagne, Under 0.5 perd.</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${isProfitPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {isProfitPositive ? '+' : ''}{formatCurrency(result.profitIfGoal)}
              </p>
              <span className={`text-xs font-bold uppercase tracking-wide ${isProfitPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isProfitPositive ? 'Profit' : 'Perte'}
              </span>
            </div>
          </div>

          {/* Scenario: No Goal */}
          <div className="px-6 py-4 flex items-center justify-between hover:bg-amber-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Pas de But (0-0 MT)</p>
                <p className="text-sm text-slate-500">Le Under 0.5 gagne, Lay 0-0 perd.</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${Math.abs(result.profitIfNoGoal) < 0.05 ? 'text-slate-400' : 'text-amber-600'}`}>
                {Math.abs(result.profitIfNoGoal) < 0.01 ? '0,00 €' : formatCurrency(result.profitIfNoGoal)}
              </p>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Remboursé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3 text-sm text-amber-800 border border-amber-100">
        <ArrowRight className="shrink-0 mt-0.5" size={18} />
        <p>
          En utilisant cette répartition, vous risquez un total de <strong>{formatCurrency(result.backStake + result.layLiability)}</strong>. 
          Si un but est marqué, vous {isProfitPositive ? 'gagnez' : 'perdez'} <strong>{formatCurrency(Math.abs(result.profitIfGoal))}</strong>. 
          Si aucun but n'est marqué, vous récupérez votre mise (opération blanche).
        </p>
      </div>

    </div>
  );
};