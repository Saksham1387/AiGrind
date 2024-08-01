## Computing Information Gain

Implement a function to calculate the information gain of a split in a dataset. Given the entropy before and after a split, compute the information gain.

Input
before_entropy (float): The entropy before the split.
after_entropies (list of float): A list of entropies after the split.
proportions (list of float): The proportions of each subset after the split.

Output
result (float): The information gain from the split.

Examples
Example 1
Input:
before_entropy = 0.971
after_entropies = [0.918, 0.985]
proportions = [0.4, 0.6]

Output:
0.069

Example 2
Input:
before_entropy = 1.0
after_entropies = [0.0, 1.0]
proportions = [0.5, 0.5]

Output:
0.5
