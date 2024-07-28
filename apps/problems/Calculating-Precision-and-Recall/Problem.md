## Problem Name: "Calculating Precision and Recall"

Implement a function to compute the precision and recall of a binary classifier given the counts of true positives, false positives, true negatives, and false negatives.

Input
tp (int): True positives
fp (int): False positives
tn (int): True negatives
fn (int): False negatives

Output
result (tuple): A tuple containing the precision and recall.

Examples
Example 1
Input:
tp = 50
fp = 10
tn = 30
fn = 10

Output:
(0.833, 0.833)

Example 2
Input:
tp = 70
fp = 20
tn = 50
fn = 10

Output:
(0.778, 0.875)


