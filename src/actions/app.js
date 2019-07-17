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

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'view1' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = (page) => (dispatch) => {
  switch (page) {
    case 'view1':
      import('../components/views/home-view.js').then((module) => {
      });
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
  { label: 'Mocking Spongebob', value: 'mocking-sponge', image: 'mocking-sponge.png' },
  { label: 'Handsome Squidward', value: 'handsome-squidward', image: 'handsome-squidward.png' },
  { label: 'Gary with Shoes', value: 'shoes-gary', image: 'shoes-gary.png' },
];

export const getAllCharacters = () => (dispatch) => {
  dispatch({
    type: GET_CHARACTERS,
    characters: CHARACTER_LIST,
  });
};
