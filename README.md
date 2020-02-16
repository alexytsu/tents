## Puzzle Constraints

Within each row and column, the number of tents must match the specified amount. 

No two tents can be adjacent (8-adjacency) and tents cannot exist where trees are. 

## Method

A simple constraint satisfaction algorithm is used. At each timestep, the most optimal solution for the next step is greedily chosen. The algorithm cannot choose states it has already seen (they are serialised and cached) and therefore always makes progress even if it means a 'regression' in the completedeness heuristic. 
