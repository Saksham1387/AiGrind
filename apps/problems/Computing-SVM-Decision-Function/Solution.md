```python
def svm_decision_function(support_vectors, labels, weights, bias, input_vector):
    result = 0.0
    for sv, label, weight in zip(support_vectors, labels, weights):
        # Calculate the dot product of the support vector and input vector
        dot_product = sum(s * i for s, i in zip(sv, input_vector))
        # Accumulate the result: weight * label * dot_product
        result += weight * label * dot_product
    # Add the bias
    result += bias
    return result