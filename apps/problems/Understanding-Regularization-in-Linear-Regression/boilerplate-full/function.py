
import sys

##USER_CODE_HERE##
def compute_regularization_term(weights, lambda_):
    """
    Computes the L2 regularization term for linear regression.

    Args:
    weights (list of float): A list of model weights.
    lambda_ (float): The regularization parameter.

    Returns:
    float: The regularization term.
    """
    # Initialize the regularization term
    regularization_term = 0.0
    
    # Compute the sum of squares of weights
    for weight in weights:
        regularization_term += weight ** 2
    
    # Multiply the sum of squares by the regularization parameter
    regularization_term *= lambda_
    
    return regularization_term

def main():
    input = sys.stdin.read().strip().split()
    size_weights = int(input.pop(0))
    weights = [float(x) for x in input[:size_weights]]
    input = input[size_weights:]
    lambda_ = float(input.pop(0))
    result = compute_regularization_term(weights, lambda_)
    print(result)

if __name__ == "__main__":
    main()
  