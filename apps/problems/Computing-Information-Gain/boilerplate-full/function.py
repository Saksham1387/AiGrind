##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Computing-Information-Gain/Tests/Inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    before_entropy = float(input_list.pop(0))
    size_after_entropies = int(input_list.pop(0))
    after_entropies = [float(x) for x in input_list.pop(0).split()]
    size_proportions = int(input_list.pop(0))
    proportions = [float(x) for x in input_list.pop(0).split()]

    result = calculate_information_gain(before_entropy, after_entropies, proportions)

    print(result)

if __name__ == "__main__":
    main()
    