import { el, clear } from '../utils/dom.js';

const SUITS = [
  { s: '♠', color: 'black' },
  { s: '♥', color: 'red' },
  { s: '♦', color: 'red' },
  { s: '♣', color: 'black' },
];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function makeDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (let i = 0; i < RANKS.length; i++) {
      deck.push({
        id: suit.s + RANKS[i] + Math.random().toString(36).slice(2, 5),
        suit: suit.s,
        color: suit.color,
        rank: RANKS[i],
        value: i + 1,
        faceUp: false,
      });
    }
  }
  return shuffle(deck);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function mountSolitaire(host) {
  let stock = [];
  let waste = [];
  let foundations = [[], [], [], []];
  let tableau = [[], [], [], [], [], [], []];
  let selected = null;
  let lastOrigin = null;
  let message = 'Klondike Solitaire';
  let moves = 0;

  const wrap = el('div', { className: 'game-wrap solitaire-bg' });
  const toolbar = el('div', { className: 'game-toolbar' });
  const status = el('div', { className: 'game-status' });
  const board = el('div', { className: 'solitaire' });

  wrap.append(toolbar, status, board);
  host.append(wrap);

  function deal() {
    const deck = makeDeck();
    stock = [];
    waste = [];
    foundations = [[], [], [], []];
    tableau = [[], [], [], [], [], [], []];
    selected = null;
    lastOrigin = null;
    moves = 0;
    message = 'Neues Spiel';

    for (let col = 0; col < 7; col++) {
      for (let n = 0; n <= col; n++) {
        const card = deck.pop();
        card.faceUp = n === col;
        tableau[col].push(card);
      }
    }
    stock = deck;
    paint();
  }

  function paint() {
    clear(toolbar);
    toolbar.append(
      el('button', { className: 'btn', type: 'button', text: 'Neues Spiel', onClick: deal }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: 'Auswahl aufheben',
        onClick: () => { selected = null; paint(); },
      }),
    );
    status.textContent = `${won() ? '🎉 Gewonnen! ' : ''}${message} · Züge: ${moves}`;

    clear(board);
    const top = el('div', { className: 'sol-top' });

    const sw = el('div', { className: 'sol-stock-waste' });
    if (stock.length) {
      sw.append(el('div', {
        className: 'sol-card face-down',
        style: { cursor: 'pointer' },
        title: 'Nachziehen',
        onClick: drawStock,
      }));
    } else {
      sw.append(el('div', {
        className: 'sol-slot sol-empty',
        style: { cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '24px' },
        text: waste.length ? '↻' : '',
        title: 'Talon neu mischen',
        onClick: drawStock,
      }));
    }

    if (waste.length) {
      sw.append(cardEl(waste[waste.length - 1], {
        isSelected: selected?.where === 'waste',
        onClick: selectWaste,
      }));
    } else {
      sw.append(el('div', { className: 'sol-slot sol-empty' }));
    }

    const foundationsEl = el('div', { className: 'sol-foundations' });
    foundations.forEach((pile, i) => {
      if (pile.length) {
        foundationsEl.append(cardEl(pile[pile.length - 1], {
          isSelected: selected?.where === 'foundation' && selected.col === i,
          onClick: () => onFoundation(i),
        }));
      } else {
        foundationsEl.append(el('div', {
          className: 'sol-slot sol-empty',
          style: { cursor: 'pointer' },
          onClick: () => onFoundation(i),
        }));
      }
    });

    top.append(sw, foundationsEl);
    board.append(top);

    const tab = el('div', { className: 'sol-tableau' });
    tableau.forEach((col, ci) => {
      const colEl = el('div', { className: 'sol-col' });
      if (!col.length) {
        colEl.append(el('div', {
          className: 'sol-slot sol-empty',
          style: { cursor: 'pointer' },
          onClick: () => onTableauEmpty(ci),
        }));
      } else {
        col.forEach((card, idx) => {
          colEl.append(cardEl(card, {
            isSelected: selected?.where === 'tableau' && selected.col === ci && selected.index === idx,
            onClick: () => onTableau(ci, idx),
          }));
        });
      }
      tab.append(colEl);
    });
    board.append(tab);
  }

  function cardEl(card, { isSelected, onClick }) {
    if (!card.faceUp) {
      return el('div', { className: 'sol-card face-down', onClick });
    }
    return el('div', {
      className: `sol-card ${card.color}` + (isSelected ? ' selected' : ''),
      onClick,
    },
      el('div', { text: `${card.rank}${card.suit}` }),
      el('div', { style: { textAlign: 'right', fontSize: '18px' }, text: card.suit })
    );
  }

  function drawStock() {
    selected = null;
    if (stock.length) {
      const c = stock.pop();
      c.faceUp = true;
      waste.push(c);
      moves++;
    } else if (waste.length) {
      stock = waste.reverse().map((c) => ({ ...c, faceUp: false }));
      waste = [];
      moves++;
    }
    paint();
  }

  function selectWaste() {
    if (!waste.length) return;
    selected = selected?.where === 'waste' ? null : { where: 'waste' };
    paint();
  }

  function onTableau(col, idx) {
    const card = tableau[col][idx];
    if (!card.faceUp) return;

    if (!selected) {
      selected = { where: 'tableau', col, index: idx };
      paint();
      return;
    }

    if (selected.where === 'tableau' && selected.col === col) {
      selected = { where: 'tableau', col, index: idx };
      paint();
      return;
    }

    moveToTableau(col);
  }

  function onTableauEmpty(col) {
    if (!selected) return;
    moveToTableau(col);
  }

  function takeSelected() {
    if (!selected) return null;
    lastOrigin = { ...selected };
    if (selected.where === 'waste') {
      return waste.length ? [waste.pop()] : null;
    }
    if (selected.where === 'foundation') {
      const pile = foundations[selected.col];
      return pile.length ? [pile.pop()] : null;
    }
    if (selected.where === 'tableau') {
      return tableau[selected.col].splice(selected.index);
    }
    return null;
  }

  function putBack(cards) {
    if (!lastOrigin || !cards?.length) return;
    if (lastOrigin.where === 'waste') waste.push(...cards);
    else if (lastOrigin.where === 'foundation') foundations[lastOrigin.col].push(...cards);
    else if (lastOrigin.where === 'tableau') tableau[lastOrigin.col].push(...cards);
  }

  function moveToTableau(targetCol) {
    const moving = takeSelected();
    if (!moving?.length) return;

    const dest = tableau[targetCol];
    const top = dest[dest.length - 1];
    const head = moving[0];

    const ok = dest.length === 0
      ? head.value === 13
      : top.faceUp && top.color !== head.color && top.value === head.value + 1;

    if (!ok) {
      putBack(moving);
      selected = null;
      message = 'Ungültiger Zug';
      paint();
      return;
    }

    tableau[targetCol] = dest.concat(moving);
    flipTops();
    selected = null;
    moves++;
    message = 'Guter Zug';
    paint();
  }

  function onFoundation(i) {
    if (!selected) {
      if (foundations[i].length) {
        selected = { where: 'foundation', col: i };
        paint();
      }
      return;
    }

    const moving = takeSelected();
    if (!moving || moving.length !== 1) {
      if (moving) putBack(moving);
      selected = null;
      message = 'Nur einzelne Karten auf die Ablage';
      paint();
      return;
    }

    const card = moving[0];
    const pile = foundations[i];
    const top = pile[pile.length - 1];
    const ok = pile.length === 0
      ? card.value === 1
      : top.suit === card.suit && top.value === card.value - 1;

    if (!ok) {
      putBack(moving);
      selected = null;
      message = 'Ungültig für Foundation';
      paint();
      return;
    }

    foundations[i].push(card);
    flipTops();
    selected = null;
    moves++;
    message = 'Abgelegt';
    paint();
  }

  function flipTops() {
    for (const col of tableau) {
      if (col.length && !col[col.length - 1].faceUp) {
        col[col.length - 1].faceUp = true;
      }
    }
  }

  function won() {
    return foundations.every((p) => p.length === 13);
  }

  deal();
}
