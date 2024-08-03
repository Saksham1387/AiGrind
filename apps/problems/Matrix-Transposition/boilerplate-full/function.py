##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Matrix-Transposition/Tests/Inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_matrix = int(input_list.pop(0))
    matrix = [[float(x) for x in row.split()] for row in input_list]
    

    result = transpose(matrix)

    print(result)

if __name__ == "__main__":
    main()
    