// Question 2 — Partition an Array into Minimum Valid Segments

// Given an integer array nums of size N, partition it into the minimum number of contiguous segments such that every segment satisfies:
// max(segment) - min(segment) <= K

// Return the minimum number of segments.

// nums = [1, 3, 2, 7, 6, 4]
// K = 2

// Optimal partition:

// [1,3,2] | [7,6,4]

// Output = 2
// But there may be many possible partitions

// Ideal case
const nums = [1, 3, 2, 7, 6, 4];
const k = 2;

// another case possible
const nums1 = [11, 19];
const k1 = 2;

//
const nums2 = [19, 11];
const k2 = 2;


console.log(solve(nums, k));
console.log(solve(nums1, k1));
console.log(solve(nums2, k2));

// NON memoized solution
// TC -> O(2 ^ n * n ^ 2)
// SC -> O(n) + O(n) -> O(n)

// Memoized
// TC -> O(n * n ^ 2);
// SC -> O(n) + O(n) + O(n) -> O(n)

// One optimization is remove seg and calc min max with memo
// TC -> O(n * n);
// SC -> O(n) + O(n) + O(n) -> O(n)

function solve(nums: number[], k: number): number {
  const n = nums.length;
  if(k < 0) return 0;
  if(nums.length === 0) return 0;
  if(nums.length === 1) return 1;

  const memo: (number| null) [] = Array(n).fill(null);
  // dfs(start) -> returns min partition
  function dfs(start: number): number {
    // base case
    if(start === n) return 0;

    if(memo[start] !== null) return memo[start];

    let minPartitions = Number.MAX_SAFE_INTEGER;
    let currMax = Number.MIN_SAFE_INTEGER;
    let currMin = Number.MAX_SAFE_INTEGER;
    for(let end = start; end < n; end++) {
      // const seg: number[] = nums.slice(start, end);
      currMax = Math.max(currMax, nums[end]);
      currMin = Math.min(currMin, nums[end]);

      // const currMax = Math.max(...seg);
      // const currMin = Math.min(...seg);

      if(currMax - currMin <= k) {
          minPartitions = Math.min(minPartitions, 1 + dfs(end + 1));
      }
    }

    memo[start] = minPartitions;
    return minPartitions;
  }

  return dfs(0);
}
