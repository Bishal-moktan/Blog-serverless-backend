import axios from 'axios';
import { selectorFamily } from 'recoil';
import { BACKEND_URL } from '../config';

export interface Comment {
  comment: string;
  createdAt: string;
  id: string;
  user: {
    name: string;
  };
}

export const commentSelectorFamily = selectorFamily({
  key: 'commentSelectorFamily',
  get: (id: string) => async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/comment/${id}/bulk`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return res.data;
  },
});
