# Metrics Scripts

A collection of JavaScript scripts for calculating and analyzing machine learning metrics. Each script demonstrates practical scenarios for understanding model performance.

## Scripts

### `accuracy.js`
Comprehensive guide to classification metrics with three real-world scenarios:

- **Scenario 1: Binary Classification (Pregnancy Test)**
  - 100 person sample with 95% test accuracy
  - Demonstrates true positives, true negatives, false positives, and false negatives
  - Calculates accuracy, precision, recall, specificity, and false positive rate

- **Scenario 2: Population-Wide Binary Classification**
  - 1000 person sample with class imbalance (only 200 of child-bearing age)
  - Shows why accuracy can be misleading with imbalanced datasets
  - Compares accuracy vs F1 score

- **Scenario 3: Multi-class Classification**
  - 3-class animal classification (Dog, Cat, Bird)
  - Demonstrates confusion matrix interpretation
  - Calculates per-class metrics (precision, recall, F1)
  - Shows macro-averaged and weighted F1 scores

#### Key Metrics Explained
- **Accuracy**: Overall correctness (can be misleading with class imbalance)
- **Precision**: Of positive predictions, how many were correct?
- **Recall (Sensitivity)**: Of actual positives, how many did we catch?
- **Specificity**: Of actual negatives, how many did we identify correctly?
- **F1 Score**: Harmonic mean of precision and recall (better for imbalanced data)
- **False Positive Rate**: Of actual negatives, how many were incorrectly classified?

#### Run
```bash
node accuracy.js
```

## Notes

- All scripts use vanilla JavaScript with no external dependencies
- Output is formatted for terminal readability
- Scripts demonstrate both mathematical formulas and practical examples
