##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Solving-a-System-of-Linear-Equations/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_coefficients = int(input_list.pop(0))
    coefficients = [[float(x) for x in row.split()] for row in input_list]
    size_constants = int(input_list.pop(0))
    constants = [float(x) for x in input_list.pop(0).split()]

    result = solve_linear_system(constants,coefficients)

    print(result)

if __name__ == "__main__":
    main()
    