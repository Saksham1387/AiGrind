## Understanding Feature Scaling

Implement a function to normalize features using min-max scaling. Given a list of feature vectors, scale each feature to the range [0, 1].

### Input

- **features** (list of list of float): A list of feature vectors, where each feature vector is a list of floats.

### Output

- **result** (list of list of float): The normalized feature vectors.

### Examples

#### Example 1

*Input:*

features = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

*Output:*

[[0.0, 0.0, 0.0], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0]]

#### Example 2

*Input:*

features = [[10, 20], [30, 40], [50, 60]]

*Output:*
[[0.0, 0.0], [0.5, 0.5], [1.0, 1.0]]
