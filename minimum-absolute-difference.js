function partitionArray(nums) {
  const n = nums.length / 2; // Length of each array
  const targetSum = Math.floor(nums.reduce((acc, num) => acc + num, 0) / 2); // Target sum for each array

  let minDiff = Infinity;

  function partitionHelper(currIndex, currSum1, currSum2, chosen) {
    if (currIndex === nums.length) {
      if (chosen[0].length === n && chosen[1].length === n) {
        const sumDiff = Math.abs(currSum1 - currSum2);
        minDiff = Math.min(minDiff, sumDiff);
      }
      return;
    }

    // Include the current number in the first array
    if (chosen[0].length < n) {
      chosen[0].push(nums[currIndex]);
      partitionHelper(
        currIndex + 1,
        currSum1 + nums[currIndex],
        currSum2,
        chosen
      );
      chosen[0].pop();
    }

    // Include the current number in the second array
    if (chosen[1].length < n) {
      chosen[1].push(nums[currIndex]);
      partitionHelper(
        currIndex + 1,
        currSum1,
        currSum2 + nums[currIndex],
        chosen
      );
      chosen[1].pop();
    }
  }

  partitionHelper(0, 0, 0, [[], []]); // Start the recursive partitioning process

  return minDiff;
}

module.exports = partitionArray;