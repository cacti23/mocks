// Question 1 — Word Transformation with Recursive State Compression
// Given a dictionary of lowercase words of equal length, a beginWord, and an endWord, find the minimum number of transformations required to convert beginWord → endWord.
// A transformation changes exactly one character, and every intermediate word must exist in the dictionary.
// Additional constraint: You are not allowed to use BFS. Solve using recursion/backtracking + memoization.

// dictionary = ["hot","dot","dog","lot","log","cog"]
// beginWord = "hit"
// endWord   = "cog"

// Output = 5

// Can reach
// hit → hot → dot → dog → cog
const words = ["hot","dot","dog","lot","log","cog"];
const beginWord = 'hit';
const endWord = 'cog';
console.log(solve(words, beginWord, endWord));


// Case cannot reach
// const words1 = ["hot","log","cog"];
// const beginWord = 'hit';
// const endWord = 'cog';
// console.log(solve(words1, beginWord, endWord));

// Non memoized solution
// TC -> P * L^ 2 -> P can be 2 ^ n -> 2 ^ n * L ^ 2
// N => number of words in words array
// L => Length of each word
// SC -> O(N * L) + O(N) + O(L) -> O(N * L)
// Set => O(N * L)
// Recursion depth => O(N)
// New Word => O(L)


// Memoized solution
// TC -> O(N * L ^ 2) (Distinct state calls only)
// SC -> Same as above only memo will be added which is O(N * L)


function solve(words: string[], beginWord: string, endWord: string): number {
    if(words.length === 0) return 0;
    if(beginWord.length !== endWord.length) return 0;
    if(beginWord === endWord) return 0;

    const wordSet = new Set(words);
    if(!wordSet.has(endWord)) return 0;
    const wLen = beginWord.length;

    // dfs(word) -> min number of transformation required to convert word to endWord
    const memo = new Map<string, number>();

    function dfs(word: string): number {
        // base case
        if(endWord === word) {
            return 1;
        }

        if(memo.has(word)) return memo.get(word)!;

        let minTrans = Number.MAX_SAFE_INTEGER;
        for(let i = 0; i < wLen; i++) {
            const origCh = word[i];
            const prefix = word.slice(0, i);
            const suffix = word.slice(i + 1);

            for(let c = 0; c < 26; c++) {
                const newCh = String.fromCharCode(c + 97);

                if(newCh === origCh) continue;

                const newWord = prefix + newCh + suffix;
                if(wordSet.has(newWord)) {
                    wordSet.delete(newWord);
                    minTrans = Math.min(minTrans, 1 + dfs(newWord));
                    wordSet.add(newWord);
                }
            }

        }

        memo.set(word, minTrans);
        return minTrans;
    }

    const  minTrans = dfs(beginWord);
    return minTrans ===  Number.MAX_SAFE_INTEGER ? 0 : minTrans;
}
