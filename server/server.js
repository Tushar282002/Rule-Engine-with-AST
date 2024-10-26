import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createRule, combineRules, evaluateRule } from './ruleEngine.js';
import Rule from './models/Rule.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ruleEngineDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/rules', async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = createRule(ruleString);
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rules/combine', async (req, res) => {
  try {
    const { rules } = req.body;
    const combinedAst = combineRules(rules);
    res.json(combinedAst);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/rules/evaluate', (req, res) => {
  try {
    const { rule, data } = req.body;
    const result = evaluateRule(rule, data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/rules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Rule.findByIdAndDelete(id);  // Find and delete the rule by ID
    res.status(200).json({ message: 'Rule deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting rule' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});