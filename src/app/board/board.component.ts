import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: string[];
  HIsNext: boolean;
  winner: string;
  humanSide: string;
  whomFirst: string;
  whomFirstText: string;
  CpuSide: string;
  gameEnded: string;
  log: number;

  constructor() {
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.humanSide = null;
    this.whomFirst = null;
    this.gameEnded = null;
    this.whomFirstText = null;
    this.HIsNext = true;
    this.CpuSide = null;
    this.log = 0;
  }

  pickSide(side) {
    this.humanSide = side;
    this.CpuSide = side === 'O' ? 'X' : 'O';
  }

  pickFirst(first) {
    this.whomFirst = first;
    switch (this.whomFirst) {
      case 'H': {
        this.whomFirstText = 'Human is first';
        this.HIsNext = true;
        return;
      }
      case 'C': {
        let bestMove = this.findBestMove(this.squares);
        this.squares[bestMove] = this.CpuSide;
        this.HIsNext = true;
        this.whomFirstText = 'CPU is first';
        return;

      }
      case 'R': {
        const f = Math.floor(Math.random() * Math.floor(1));
        switch (f) {
          case 0: {
            this.pickFirst('H');
            return;
          }
          case 1: {
            this.pickFirst('C');
            return;
          }
        }
      }
    }
  }

  get player() {
    return this.HIsNext ? this.humanSide : this.humanSide === 'O' ? 'X' : 'O';
  }

  makeMove(idx: number) {
    console.log(idx);
    let winner = this.evaluate(this.squares);
    if (winner === 0) {
      if (!this.squares[idx] && this.player === this.humanSide) {
        this.squares[idx] = this.player;
        this.HIsNext = !this.HIsNext;

        let bestMove = this.findBestMove(this.squares);
        if (bestMove != null) {
          winner = this.evaluate(this.squares);
          if (winner === 0) {
            this.squares[bestMove] = this.CpuSide;
            winner = this.evaluate(this.squares);
            if (winner === 0) {
              if (!this.isMovesLeft(this.squares)) {
                this.gameEnded = 'its a draw, you\'ll never win';
              } else {
                this.HIsNext = true;
              }
            } else {
              this.gameEnded = winner === 10 ? 'CPU is the Victor' : 'Human is the Victor';
              console.log(this.log);
            }
          } else {
            this.gameEnded = winner === 10 ? 'CPU is the Victor' : 'Human is the Victor';
            console.log(this.log);
          }
        }
      }
    } else {
      this.gameEnded = winner === 10 ? 'CPU is the Victor' : 'Human is the Victor';
      console.log(this.log);

    }

    /*
        this.winner = this.calculateWinner();
    */
  }

  minimax(board: Array<string>, depth: number, isMaximizingPlayer: boolean) {
    this.log++;
    let score: number = this.evaluate(board);
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score === 10) {
      return score - depth;
    }
    if (score === -10) {
      return score + depth;
    }
    if (this.isMovesLeft(board) === false) {
      return 0;
    }
    if (isMaximizingPlayer) {
      let best = -1000;
      let boardClone = board;
      for (let sqr = 0; sqr < boardClone.length; sqr++) {
        if (!boardClone[sqr]) {
          boardClone[sqr] = this.CpuSide;
          best = Math.max(best, this.minimax(boardClone, depth + 1, !isMaximizingPlayer));
          boardClone[sqr] = null;

        }
      }
      return best;
    } else {
      let best = 1000;
      let boardClone = board;
      for (let sqr = 0; sqr < boardClone.length; sqr++) {
        if (!boardClone[sqr]) {
          boardClone[sqr] = this.humanSide;
          best = Math.min(best, this.minimax(boardClone, depth + 1, !isMaximizingPlayer));
          boardClone[sqr] = null;

        }
      }
      return best;
    }
  }

  findBestMove(board: Array<string>) {
    let boardClone = Object.assign([], board);
    let bestVal = -1000;
    let bestMoveIndex = null;
    for (let sqr = 0; sqr < boardClone.length; sqr++) {
      if (!boardClone[sqr]) {
        boardClone[sqr] = this.CpuSide;
        let moveVal = this.minimax(boardClone, 0, false);
        boardClone[sqr] = null;
        if (moveVal > bestVal) {
          bestMoveIndex = sqr;
          bestVal = moveVal;
        }
      }
    }
    return bestMoveIndex;
  }

  isMovesLeft(b: Array<string>) {
    for (let sqr = 0; sqr < b.length; sqr++) {
      if (b[sqr] === null) {
        return true;
      }
    }
    return false;


  }

  evaluate(b: Array<string>) {

    // Checking for Rows for X or O victory.
    if (b[0] === b[1] && b[0] === b[2] && (b[0] !== null)) {

      return b[0] === this.CpuSide ? +10 : -10;
    }
    if (b[3] === b[4] && b[3] === b[5] && (b[3] !== null)) {
      return b[3] === this.CpuSide ? +10 : -10;
    }
    if (b[6] === b[7] && b[6] === b[8] && (b[6] !== null)) {
      return b[6] === this.CpuSide ? +10 : -10;
    }
    // Checking for Columns for X or O victory.
    if (b[0] === b[3] && b[0] === b[6] && (b[0] !== null)) {

      return b[0] === this.CpuSide ? +10 : -10;
    }
    if (b[1] === b[4] && b[1] === b[7] && (b[1] !== null)) {
      return b[1] === this.CpuSide ? +10 : -10;
    }
    if (b[2] === b[5] && b[2] === b[8] && (b[2] !== null)) {
      return b[2] === this.CpuSide ? +10 : -10;
    }
    // Checking for Diagonals for X or O victory.
    if (b[0] === b[4] && b[0] === b[8] && (b[0] !== null)) {
      return b[0] === this.CpuSide ? +10 : -10;
    }
    if (b[2] === b[4] && b[2] === b[6] && (b[2] !== null)) {
      return b[2] === this.CpuSide ? +10 : -10;
    }
    // Else if none of them have won then return 0
    return 0;
  }
}
