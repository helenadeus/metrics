// Pregnancy test scenario - JavaScript version
// Positive class = "Pregnant" (1)
// Negative class = "Not pregnant" (0)

// 100 people: 40 actually pregnant, 60 not pregnant
// Test accuracy = 95%

// Simulate results:
// 40 pregnant people: 38 correctly identified (TP), 2 missed (FN)
// 60 not pregnant: 57 correctly identified (TN), 3 false positives (FP)

const y_true = [
  ...Array(38).fill(1),  // 38 TP
  ...Array(2).fill(1),   // 2 FN
  ...Array(57).fill(0),  // 57 TN
  ...Array(3).fill(0)    // 3 FP (but predicted as 1)
];

const y_pred = [
  ...Array(38).fill(1),  // 38 TP
  ...Array(2).fill(0),   // 2 FN
  ...Array(57).fill(0),  // 57 TN
  ...Array(3).fill(1)    // 3 FP
];

// Calculate confusion matrix
function confusionMatrix(y_true, y_pred) {
  const cm = [[0, 0], [0, 0]];
  
  for (let i = 0; i < y_true.length; i++) {
    const actual = y_true[i];
    const predicted = y_pred[i];
    cm[actual][predicted]++;
  }
  
  return cm;
}

// Calculate accuracy
function accuracy(y_true, y_pred) {
  let correct = 0;
  for (let i = 0; i < y_true.length; i++) {
    if (y_true[i] === y_pred[i]) correct++;
  }
  return correct / y_true.length;
}

const cm = confusionMatrix(y_true, y_pred);
const acc = accuracy(y_true, y_pred);

console.log("=".repeat(60));
console.log("PREGNANCY TEST ANALYSIS (100 people)");
console.log("=".repeat(60));

console.log(`\nOverall Accuracy: ${(acc * 100).toFixed(1)}%`);
console.log("(Correct predictions out of 100)");

console.log("\nConfusion Matrix:");
console.log("                  Test Negative  Test Positive");
console.log(`Actually Not Preg      ${cm[0][0]}            ${cm[0][1]}`);
console.log(`Actually Pregnant      ${cm[1][0]}            ${cm[1][1]}`);

// Extract values
const true_negative = cm[0][0];
const false_positive = cm[0][1];
const false_negative = cm[1][0];
const true_positive = cm[1][1];

console.log("\n" + "=".repeat(60));
console.log("BREAKDOWN:");
console.log("=".repeat(60));
console.log(`True Positives (TP):   ${true_positive} - Pregnant & test said pregnant ✓`);
console.log(`True Negatives (TN):   ${true_negative} - Not pregnant & test said not pregnant ✓`);
console.log(`False Positives (FP):  ${false_positive} - NOT pregnant but test said pregnant ✗`);
console.log(`False Negatives (FN):  ${false_negative} - Pregnant but test said not pregnant ✗`);

console.log("\n" + "=".repeat(60));
console.log("METRICS:");
console.log("=".repeat(60));

// Compute accuracy, precision and recall directly from counts
var total = true_positive + true_negative + false_positive + false_negative;
var accuracy = (true_positive + true_negative) / total;
var precision = true_positive / (true_positive + false_positive);
var recall = true_positive / (true_positive + false_negative);

console.log(`\nAccuracy: ${(accuracy * 100).toFixed(1)}%  (${true_positive + true_negative}/${total} correct)`);
console.log(`Precision: ${(precision * 100).toFixed(1)}%  (of ${true_positive + false_positive} positive tests, ${true_positive} true positives)`);
console.log(`Recall (Sensitivity): ${(recall * 100).toFixed(1)}%  (of ${true_positive + false_negative} actual positives, ${true_positive} caught)`);

// Also compute specificity and false positive rate for completeness
var specificity = true_negative / (true_negative + false_positive);
var fpr = false_positive / (true_negative + false_positive);
console.log(`Specificity: ${(specificity * 100).toFixed(1)}%`);
console.log(`False Positive Rate: ${(fpr * 100).toFixed(1)}%  (${false_positive} of ${true_negative + false_positive} not pregnant got false positive)`);

// ============================================================
// SCENARIO 2: 1000 people, but only 200 of child-bearing age
// ============================================================

