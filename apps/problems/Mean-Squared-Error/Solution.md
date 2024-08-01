```python
def mean_squared_error(y_true, y_pred):
    # Verify if both lists are of the same length
    if len(y_true) != len(y_pred):
        raise ValueError("The length of y_true and y_pred must be the same.")
    
    # Calculate the squared differences and the mean squared error
    squared_diffs = [(yt - yp) ** 2 for yt, yp in zip(y_true, y_pred)]
    mse = sum(squared_diffs) / len(y_true)
    
    return mse