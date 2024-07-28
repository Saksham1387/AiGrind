##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Matrix-Multiplication/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    
    # Read size of the first matrix and then the first matrix
    size_matrix1 = int(input_data.pop(0))
    matrix1 = []
    for _ in range(size_matrix1):
        matrix1.append([float(x) for x in input_data.pop(0).split()])
    
    # Read size of the second matrix and then the second matrix
    size_matrix2 = int(input_data.pop(0))
    matrix2 = []
    for _ in range(size_matrix2):
        matrix2.append([float(x) for x in input_data.pop(0).split()])

    try:
        result = matrix_multiply(matrix1, matrix2)
        print(result)
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()