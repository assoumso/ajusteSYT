import { BetInputs, CalculationResult } from './types';

export const calculateStakes = (inputs: BetInputs): CalculationResult => {
  const { totalStake, backOdds, layOdds, exchangeCommission } = inputs;

  // Validation: Minimum Stake Check
  if (totalStake < 7) {
    return {
      backStake: 0,
      layLiability: 0,
      layStake: 0,
      profitIfGoal: 0,
      profitIfNoGoal: 0,
      backProfit: 0,
      isValid: false,
      error: "La mise minimale est de 7 €. Le calcul ne peut pas être effectué en dessous de ce montant."
    };
  }

  // Validation: Odds Check
  if (backOdds <= 1 || layOdds <= 1) {
    return {
      backStake: 0,
      layLiability: 0,
      layStake: 0,
      profitIfGoal: 0,
      profitIfNoGoal: 0,
      backProfit: 0,
      isValid: false
    };
  }

  // STRATEGY: REFUND ON 0-0 (UNDER 0.5 WINS)
  // Sb = T / BackOdds
  const backStake = totalStake / backOdds;
  
  // Calculate remaining money for Liability
  const layLiability = totalStake - backStake;

  // Calculate the Lay Stake (The amount we enter into the exchange "Backer's Stake" box)
  const layStake = layLiability / (layOdds - 1);

  // Calculate Outcomes
  
  // Scenario: Goal Scored (Lay Wins, Back Loses)
  const grossLayWin = layStake;
  const netLayWin = grossLayWin * (1 - exchangeCommission / 100);
  const profitIfGoal = netLayWin - backStake;

  // Scenario: 0-0 at HT (Back Wins, Lay Loses)
  const backProfit = backStake * (backOdds - 1);
  const profitIfNoGoal = backProfit - layLiability;

  return {
    backStake,
    layLiability,
    layStake,
    profitIfGoal,
    profitIfNoGoal,
    backProfit,
    isValid: true
  };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
};