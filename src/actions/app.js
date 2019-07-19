/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const ADD_CHARACTER = 'ADD_CHARACTER'
export const GET_RESULT = 'GET_RESULT';
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'home-view' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = (page) => (dispatch) => {
  switch (page) {
    case 'home-view':
      import('../components/views/home-view.js');
      break;
    case 'results-view':
      import('../components/views/results-view.js');
      break;
    case 'form-view':
      import('../components/views/form-view.js');
      break;
    default:
      page = 'view404';
      import('../components/views/my-view404.js');
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

const CHARACTER_LIST = [
  {
    label: 'Mocking Spongebob',
    value: 'mocking-sponge',
    image: 'mocking-sponge.png',
    description: "You are a little chaotic and don't respect authority.",
    alt: 'Spongebob, a yellow rectangular sponge, imitating a chicken.',
  },
  {
    label: 'Handsome Squidward',
    value: 'handsome-squidward',
    image: 'handsome-squidward.png',
    description: 'Your confidence is through the roof, in a good way!',
    alt: 'Squidward, who is usually an average looking squid, drawn to have a very angular head and cleft chin.',
  },
  {
    label: 'Gary with Shoes',
    value: 'shoes-gary',
    image: 'shoes-gary.png',
    description: "You're laid back, but you also know how to tie your shoes.",
    alt: "Gary the snail with short legs coming out of his body below his shell and wearing a pair of men's dress shoes.",
  },
  {
    label: 'Chocolate Guy',
    value: 'chocolate-guy',
    image: 'chocolate-guy.png',
    description: "You're a little high strung, but only for the things you love most.",
    alt: 'A males fish screaming with his eyes bloodshot and his fists raised in the air.',
  },
  {
    label: 'Cockroach Eating',
    value: 'cockroach-eating',
    image: 'cockroach-eating.png',
    description: "You're definitely hungry.",
    alt: 'A cockroach sitting on a tiny barrel at a tiny table eating a tiny krabby patty.',
  },
  {
    label: 'Shocked Patrick',
    value: 'shocked-patrick',
    image: 'shocked-patrick.png',
    description: 'Something mind blowing recently happened to you.',
    alt: 'Patrick, a starfish, sitting on the ground with huge eyes, tiny pupils, and his mouth completely open.',
  },
  {
    label: 'Doodle Bob',
    value: 'doodle-bob',
    image: 'doodle-bob.png',
    description: 'You are chaos incarnate and wreak havoc everywhere you go.',
    alt: "A poorly drawn black and grey evil version of Spongebob with it's hands in the air yelling.",
  },
];

export const getAllCharacters = () => (dispatch) => {
  let randomized = getRandom(CHARACTER_LIST, 6)
  dispatch({
    type: GET_CHARACTERS,
    characters: randomized,
  });
};

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const addCharacter = (newCharacter) => (dispatch) => {
  dispatch({
    type: ADD_CHARACTER,
    newCharacter
  });
}

export const getResult = (value) => (dispatch) => {
  dispatch({
    type: GET_RESULT,
    value,
  });
}

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
  });
}