##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Two Sum/tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    num1 = float(input_list.pop(0))
    num2 = float(input_list.pop(0))

    result = sum(num1, num2)

    print(result)

if __name__ == "__main__":
    main()
    