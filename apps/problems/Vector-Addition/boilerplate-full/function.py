##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Vector-Addition/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_vector1 = int(input_list.pop(0))
    vector1 = [float(x) for x in input_list.pop(0).split()]
    size_vector2 = int(input_list.pop(0))
    vector2 = [float(x) for x in input_list.pop(0).split()]

    result = vector_addition(vector1, vector2)

    print(result)

if __name__ == "__main__":
    main()
    