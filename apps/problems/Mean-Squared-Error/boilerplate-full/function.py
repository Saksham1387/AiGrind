##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Mean-Squared-Error/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_y_true = int(input_list.pop(0))
    y_true = [float(x) for x in input_list.pop(0).split()]
    size_y_pred = int(input_list.pop(0))
    y_pred = [float(x) for x in input_list.pop(0).split()]

    result = mean_squared_error(y_true, y_pred)

    print(result)

if __name__ == "__main__":
    main()
    