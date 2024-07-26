#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

##USER_CODE_HERE##

int main() {
  std::ifstream file("/dev/problems/understanding-feature scaling/tests/inputs/##INPUT_FILE_INDEX##.txt");
  std::vector<std::string> lines;
  std::string line;
  while (std::getline(file, line)) lines.push_back(line);

  file.close();
  int size_features;
  std::istringstream(lines[0]) >> size_features;
  std::vector<float> features(size_features);
  if(!size_features==0) {
  	std::istringstream iss(lines[1]);
  	for (int i=0; i < size_arr; i++) iss >> arr[i];
  }
  list<float> result = min_max_scale(features);
  std::cout << result << std::endl;
  return 0;
}
