## Support Vector Machine (SVM)

Implement a Support Vector Machine (SVM) using the sequential minimal optimization (SMO) algorithm.

### Input

- **X** (list of list of float): A list of data points, where each data point is a list of coordinates.
- **y** (list of int): A list of labels corresponding to the data points.
- **C** (float): The regularization parameter.
- **tol** (float): The tolerance for the stopping criterion.
- **max_passes** (int): The maximum number of passes over the data without changing alpha values.

### Output

- **result** (tuple of list of float and float): The weights of the hyperplane and the bias term.

### Examples

#### Example 1

*Input:*

X = [[1, 2], [2, 3], [3, 3], [2, 1], [3, 2]]
y = [1, 1, 1, -1, -1]
C = 1.0
tol = 0.001
max_passes = 5

*Output:*
([0.5, 0.5], 0.0)

#### Example 2

*Input:*

X = [[1, 2], [2, 3], [3, 3], [2, 1], [3, 2]]
y = [1, 1, -1, -1, -1]
C = 1.0
tol = 0.001
max_passes = 5

*Output:*
([0.5, 0.5], -0.5)
