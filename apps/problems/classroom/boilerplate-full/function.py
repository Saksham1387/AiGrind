##USER_CODE_HERE##
  
def main():
    input_file_path = '/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt'
    with open(input_file_path, 'r') as file:
        input_data = file.read().strip().split('\n')
    input_list = [int(x) for x in ' '.join(input_data).split()]
      
    size_arr = int(input_list.pop(0))
    arr = [int(x) for x in input_list[:size_arr]]
      
    result = classroom(arr)
      
    print(result)
  
if __name__ == "__main__":
    main()
    