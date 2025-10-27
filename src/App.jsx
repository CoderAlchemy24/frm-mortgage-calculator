import { useState } from "react";
import './App.css';
import CalculatorPage from './components/CalculatorPage.jsx';
import ResultPage from './components/ResultPage.jsx';

export default function App() {
  const [calculated1, setCalculated1] = useState(null);
  const [calculated2, setCalculated2] = useState(null);

  const handleCalculate = (monthlyPayment, totalPayment) => {
    setCalculated1(monthlyPayment);
    setCalculated2(totalPayment);
  };

  return (
    <div className="App">
      
      <main className="app-main">
         <CalculatorPage onCalculate={handleCalculate} />
         <ResultPage calculated1={calculated1} calculated2={calculated2} />
      </main>
    </div>
  );
}