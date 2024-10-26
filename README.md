
# Rule Engine with AST

## Overview
This project is a simple 3-tier rule engine application designed to determine user eligibility based on various attributes such as age, department, income, and spending. The application utilizes an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of these rules. The tech stack includes MongoDB for the backend and React with Tailwind CSS and Axios for the frontend.

![WhatsApp Image 2024-10-25 at 10 45 50 PM](https://github.com/user-attachments/assets/f7a475c7-5021-46cc-848f-531d23cd1ac9)
![WhatsApp Image 2024-10-25 at 10 46 22 PM](https://github.com/user-attachments/assets/9ced52bd-a54a-4662-9993-7a3cd21ee4a7)
![WhatsApp Image 2024-10-26 at 10 16 30 AM](https://github.com/user-attachments/assets/07c75120-5b5f-4790-9758-e6e44e5ec2fb)
![WhatsApp Image 2024-10-25 at 10 46 37 PM](https://github.com/user-attachments/assets/84d1bcf3-7bcc-4d2f-8744-5d897aa76fa4)


## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios 
- **Backend:** Node.js, Express.js, MongoDB
- **Data Structure:** Abstract Syntax Tree (AST)

## Features

- Create and manage eligibility rules using an intuitive UI.
- Dynamic combination of rules using AST.
- Evaluate user eligibility based on defined rules.
- Error handling and validation for rule strings and data formats.
- Ability to modify existing rules and support user-defined functions (future enhancement).

## Data Structure
### Node Structure
The AST is represented using the following Node structure:

## javascript

```bash
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // Reference to left child
        this.right = right; // Reference to right child (for operators)
        this.value = value; // Optional value for operand nodes (e.g., number for comparisons)
    }
}
```

## Sample Rules :

- Rule 1:

```bash
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
```
- Rule 2:

```bash
((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
```
## Data Storage
## Database
The application uses MongoDB for storing rules and metadata.

## Schema Example

```bash
{
    "rules": [
        {
            "ruleId": "1",
            "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
            "createdAt": "2023-10-01T12:00:00Z"
        },
        {
            "ruleId": "2",
            "ruleString": "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)",
            "createdAt": "2023-10-02T12:00:00Z"
        }
    ]
}
```

## API Design
Endpoints
### 1. create_rule(rule_string):

- **Description:** Takes a string representing a rule and returns a Node object representing the corresponding AST.
- **Input:** rule_string (String)
- **Output:** Node object

### 2. combine_rules(rules):

- **Description:** Combines a list of rule strings into a single AST, optimizing for efficiency.
- **Input:** rules (Array of Strings)
- **Output:** Root Node object of the combined AST

### 3. evaluate_rule(data):

- **Description:**  Evaluates the combined rule's AST against provided user attributes.
- **Input:** data (JSON Object)
- **Output:**  Boolean (True/False)

## Test Cases
1. Create individual rules using create_rule and verify their AST representation.
2. Combine example rules using combine_rules and ensure the resulting AST reflects the combined logic.
3. Implement sample JSON data and test evaluate_rule for different scenarios.
4. Explore combining additional rules and test the functionality.

## Bonus Features
- Implement error handling for invalid rule strings or data formats.
- Validation for attributes to be part of a catalog.
- Allow modification of existing rules.
- Extend the system to support user-defined functions within the rule language (future work).

### Getting Started
#### Prerequisites

- Node.js
- MongoDB
- React

## Installation
1. Clone the repository:

```bash
git clone <repository-url>
cd rule-engine-ast
```
2. Install backend dependencies:

```bash
npm install
```
3. Install frontend dependencies:

```bash
npm install
```
4. Set up MongoDB and configure connection settings in the backend.
5. Start the backend server:

```bash
npm start
```
6. Start the frontend application:
```bash
npm start
```
### Contributing
Contributions are welcome! Please open an issue or submit a pull request
