## K-Means Clustering

Implement the K-Means clustering algorithm.

### Input

- **data** (list of list of float): A list of data points, where each data point is a list of coordinates.
- **k** (int): The number of clusters.
- **max_iters** (int): The maximum number of iterations.

### Output

- **result** (list of int): A list of cluster assignments for each data point.

### Examples

#### Example 1

*Input:*

data = [[1.0, 2.0], [1.5, 1.8], [5.0, 8.0], [8.0, 8.0], [1.0, 0.6], [9.0, 11.0]]
k = 2
max_iters = 100

*Output:*
[0, 0, 1, 1, 0, 1]

#### Example 2

*Input:*

data = [[1.0, 2.0], [1.5, 1.8], [5.0, 8.0], [8.0, 8.0], [1.0, 0.6], [9.0, 11.0], [8.5, 8.5]]
k = 3
max_iters = 100

*Output:*

[0, 0, 1, 2, 0, 2, 2]

