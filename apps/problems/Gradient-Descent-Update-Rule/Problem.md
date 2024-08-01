## Gradient Descent Update Rule

Implement the gradient descent update rule for a single variable linear regression model. Given a list of gradients, compute the updated weight using the gradient descent formula.

### Input

- **weight** (float): The current weight of the model.
- **gradients** (list of float): A list of gradients computed for each iteration.
- **alpha** (float): The learning rate.

### Output

- **result** (float): The updated weight after applying the gradient descent update.
### Examples

#### Example 1

*Input:*
```
weight = 0.5
gradients = [0.2, 0.3, 0.4]
alpha = 0.01
```
*Output:*
```
0.491
```
#### Example 2

*Input:*
```
weight = 1.0
gradients = [0.1, -0.2, 0.3]
alpha = 0.1
```
*Output:*
```
0.98
```