console.log("\n\n" + "=".repeat(60));
console.log("SCENARIO 2: POPULATION-WIDE TEST (1000 people)");
console.log("=".repeat(60));
console.log("Only 200 are of child-bearing age");
console.log("Assuming 95% test accuracy applies to both groups");

// 200 of child-bearing age: 100 pregnant, 100 not
// 95% accuracy: 95 TP, 5 FN, 95 TN, 5 FP
const pregnant_group_true_positive = 95;
const pregnant_group_false_negative = 5;
const pregnant_group_true_negative = 95;
const pregnant_group_false_positive = 5;

// 800 not of child-bearing age: all not pregnant
// 95% accuracy: 760 TN, 40 FP (5% false positive rate)
const not_capable_true_positive = 0;
const not_capable_false_negative = 0;
const not_capable_true_negative = 760;
const not_capable_false_positive = 40;

const pop_true_positive = pregnant_group_true_positive + not_capable_true_positive;
const pop_true_negative = pregnant_group_true_negative + not_capable_true_negative;
const pop_false_positive = pregnant_group_false_positive + not_capable_false_positive;
const pop_false_negative = pregnant_group_false_negative + not_capable_false_negative;

const pop_total = pop_true_positive + pop_true_negative + pop_false_positive + pop_false_negative;
const pop_accuracy = (pop_true_positive + pop_true_negative) / pop_total;

console.log(`\nTotal Tests: ${pop_total}`);
console.log(`TP: ${pop_true_positive}, TN: ${pop_true_negative}, FP: ${pop_false_positive}, FN: ${pop_false_negative}`);
console.log(`\nOverall Accuracy: ${(pop_accuracy * 100).toFixed(1)}%`);
console.log(`  → Even though accuracy is high, we have ${pop_false_positive} false positives!`);

// Precision and Recall
const pop_precision = pop_true_positive / (pop_true_positive + pop_false_positive);
const pop_recall = pop_true_positive / (pop_true_positive + pop_false_negative);

console.log(`\nPrecision: ${(pop_precision * 100).toFixed(1)}%`);
console.log(`  → Of ${pop_true_positive + pop_false_positive} positive tests, only ${pop_true_positive} are actually pregnant`);

console.log(`\nRecall (Sensitivity): ${(pop_recall * 100).toFixed(1)}%`);
console.log(`  → Of ${pop_true_positive + pop_false_negative} actually pregnant, caught ${pop_true_positive}`);

// F1 Score - harmonic mean of precision and recall
const pop_f1_score = 2 * (pop_precision * pop_recall) / (pop_precision + pop_recall);

console.log("\n" + "=".repeat(60));
console.log("F1 SCORE COMPARISON:");
console.log("=".repeat(60));
console.log(`Accuracy:  ${(pop_accuracy * 100).toFixed(1)}%  ← Misleading! Inflated by true negatives`);
console.log(`F1 Score:  ${(pop_f1_score * 100).toFixed(1)}%   ← Better metric for imbalanced data`);
console.log(`\nWhy? F1 balances precision and recall.`);
console.log(`Accuracy ignores the class imbalance (80% of people can't be pregnant).`);
console.log(`F1 focuses on how well we detect positives, regardless of negatives.`);

// ============================================================
// SCENARIO 3: Multi-class classification (3 classes)
// ============================================================

console.log("\n\n" + "=".repeat(60));
console.log("SCENARIO 3: MULTI-CLASS CLASSIFICATION (3 classes)");
console.log("=".repeat(60));
console.log("Classifying animals: Dog (0), Cat (1), Bird (2)");
console.log("100 total animals\n");

// Create 3x3 confusion matrix
// Format: cm[actual][predicted]
const multiclass_cm = [
  [30, 5, 2],   // Actual Dogs: 30 correct, 5 predicted as Cat, 2 as Bird
  [3, 28, 4],   // Actual Cats: 3 predicted as Dog, 28 correct, 4 as Bird
  [2, 6, 15]    // Actual Birds: 2 predicted as Dog, 6 as Cat, 15 correct
];

