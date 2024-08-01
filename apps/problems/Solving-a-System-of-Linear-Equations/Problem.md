## Solving a System of Linear Equations

Implement a function to solve a system of linear equations using Gaussian elimination. The function should take a coefficient matrix and a constant vector as input and return the solution vector.

### Input

- **coefficients** (list of list of float): The coefficient matrix.
- **constants** (list of float): The constant vector.

### Output

- **result** (list of float): The solution vector.

### Examples

#### Example 1

*Input:*
coefficients = [[2, 1], [1, 3]]
constants = [5, 6]

*Output:*

[1.0, 2.0]

#### Example 2

*Input:*

coefficients = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
constants = [6, 15, 24]

*Output:*
[0.0, 0.0, 0.0]
