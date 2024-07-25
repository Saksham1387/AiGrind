##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/understanding-regularization in linear regression/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_weights = parseInt(input.shift());
const weights = input.splice(0, size_weights).map(Number);
  const lambda_ = parseInt(input.shift());
const result = compute_regularization(weights, lambda_);
console.log(result);
    