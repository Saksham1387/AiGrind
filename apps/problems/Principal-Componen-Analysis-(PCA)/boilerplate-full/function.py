##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Principal-Component-Analysis-(PCA)/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_data = int(input_list.pop(0))
    data = [[float(x) for x in row.split()] for row in input_list]
    n_components = float(input_list.pop(0))

    result = pca(n_components,data)

    print(result)

if __name__ == "__main__":
    main()
    