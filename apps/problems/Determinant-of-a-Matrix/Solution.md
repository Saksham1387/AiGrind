```python
def determinant(matrix):
    # Base case: if the matrix is 2x2, calculate the determinant directly
    if len(matrix) == 2 and len(matrix[0]) == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    
    # Recursive case: calculate the determinant using cofactor expansion
    det = 0
    for c in range(len(matrix)):
        det += ((-1) ** c) * matrix[0][c] * determinant([row[:c] + row[c+1:] for row in matrix[1:]])
    return det