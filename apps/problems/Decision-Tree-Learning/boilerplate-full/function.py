##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Decision-Tree-Learning/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    
    size_examples = int(input_data.pop(0))
    examples = [eval(x) for x in input_data[:size_examples]]  # Parsing the list of dictionaries
    input_data = input_data[size_examples:]  # Removing parsed examples from input data
    
    size_attributes = int(input_data.pop(0))
    attributes = input_data[:size_attributes]  # List of strings
    target_attr = input_data[size_attributes]  # Single string

    result = decision_tree_learning(examples, attributes, target_attr)

    print(result)

if __name__ == "__main__":
    main()


    
    