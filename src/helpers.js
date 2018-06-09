export const getInitialState = (numRows, numCols) => {
  const inner = new Array(numCols).fill(0);
  const outer = new Array(numRows).fill(inner);
  
  return outer;
}

export const resetState = cellArray => cellArray.map(row => row.map(cell => 0));

export const getRandomState = cellArray => cellArray.map(row => row.map(cell => Math.floor(Math.random() * 2)));

export const getPatternState = (cellArray, liveCells) => {
  const newArray = resetState(cellArray);

  for (let i=0; i<liveCells.length; i++) {
    const [y, x] = liveCells[i];
    newArray[y][x] = 1;
  }

  return newArray;
}

export const toggleCell = (cellArray, cell) => {
  const newArray = [...cellArray];
  const [y, x] = cell;
  newArray[y][x] = (newArray[y][x] + 1) % 2;
  return newArray;
}

export const getNumNeighbors = (cell, cellArray) => {
  const [y, x] = cell;

  let total = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const val = cellArray[y+i] && cellArray[y+i][x+j];
      total += val || 0;
    }
  }

  return total - cellArray[y][x];
}

export const getNextState = cellArray => {
  const newCellArray = cellArray
    .map((row, i) => row.map((cell, j) => {
      const neighbors = getNumNeighbors([i, j], cellArray);
      let newCell = cell;
      if (cell) {
        newCell = 
          neighbors >= 4 || neighbors <= 1 ?
          0 : 1;
      } else {
        newCell = 
          neighbors === 3 ?
          1 : 0;
      }
      return newCell;
    }));
   
  return newCellArray;
}
