## Decision Tree Learning

Implement the decision tree learning algorithm for classification using recursive binary splitting based on entropy and information gain.

### Input

- **examples** (list of dict): A list of examples where each example is a dictionary of attribute-value pairs.
- **attributes** (list of str): A list of attribute names.
- **target_attr** (str): The name of the target attribute.

### Output

- **result** (dict): A nested dictionary representing the decision tree.

### Examples

#### Example 1

*Input:*

examples = [
    {'Outlook': 'Sunny', 'Temperature': 'Hot', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'No'},
    {'Outlook': 'Sunny', 'Temperature': 'Hot', 'Humidity': 'High', 'Wind': 'Strong', 'PlayTennis': 'No'},
    {'Outlook': 'Overcast', 'Temperature': 'Hot', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'Yes'},
    {'Outlook': 'Rain', 'Temperature': 'Mild', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'Yes'}
]
attributes = ['Outlook', 'Temperature', 'Humidity', 'Wind']
target_attr = 'PlayTennis'

*Output:*

{
    'Outlook': {
        'Sunny': {'Humidity': {'High': 'No', 'Normal': 'Yes'}},
        'Overcast': 'Yes',
        'Rain': {'Wind': {'Weak': 'Yes', 'Strong': 'No'}}
    }
}




