import { DeleteIcon, DumbbellIcon, LucideDelete, Trash } from 'lucide-react';
import React from 'react';

const API_URL = 'http://localhost:5000/api';

const RuleList = ({ rules , setRules }) => {

  const deleteRule=async(ruleId)=>{
    try {
      const response = await fetch(`${API_URL}/rules/${ruleId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ruleId: ruleId}),
      });
      console.log(ruleId)
      setRules((rules) => rules.filter(rule => rule._id !== ruleId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting rule', error);
    }
  }

  return (
    <ul className="space-y-2">
      {rules.map((rule, index) => (
        <div className='flex flex-row bg-gray-100 p-3 rounded'>
          <li key={rule._id}>
            <span className="font-semibold">Rule {index + 1}:</span> {rule.ruleString}
          </li>
          <button className='ml-auto text-red-200' onClick={()=>deleteRule(rule._id)}><Trash/></button>
        </div>
      ))}
    </ul>
  );
};

export default RuleList;