let jokes = require('./jokes/index.json');

let lastJokeId = 0;
jokes.forEach(jk => jk.id = ++lastJokeId);

const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

/**
 * Get N random jokes from a jokeArray
 */
const randomN = (jokeArray, n) => {
  const limit = jokeArray.length < n ? jokeArray.length : n;
  const randomIndicesSet = new Set();

  while (randomIndicesSet.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    if (!randomIndicesSet.has(randomIndex)) {
      randomIndicesSet.add(randomIndex);
    }
  }

  return Array.from(randomIndicesSet).map(randomIndex => {
    return jokeArray[randomIndex];
  });
};

const randomTen = () => randomN(jokes, 10);

const randomSelect = (number) => randomN(jokes, number);

const jokeByType = (type, n) => {
  return randomN(jokes.filter(joke => joke.type === type), n);
};

const all = () => {
  return { jokes, total: jokes.length }
}

const paginated = (page = 0, size = 10) => {
  try {
    return { jokes: jokes.slice((page - 1) * size, page * size), total: jokes.length };
  } catch (error) {
    console.error(error);
    return { jokes: [], total: jokes.length };
  }
}

const newJoke = (params) => {
  // TO BE IMPLEMENTED
}

const updateJoke = (params) => {
  jokes = jokes.map(joke => {
    if (joke.id == params.id) {
      return { ...params };
    }
    return joke;
  });
}

const deleteJoke = (id) => {
  jokes = jokes.filter(joke => joke.id != id);
}

/** 
 * @param {Number} id - joke id
 * @returns a single joke object or undefined
 */
const jokeById = (id) => (jokes.filter(jk => jk.id === id)[0]);

module.exports = { jokes, randomJoke, randomN, randomTen, randomSelect, jokeById, jokeByType, paginated, all, updateJoke, newJoke, deleteJoke };
