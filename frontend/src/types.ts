
export interface NOTE {
  _id: string;
  title: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number | string;
}

export interface USER {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TODO {
  _id: string;
  owner: string;
  title: string;
  createAt: string;
  updatedAt: string;
  __v: number;
}
