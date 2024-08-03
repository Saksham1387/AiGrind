```python
def calculate_information_gain(before_entropy, after_entropies, proportions):
    # Compute the weighted sum of the entropies after the split
    weighted_sum_entropy = sum(p * e for p, e in zip(proportions, after_entropies))
    
    # Calculate the information gain
    information_gain = before_entropy - weighted_sum_entropy
    
    # Return the result rounded to three decimal places
    return round(information_gain, 3)