```python
def compute_regularization(weights:, lambda_):
    # Compute the L2 regularization term
    regularization_term = lambda_ * sum(w ** 2 for w in weights)
    return regularization_term