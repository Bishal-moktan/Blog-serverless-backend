import { atom, selector } from 'recoil';

export const appAtom = atom<boolean>({
  key: 'theme',
  default: selector({
    key: 'appSelector',
    get: () => {
      let mode = localStorage.getItem('theme');
      if (!mode) {
        localStorage.setItem('theme', 'white');
        mode = 'white';
      }
      return mode == 'dark';
    },
  }),
});
