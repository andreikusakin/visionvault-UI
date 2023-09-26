export interface Gallery {
  coverUrl: string;
  date: string | null;
  description: string;
  id: number;
  name: string;
  password: string;
}

export interface Photo {
  id: number;
  url: string;
}

export interface Picture {
  id: number;
  url: string;
}
