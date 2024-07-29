##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Logistic-Regression/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_X = int(input_list.pop(0))
    X = [[float(x) for x in row.split()] for row in input_list]
    size_y = int(input_list.pop(0))
    y = [float(x) for x in input_list.pop(0).split()]
    alpha = float(input_list.pop(0))
    num_iters = float(input_list.pop(0))

    result = logistic_regression(X,y, alpha, num_iters)

    print(result)

if __name__ == "__main__":
    main()
    