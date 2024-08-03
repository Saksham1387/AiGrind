##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Solving-a-System-of-Linear-Equations/Tests/Inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    # Reading size of the coefficients matrix
    size_coefficients = int(input_list.pop(0))
    # Reading the coefficients matrix
    coefficients = [[float(x) for x in input_list.pop(0).split()] for _ in range(size_coefficients)]
    # Reading size of the constants vector
    size_constants = int(input_list.pop(0))
    # Reading the constants vector
    constants = [float(x) for x in input_list.pop(0).split()]

    result = solve_linear_system(coefficients, constants)

    print(result)

if __name__ == "__main__":
    main()