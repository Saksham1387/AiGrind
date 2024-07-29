##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Implementing-K-Nearest-Neighbors-Distance-Calculation/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    size_point1 = int(input_list.pop(0))
    point1 = [float(x) for x in input_list.pop(0).split()]
    size_point2 = int(input_list.pop(0))
    point2 = [float(x) for x in input_list.pop(0).split()]

    result = euclidean_distance(point1, point2)

    print(result)

if __name__ == "__main__":
    main()
    