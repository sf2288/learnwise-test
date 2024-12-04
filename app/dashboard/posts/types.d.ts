export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: {
    id?: number;
    name?: string;
    email?: string;
    website: string;
  };
}
