import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../config';

export interface Comment {
  comment: string;
  createdAt: string;
  id: string;
  user: {
    name: string;
  };
}

export const useComment = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/comment/${id}/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return {
    comments,
  };
};
