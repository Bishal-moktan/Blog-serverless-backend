import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../config';

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string | null;
  };
}

export interface User {
  name: string;
  id: string;
  email: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [status, setStatus] = useState<number>();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/user/userDetails`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setUser(res.data.userDetails);
        setLoading(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err: AxiosError) => {
        setUser(null);
        setStatus(err.response?.status);
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
    status,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlog(response.data.post);

        setLoading(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err: AxiosError) => {
        setStatus(err.response?.status);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    status,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setStatus(err.response?.status);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    status,
  };
};

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
