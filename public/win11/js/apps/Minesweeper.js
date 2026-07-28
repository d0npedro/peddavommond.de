import { el, clear } from '../utils/dom.js';

const DIFFS = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 24 },
  hard: { rows: 16, cols: 16, mines: 40 },
};

export function mountMinesweeper(host) {
  let diff = 'easy';
  let board = [];
  let revealed = [];
  let flagged = [];
  let dead = false;
  let won = false;
  let firstClick = true;
  let seconds = 0;
  let timerId = null;

  const wrap = el('div', { className: 'game-wrap' });
  const toolbar = el('div', { className: 'game-toolbar' });
  const status = el('div', { className: 'game-status' });
  const boardEl = el('div');

  wrap.append(toolbar, status, boardEl);
  host.append(wrap);

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    seconds = 0;
    timerId = setInterval(() => {
      if (dead || won) {
        stopTimer();
        return;
      }
      seconds++;
      paintChrome();
    }, 1000);
  }

  function init() {
    stopTimer();
    const { rows, cols, mines } = DIFFS[diff];
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    revealed = Array.from({ length: rows }, () => Array(cols).fill(false));
    flagged = Array.from({ length: rows }, () => Array(cols).fill(false));
    dead = false;
    won = false;
    firstClick = true;
    seconds = 0;
    paintChrome();
    paintBoard();
  }

  function placeMines(safeR, safeC) {
    const { rows, cols, mines } = DIFFS[diff];
    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (board[r][c] === -1) continue;
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
      board[r][c] = -1;
      placed++;
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === -1) continue;
        board[r][c] = countAdj(r, c);
      }
    }
  }

  function countAdj(r, c) {
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const rr = r + dr, cc = c + dc;
        if (board[rr]?.[cc] === -1) n++;
      }
    }
    return n;
  }

  function paintChrome() {
    clear(toolbar);
    for (const [k, label] of [['easy', 'Leicht'], ['medium', 'Mittel'], ['hard', 'Schwer']]) {
      toolbar.append(el('button', {
        className: 'btn' + (diff === k ? ' btn-primary' : ''),
        type: 'button',
        text: label,
        onClick: () => { diff = k; init(); },
      }));
    }
    toolbar.append(el('button', {
      className: 'btn',
      type: 'button',
      text: 'Neu',
      onClick: init,
    }));
    const { mines } = DIFFS[diff];
    const flags = flagged.flat().filter(Boolean).length;
    const time = String(seconds).padStart(3, '0');
    status.textContent = dead
      ? `💥 Verloren!  ⏱ ${time}s`
      : won
        ? `🎉 Gewonnen!  ⏱ ${time}s`
        : `🚩 ${mines - flags}   ⏱ ${time}`;
  }

  function paintBoard() {
    clear(boardEl);
    const { rows, cols } = DIFFS[diff];
    const grid = el('div', {
      className: 'ms-board',
      style: { gridTemplateColumns: `repeat(${cols}, 28px)` },
    });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = el('button', {
          className: 'ms-cell',
          type: 'button',
        });
        if (revealed[r][c]) {
          cell.classList.add('revealed');
          if (board[r][c] === -1) {
            cell.classList.add('mine');
            cell.textContent = '💣';
          } else if (board[r][c] > 0) {
            cell.classList.add('n' + board[r][c]);
            cell.textContent = String(board[r][c]);
          }
        } else if (flagged[r][c]) {
          cell.classList.add('flag');
          cell.textContent = '🚩';
        }

        cell.oncontextmenu = (e) => {
          e.preventDefault();
          if (dead || won || revealed[r][c]) return;
          flagged[r][c] = !flagged[r][c];
          paintChrome();
          paintBoard();
        };

        cell.onclick = () => {
          if (dead || won || flagged[r][c]) return;
          if (firstClick) {
            placeMines(r, c);
            firstClick = false;
            startTimer();
          }
          reveal(r, c);
          checkWin();
          if (dead || won) stopTimer();
          paintChrome();
          paintBoard();
        };

        grid.append(cell);
      }
    }
    boardEl.append(grid);
  }

  function reveal(r, c) {
    const { rows, cols } = DIFFS[diff];
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === -1) {
      dead = true;
      // reveal all mines
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (board[i][j] === -1) revealed[i][j] = true;
        }
      }
      return;
    }
    if (board[r][c] === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr || dc) reveal(r + dr, c + dc);
        }
      }
    }
  }

  function checkWin() {
    const { rows, cols, mines } = DIFFS[diff];
    let hidden = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!revealed[r][c]) hidden++;
      }
    }
    if (hidden === mines) won = true;
  }

  init();
}