console.log("Confusion Matrix (3x3):");
console.log("                Predicted Dog  Predicted Cat  Predicted Bird");
console.log(`Actual Dog            ${multiclass_cm[0][0]}            ${multiclass_cm[0][1]}             ${multiclass_cm[0][2]}`);
console.log(`Actual Cat            ${multiclass_cm[1][0]}            ${multiclass_cm[1][1]}             ${multiclass_cm[1][2]}`);
console.log(`Actual Bird           ${multiclass_cm[2][0]}            ${multiclass_cm[2][1]}             ${multiclass_cm[2][2]}`);

// Calculate per-class metrics
const classes = ["Dog", "Cat", "Bird"];
const multiclass_true_positives = [multiclass_cm[0][0], multiclass_cm[1][1], multiclass_cm[2][2]];

// True positives: diagonal elements
console.log(`\n✓ Diagonal (True Positives): ${multiclass_true_positives.join(", ")}`);

// Calculate per-class precision, recall, F1
console.log("\n" + "=".repeat(60));
console.log("PER-CLASS METRICS:");
console.log("=".repeat(60));

const multiclass_metrics = [];

for (let i = 0; i < 3; i++) {
  // True positive for class i
  const tp = multiclass_cm[i][i];
  
  // False positives: all predictions of class i that were wrong
  const false_positive = multiclass_cm[0][i] + multiclass_cm[1][i] + multiclass_cm[2][i] - tp;
  
  // False negatives: all actual class i that were predicted wrong
  const false_negative = multiclass_cm[i][0] + multiclass_cm[i][1] + multiclass_cm[i][2] - tp;
  
  // Precision: of all predictions of class i, how many were correct?
  const precision = tp / (tp + false_positive);
  
  // Recall: of all actual class i, how many did we get right?
  const recall = tp / (tp + false_negative);
  
  // F1 Score
  const f1 = 2 * (precision * recall) / (precision + recall);
  
  multiclass_metrics.push({ class: classes[i], precision, recall, f1, tp, false_positive, false_negative });
  
  console.log(`\n${classes[i].toUpperCase()}:`);
  console.log(`  True Positives:   ${tp}`);
  console.log(`  False Positives:  ${false_positive} (predicted ${classes[i]} but wasn't)`);
  console.log(`  False Negatives:  ${false_negative} (actually ${classes[i]} but missed)`);
  console.log(`  Precision: ${(precision * 100).toFixed(1)}% - of predictions, how many correct?`);
  console.log(`  Recall:    ${(recall * 100).toFixed(1)}% - of actual, how many caught?`);
  console.log(`  F1 Score:  ${(f1 * 100).toFixed(1)}%`);
}

// Overall accuracy (sum of diagonal / total)
const multiclass_total = multiclass_cm.flat().reduce((a, b) => a + b, 0);
const multiclass_correct = multiclass_true_positives.reduce((a, b) => a + b, 0);
const multiclass_accuracy = multiclass_correct / multiclass_total;

console.log("\n" + "=".repeat(60));
console.log("OVERALL METRICS:");
console.log("=".repeat(60));
console.log(`Accuracy: ${(multiclass_accuracy * 100).toFixed(1)}% (${multiclass_correct}/${multiclass_total} correct)`);

// Macro-averaged F1 (average F1 across all classes)
const macro_f1 = multiclass_metrics.reduce((sum, m) => sum + (2 * (m.precision * m.recall) / (m.precision + m.recall)), 0) / 3;
console.log(`Macro-averaged F1: ${(macro_f1 * 100).toFixed(1)}% (simple average of per-class F1)`);

// Weighted F1 (weighted by actual class distribution)
let weighted_f1 = 0;
for (let i = 0; i < 3; i++) {
  const class_count = multiclass_cm[i][0] + multiclass_cm[i][1] + multiclass_cm[i][2];
  const f1 = 2 * (multiclass_metrics[i].precision * multiclass_metrics[i].recall) / (multiclass_metrics[i].precision + multiclass_metrics[i].recall);
  weighted_f1 += (f1 * class_count) / multiclass_total;
}
console.log(`Weighted F1: ${(weighted_f1 * 100).toFixed(1)}% (weighted by class distribution)`);

console.log(`\nNote: The 3x3 matrix lets us see which classes confuse the model.`);
console.log(`For example, ${multiclass_cm[1][0]} Cats were predicted as Dogs.`);
