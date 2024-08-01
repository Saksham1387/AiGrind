##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Computing-SVM-Decision-Function/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    
    # Parse support vectors
    size_support_vectors = int(input_data.pop(0))
    support_vectors = [[float(x) for x in input_data.pop(0).split()] for _ in range(size_support_vectors)]
    
    # Parse labels
    size_labels = int(input_data.pop(0))
    labels = [int(x) for x in input_data.pop(0).split()]
    
    # Parse weights
    size_weights = int(input_data.pop(0))
    weights = [float(x) for x in input_data.pop(0).split()]
    
    # Parse bias
    bias = float(input_data.pop(0))
    
    # Parse input vector
    size_input_vector = int(input_data.pop(0))
    input_vector = [float(x) for x in input_data.pop(0).split()]
    
    # Call the SVM decision function
    result = svm_decision_function(support_vectors, labels, weights, bias, input_vector)

    print(result)

if __name__ == "__main__":
    main()
    