```python
import math

def euclidean_distance(point1, point2):
    # Ensure the points have the same number of dimensions
    if len(point1) != len(point2):
        raise ValueError("Points must have the same number of dimensions")

    # Compute the sum of squared differences
    squared_diff_sum = sum((x - y) ** 2 for x, y in zip(point1, point2))
    
    # Compute the square root of the sum
    distance = math.sqrt(squared_diff_sum)
    
    return distance