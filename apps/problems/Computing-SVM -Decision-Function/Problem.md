## Problem Name: "Computing SVM Decision Function"

Implement a function to compute the decision function value for a given input using a linear SVM model. Given the support vectors, their corresponding labels, and the input, compute the decision function value.

Input
support_vectors (list of list of float): A list of support vectors.
labels (list of int): The labels for each support vector.
weights (list of float): The weights of the SVM.
bias (float): The bias term of the SVM.
input_vector (list of float): The input vector for which to compute the decision function.

Output
result (float): The decision function value.
Examples
Example 1
Input:
support_vectors = [[1.0, 2.0], [2.0, 3.0]]
labels = [1, -1]
weights = [0.5, -0.5]
bias = -1.0
input_vector = [1.5, 2.5]

Output:
7.5

Example 2
Input:
support_vectors = [[1.0, 1.0], [2.0, 2.0]]
labels = [1, -1]
weights = [1.0, -1.0]
bias = 0.0
input_vector = [1.5, 1.5]

Output:
9.0
