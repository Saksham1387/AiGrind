```python
def dot_product(vector1, vector2):
    if len(vector1) != len(vector2):
        raise ValueError("Vectors must be of the same length")
    
    return sum(a * b for a, b in zip(vector1, vector2))