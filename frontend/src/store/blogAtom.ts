import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { BACKEND_URL } from '../config';

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string | null;
  };
}

export const blogsAtom = atom<Blog[]>({
  key: 'blogsAtom',
  default: selector({
    key: 'blogsSelector',
    get: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      return res.data;
    },
  }),
});

export const blogSelectorFamily = selectorFamily({
  key: 'blogSelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      const blogs = get(blogsAtom);
      return blogs.find((blog: Blog) => blog.id === id);
    },
});
