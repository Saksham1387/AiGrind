#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/understanding-regularization in linear regression/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  int size_weights;
  std::istringstream(lines[0]) >> size_weights;
  std::vector<float> weights(size_weights);
  if(!size_weights==0) {
  	std::istringstream iss(lines[1]);
  	for (int i=0; i < size_arr; i++) iss >> arr[i];
  }
   float lambda_;
  std::istringstream(lines[1]) >> lambda_;
  float result = compute_regularization(weights, lambda_);
  std::cout << result << std::endl;
  return 0;
}
