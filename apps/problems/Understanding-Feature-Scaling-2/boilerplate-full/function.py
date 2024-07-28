##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Understanding-Feature-Scaling-2/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_features = int(input_list.pop(0))
    features = [[float(x) for x in row.split()] for row in input_list]
    result = min_max_scale(features)

    print(result)

if __name__ == "__main__":
    main()
    