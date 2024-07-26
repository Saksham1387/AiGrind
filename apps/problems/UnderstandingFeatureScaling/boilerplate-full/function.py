##USER_CODE_HERE##
  
def main():
    input_file_path = '/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = [int(x) for x in ' '.join(input_data).split()]
      
    size_features = int(input_list.pop(0))
    features = [int(x) for x in input_list[:size_features]]
      
    result = min_max_scale(features)
      
    print(result)
  
if __name__ == "__main__":
    main()
    