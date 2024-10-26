import React, { useState } from 'react';

const RuleForm = ({ onSubmit }) => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ruleString);
    setRuleString('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ruleString" className="block text-sm font-medium text-gray-700">
          Rule String
        </label>
        <textarea
          id="ruleString"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
          placeholder="Enter rule string (e.g., age > 30 AND department = 'Sales')"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Create Rule
      </button>
    </form>
  );
};

export default RuleForm;