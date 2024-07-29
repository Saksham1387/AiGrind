##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/K-Means-Clustering/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data
    size_data = int(input_list.pop(0))
    data = [[float(x) for x in row.split()] for row in size_data]
    k = float(input_list.pop(0))
    max_iters = int(input_list.pop(0))
    result = k_means_clustering(data,k,max_iters)

    print(result)

if __name__ == "__main__":
    main()
    