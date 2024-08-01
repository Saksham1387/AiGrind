```python
def calculate_entropy(labels):
    import math

    # Initialize a dictionary to count the frequency of each label
    label_counts = {}
    
    # Count the frequency of each label
    for label in labels:
        if label in label_counts:
            label_counts[label] += 1
        else:
            label_counts[label] = 1
    
    total_labels = len(labels)
    
    # Calculate the probabilities for each class label
    probabilities = [count / total_labels for count in label_counts.values()]
    
    # Calculate the entropy using the formula
    entropy = -sum(p * math.log2(p) for p in probabilities if p > 0)
    
    return entropy