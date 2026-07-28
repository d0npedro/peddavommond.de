import { el, clear } from '../utils/dom.js';

export function mountTicTacToe(host) {
  let board = Array(9).fill(null);
  let turn = 'X';
  let vsCpu = true;
  let over = false;
  let message = 'Du bist X — los geht\'s!';

  const wrap = el('div', { className: 'game-wrap' });
  const toolbar = el('div', { className: 'game-toolbar' });
  const status = el('div', { className: 'game-status' });
  const boardEl = el('div', { className: 'ttt-board' });

  wrap.append(toolbar, status, boardEl);
  host.append(wrap);

  function paint() {
    clear(toolbar);
    toolbar.append(
      el('button', {
        className: 'btn' + (vsCpu ? ' btn-primary' : ''),
        type: 'button',
        text: 'vs Computer',
        onClick: () => { vsCpu = true; reset(); },
      }),
      el('button', {
        className: 'btn' + (!vsCpu ? ' btn-primary' : ''),
        type: 'button',
        text: '2 Spieler',
        onClick: () => { vsCpu = false; reset(); },
      }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: 'Neu',
        onClick: reset,
      }),
    );

    status.textContent = message;
    clear(boardEl);

    for (let i = 0; i < 9; i++) {
      const cell = el('button', {
        className: 'ttt-cell',
        type: 'button',
        text: board[i] || '',
        disabled: !!board[i] || over,
      });
      cell.onclick = () => play(i);
      boardEl.append(cell);
    }
  }

  function reset() {
    board = Array(9).fill(null);
    turn = 'X';
    over = false;
    message = vsCpu ? 'Du bist X — los geht\'s!' : 'Spieler X ist dran';
    paint();
  }

  function play(i) {
    if (board[i] || over) return;
    board[i] = turn;
    if (checkEnd()) {
      paint();
      return;
    }
    turn = turn === 'X' ? 'O' : 'X';
    message = vsCpu
      ? (turn === 'X' ? 'Du bist dran' : 'Computer denkt…')
      : `Spieler ${turn} ist dran`;
    paint();

    if (vsCpu && turn === 'O' && !over) {
      setTimeout(cpuMove, 350);
    }
  }

  function cpuMove() {
    if (over) return;
    const move = bestMove();
    if (move >= 0) play(move);
  }

  function bestMove() {
    // win / block / center / corner / side
    const lines = wins();
    for (const p of ['O', 'X']) {
      for (const [a, b, c] of lines) {
        const line = [board[a], board[b], board[c]];
        if (line.filter((v) => v === p).length === 2 && line.includes(null)) {
          if (board[a] == null) return a;
          if (board[b] == null) return b;
          if (board[c] == null) return c;
        }
      }
    }
    if (board[4] == null) return 4;
    for (const i of [0, 2, 6, 8, 1, 3, 5, 7]) {
      if (board[i] == null) return i;
    }
    return -1;
  }

  function wins() {
    return [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
  }

  function checkEnd() {
    for (const [a, b, c] of wins()) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        over = true;
        message = board[a] === 'X' ? '🎉 X gewinnt!' : '🎉 O gewinnt!';
        return true;
      }
    }
    if (board.every(Boolean)) {
      over = true;
      message = 'Unentschieden!';
      return true;
    }
    return false;
  }

  reset();
}
