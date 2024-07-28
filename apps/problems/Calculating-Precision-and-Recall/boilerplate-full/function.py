##USER_CODE_HERE##

def main():
    input_file_path = '/dev/problems/Calculating-Precision-and-Recall/Tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = input_data

    tp = float(input_list.pop(0))
    fp = float(input_list.pop(0))
    tn = float(input_list.pop(0))
    fn = float(input_list.pop(0))

    result = calculate_precision_recall(tp, fp, tn, fn)

    print(result)

if __name__ == "__main__":
    main()
    