## Logistic Regression

Implement the logistic regression algorithm using gradient descent for binary classification.

### Input

- **X** (list of list of float): A list of data points, where each data point is a list of coordinates.
- **y** (list of int): A list of labels corresponding to the data points.
- **alpha** (float): The learning rate.
- **num_iters** (int): The number of iterations for gradient descent.

### Output

- **result** (list of float): The weights of the logistic regression model.

### Examples

#### Example 1

*Input:*

X = [[1, 2], [2, 3], [3, 3], [2, 1], [3, 2]]
y = [1, 1, 0, 0, 0]
alpha = 0.01
num_iters = 1000

*Output:*
[0.0, 0.0]


#### Example 2

*Input:*

X = [[1, 2], [2, 3], [3, 3], [2, 1], [3, 2]]
y = [0, 1, 0, 1, 1]
alpha = 0.01
num_iters = 1000

*Output:*
[0.0, 0.0]


