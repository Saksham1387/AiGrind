## Principal Component Analysis (PCA)

Implement the Principal Component Analysis (PCA) algorithm for dimensionality reduction.

### Input

- **data** (list of list of float): A list of data points, where each data point is a list of coordinates.
- **n_components** (int): The number of principal components to retain.

### Output

- **result** (list of list of float): The transformed data points in the reduced dimensional space.

### Examples

#### Example 1

*Input:*
data = [[2.5, 2.4], [0.5, 0.7], [2.2, 2.9], [1.9, 2.2], [3.1, 3.0], [2.3, 2.7], [2, 1.6], [1, 1.1], [1.5, 1.6], [1.1, 0.9]]
n_components = 1

*Output:*

[[0.827970186, -0.175115307], [1.77758033, 0.142857227], [0.992197494, 0.384374989], [0.274210416, 0.130417207], [1.67580142, -0.209498461], [0.912949103, 0.175282444], [0.099109437, -0.349824698], [1.14457216, -0.046417258], [0.438046137, 0.017764629], [1.22382056, -0.162675287]]

#### Example 2

*Input:*

data = [[4.0, 2.0], [2.0, 4.0], [3.0, 6.0], [6.0, 4.0], [8.0, 3.0]]
n_components = 2

*Output:*
[[0.316227766, 1.264911064], [1.264911064, -0.316227766], [2.21131347, 0.948683298], [3.16227766, 1.264911064], [4.0, 1.0]]


