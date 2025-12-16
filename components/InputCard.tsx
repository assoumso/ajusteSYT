import React from 'react';

interface InputCardProps {
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  step?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const InputCard: React.FC<InputCardProps> = ({
  label,
  value,
  onChange,
  icon,
  step = "0.01",
  prefix,
  suffix,
  className = ""
}) => {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="number"
          step={step}
          min="1.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-50 border border-slate-300 text-slate-900 text-lg font-bold rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 block p-2.5 ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};