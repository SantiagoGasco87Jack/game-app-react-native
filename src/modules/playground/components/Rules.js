class Rule {
  constructor(params) {
    Object.assign(this, params);
  }

  sum(dice, value) {
    let numdice = [
      value[dice[0].n - 1],
      value[dice[1].n - 1],
      value[dice[2].n - 1],
    ];
    return numdice.reduce((prev, curr) => prev + curr);
  }

  freq(dice) {
    const freqs = new Map();
    for (let d of dice) freqs.set(d.n, (freqs.get(d.n) || 0) + 1);
    return Array.from(freqs.values());
  }

  count(dice, value, val) {
    return dice.filter((d) => value[d.n - 1] === val).length;
  }
}

class TotalOneNumber extends Rule {
  evalRoll = (dice, value, i) => {
    return value[i] * this.count(dice, value, value[i]); //return same dice length.
  };
}

class SumDistro extends Rule {
  evalRoll = (dice, value, count) => {
    return this.freq(dice).some((c) => c >= count) ? this.sum(dice, value) : 0;
  };
}

class FullHouse extends Rule {
  evalRoll = (dice) => {
    const freqs = this.freq(dice);
    return freqs.includes(2) && freqs.includes(3) ? this.score : 0;
  };
}

class Straight extends Rule {
  evalRoll = (dice, score, Royale = false) => {
    let numdice = new Array();
    for (let i = 0; i < dice.length; i++) {
      numdice.push(dice[i].n);
    }
    const d = new Set(numdice);
    if (dice.length === 3) {
      if (
        (d.has(1) && d.has(2) && (d.has(3) || d.has(6))) ||
        (d.has(3) && d.has(4) && (d.has(5) || d.has(2))) ||
        (d.has(5) && d.has(6) && (d.has(1) || d.has(4)))
      )
        return score;
    } else {
      if (Royale) {
        return score;
      } else {
        if (
          d.has(1) &&
          d.has(2) &&
          d.has(3) &&
          d.has(4) &&
          d.has(5) &&
          d.has(6)
        )
          return score;
      }
    }
    return 0;
  };
}

class Yahtzee extends Rule {
  evalRoll = (dice, score) => {
    return this.freq(dice)[0] === 3 ? score : 0;
  };
}

const leftTotal = new TotalOneNumber();
const totalOfKind = new SumDistro();

const fullHouse = new FullHouse({ score: 35 });
const straightTotal = new Straight();
const yahtzee = new Yahtzee();

export { leftTotal, totalOfKind, fullHouse, straightTotal, yahtzee };
