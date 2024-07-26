##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/understanding-feature scaling/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_features = parseInt(input.shift());
const features = input.splice(0, size_features).map(Number);
const result = min_max_scale(features);
console.log(result);
    