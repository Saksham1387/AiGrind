##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Computing-SVM-Decision-Function/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_labels = int(input_list.pop(0))
    labels = [[float(x) for x in row.split()] for row in size_labels]
    size_weights = int(input_list.pop(0))
    weights = [float(x) for x in input_list.pop(0).split()]
    bias = float(input_list.pop(0))
    size_input_vector = int(input_list.pop(0))
    input_vector = [float(x) for x in input_list.pop(0).split()]

    result = svm_decision_function(labels, weights, bias, input_vector)

    print(result)

if __name__ == "__main__":
    main()
    