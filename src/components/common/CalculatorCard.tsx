import React from 'react';
import { CalculatorMeta } from '../../types/calculator';
import { Calculator, ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  onClick: () => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="m3-card-elevated popular-calc-card"
    >
      <div>
        <div className="popular-calc-header">
          <div className="popular-calc-icon">
            <Calculator size={18} />
          </div>

          <span className="popular-calc-badge">
            {calculator.category}
          </span>
        </div>

        <h3 className="popular-calc-title">
          {calculator.title}
        </h3>

        <p className="popular-calc-desc">
          {calculator.shortDescription}
        </p>
      </div>

      <div className="popular-calc-action">
        <span>Calculate</span>
        <ArrowRight size={14} />
      </div>
    </div>
  );
};
