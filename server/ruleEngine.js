// Node types
const NODE_TYPES = {
    OPERATOR: 'operator',
    OPERAND: 'operand',
  };
  
  // Operator types
  const OPERATORS = {
    AND: 'AND',
    OR: 'OR',
    GT: '>',
    LT: '<',
    EQ: '=',
  };
  
  class Node {
    constructor(type, value = null, left = null, right = null) {
      this.type = type;
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  
  export function createRule(ruleString) {
    const tokens = tokenize(ruleString);
    return parseExpression(tokens);
  }
  
  function tokenize(ruleString) {
    return ruleString.match(/\(|\)|AND|OR|>|<|=|'[^']*'|\S+/g);
  }
  
  function parseExpression(tokens) {
    const stack = [];
    let current = null;
  
    for (const token of tokens) {
      if (token === '(') {
        stack.push(current);
        current = null;
      } else if (token === ')') {
        const node = current;
        current = stack.pop();
        if (current) {
          current.right = node;
        } else {
          current = node;
        }
      } else if (token === 'AND' || token === 'OR') {
        const node = new Node(NODE_TYPES.OPERATOR, token);
        node.left = current;
        stack.push(node);
        current = null;
      } else if (token === '>' || token === '<' || token === '=') {
        const node = new Node(NODE_TYPES.OPERATOR, token);
        node.left = current;
        current = node;
      } else {
        const node = new Node(NODE_TYPES.OPERAND, token.replace(/'/g, ''));
        if (current) {
          current.right = node;
        } else {
          current = node;
        }
      }
    }
  
    return current;
  }
  
  export function combineRules(rules) {
    if (rules.length === 0) return null;
    if (rules.length === 1) return createRule(rules[0]);
  
    const combinedRule = rules.join(') AND (');
    return createRule(`(${combinedRule})`);
  }
  
  export function evaluateRule(rule, data) {
    function evaluate(node) {
      if (!node) return false;  // If node is null, return false instead of true
  
      // Handle OPERAND
      if (node.type === NODE_TYPES.OPERAND) {
        // Check if the operand (e.g., 'age' or 'income') exists in data
        if (data.hasOwnProperty(node.value)) {
          return data[node.value];  // Return the value from the data
        } else {
          return false;  // If the data field doesn't exist, return false
        }
      }
  
      // Handle OPERATOR
      if (node.type === NODE_TYPES.OPERATOR) {
        const left = evaluate(node.left);
        const right = evaluate(node.right);
  
        switch (node.value) {
          case OPERATORS.AND:
            return left && right;
          case OPERATORS.OR:
            return left || right;
          case OPERATORS.GT:
            return left > right;
          case OPERATORS.LT:
            return left < right;
          case OPERATORS.EQ:
            return left == right;
        }
      }
  
      return false;  // In case of unknown conditions, return false
    }
  
    return evaluate(rule);
  }
  