def maxMoves(grid):
    m, n = len(grid), len(grid[0])

    # Initialize a memoization table to store the maximum moves from each cell
    memo = [[-1] * n for _ in range(m)]

    def dfs(row, col):
        if memo[row][col] != -1:
            return memo[row][col]

        max_moves = 0
        # Check possible moves to the next column
        for i in [-1, 0, 1]:
            new_row = row + i
            if 0 <= new_row < m:
                max_moves = max(max_moves, dfs(new_row, col + 1))

        # The maximum moves from the current cell is one plus the maximum moves in the next column
        memo[row][col] = max_moves + 1
        return memo[row][col]

    # Iterate through each cell in the first column and find the maximum moves
    result = 0
    for i in range(m):
        result = max(result, dfs(i, 0))

    return result

# Example usage:
grid = [[2, 4, 3, 5], [5, 4, 9, 3], [3, 4, 2, 11], [10, 9, 13, 15]]
output = maxMoves(grid)
print(output)  # Output: 3
