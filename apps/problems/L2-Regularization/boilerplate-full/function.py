##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/L2-Regularization/Tests/Inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_weights = int(input_list.pop(0))
    weights = [float(x) for x in input_list.pop(0).split()]
    lambda_ = float(input_list.pop(0))

    result = compute_regularization(weights, lambda_)

    print(result)

if __name__ == "__main__":
    main()
    