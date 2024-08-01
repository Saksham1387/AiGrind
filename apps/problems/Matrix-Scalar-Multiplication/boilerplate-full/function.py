##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Matrix-Scalar-Multiplication/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    
    size_vector1 = int(input_data.pop(0))
    vector1 = [[float(x) for x in row.split()] for row in input_data[:-1]]
    scalar = float(input_data[-1])
    
    result = matrix_scalar_multiplication(vector1, scalar)
    
    print(result)

if __name__ == "__main__":
    main()
    