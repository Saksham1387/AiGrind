##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Gradient-Descent-Update-Rule/Tests/Inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    weight = float(input_list.pop(0))
    size_gradients = int(input_list.pop(0))
    gradients = [float(x) for x in input_list.pop(0).split()]
    alpha = float(input_list.pop(0))

    result = gradient_descent_update(weight, gradients, alpha)

    print(result)

if __name__ == "__main__":
    main()
    