```python
def matrix_multiply(matrix1, matrix2):
    # Number of rows and columns in the input matrices
    rows_matrix1 = len(matrix1)
    cols_matrix1 = len(matrix1[0])
    rows_matrix2 = len(matrix2)
    cols_matrix2 = len(matrix2[0])
    
    # Verify if multiplication is possible
    if cols_matrix1 != rows_matrix2:
        raise ValueError("Number of columns in matrix1 must be equal to number of rows in matrix2")
    
    # Initialize the result matrix with zeros
    result = [[0 for _ in range(cols_matrix2)] for _ in range(rows_matrix1)]
    
    # Perform matrix multiplication
    for i in range(rows_matrix1):
        for j in range(cols_matrix2):
            for k in range(cols_matrix1):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    
    return result