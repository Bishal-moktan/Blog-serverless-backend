import axios from 'axios';
import { atom, selector } from 'recoil';
import { BACKEND_URL } from '../config';

interface User {
  name: string;
  id: string;
  email: string;
}

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: selector({
    key: 'userSelector',
    get: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/userDetails`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        return res.data.userDetails;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  }),
});
