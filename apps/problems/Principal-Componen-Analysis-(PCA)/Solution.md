```python
import numpy as np

def mean(values):
    return sum(values) / len(values)

def transpose(matrix):
    return [list(row) for row in zip(*matrix)]

def dot_product(vector1, vector2):
    return sum(x * y for x, y in zip(vector1, vector2))

def matrix_multiply(matrix1, matrix2):
    num_rows_1, num_cols_1 = len(matrix1), len(matrix1[0])
    num_rows_2, num_cols_2 = len(matrix2), len(matrix2[0])
    
    if num_cols_1 != num_rows_2:
        raise ValueError("Matrix dimensions do not match for multiplication.")
    
    result = [[0 for _ in range(num_cols_2)] for _ in range(num_rows_1)]
    for i in range(num_rows_1):
        for j in range(num_cols_2):
            result[i][j] = sum(matrix1[i][k] * matrix2[k][j] for k in range(num_cols_1))
    return result

def covariance_matrix(data):
    n = len(data)
    mean_vec = [mean(column) for column in transpose(data)]
    centered_data = [[data[i][j] - mean_vec[j] for j in range(len(data[0]))] for i in range(n)]
    cov_matrix = matrix_multiply(transpose(centered_data), centered_data)
    return [[cov / (n - 1) for cov in row] for row in cov_matrix]

def eigen_decomposition(matrix):
    # Eigen decomposition using numpy for accuracy
    matrix_np = np.array(matrix)
    eigenvalues, eigenvectors = np.linalg.eig(matrix_np)
    return eigenvalues.tolist(), eigenvectors.T.tolist()

def pca(data, n_components):
    data_mean = [mean(column) for column in transpose(data)]
    centered_data = [[data[i][j] - data_mean[j] for j in range(len(data[0]))] for i in range(len(data))]
    
    cov_matrix = covariance_matrix(centered_data)
    eigenvalues, eigenvectors = eigen_decomposition(cov_matrix)
    
    # Sort eigenvalues and corresponding eigenvectors in descending order
    sorted_indices = sorted(range(len(eigenvalues)), key=lambda i: eigenvalues[i], reverse=True)
    sorted_eigenvectors = [eigenvectors[i] for i in sorted_indices]
    principal_components = [sorted_eigenvectors[i] for i in range(n_components)]
    
    transformed_data = matrix_multiply(centered_data, transpose(principal_components))
    
    return transformed_data