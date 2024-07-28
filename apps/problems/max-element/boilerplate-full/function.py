##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Max Element/tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_arr = int(input_list.pop(0))
    arr = [float(x) for x in input_list.pop(0).split()]

    result = maxElement(arr)

    print(result)

if __name__ == "__main__":
    main()
    