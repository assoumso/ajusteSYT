export interface BetInputs {
  totalStake: number;
  backOdds: number;
  layOdds: number;
  exchangeCommission: number;
}

export interface CalculationResult {
  backStake: number;
  layLiability: number;
  layStake: number; // The backer's stake on the exchange
  profitIfGoal: number;
  profitIfNoGoal: number;
  backProfit: number; // Potential profit from the Back bet alone
  isValid: boolean;
  error?: string;
}