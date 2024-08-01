```python
def gradient_descent_update(weight, gradients, alpha):
    for gradient in gradients:
        weight = weight - alpha * gradient
    return weight