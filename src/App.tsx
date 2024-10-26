import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, XCircle } from 'lucide-react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluationForm from './components/EvaluationForm';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [rules, setRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch(`${API_URL}/rules`);
      const data = await response.json();
      console.log("data",data)
      setRules(data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const handleCreateRule = async (ruleString) => {
    try {
      const response = await fetch(`${API_URL}/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleString }),
      });
      if (response.ok) {
        fetchRules();
      }
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleCombineRules = async () => {
    try {
      const response = await fetch(`${API_URL}/rules/combine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: rules.map(r => r.ruleString) }),
      });
      const data = await response.json();
      setCombinedRule(data);
      console.log(data);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

  const handleEvaluate = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/rules/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule: combinedRule, data: userData }),
      });

      const data = await response.json();
      setEvaluationResult(data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Rule Engine with AST</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PlusCircle className="mr-2" size={24} />
            Create New Rule
          </h2>
          <RuleForm onSubmit={handleCreateRule} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Existing Rules</h2>
          <RuleList rules={rules} setRules={setRules}/>
          <button
            onClick={handleCombineRules}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Combine Rules
          </button>
        </div>
        
        {combinedRule && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Combined Rule</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(combinedRule, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Evaluate Rule</h2>
          <EvaluationForm onSubmit={handleEvaluate} />
          {evaluationResult !== null && (
            <div className={`mt-4 p-4 rounded ${evaluationResult ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="flex items-center">
                {evaluationResult ? (
                  <CheckCircle2 className="mr-2 text-green-500" size={24} />
                ) : (
                  <XCircle className="mr-2 text-red-500" size={24} />
                )}
                Rule evaluation result: <strong>{evaluationResult ? 'True' : 'False'}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;