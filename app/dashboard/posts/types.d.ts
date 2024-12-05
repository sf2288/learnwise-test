export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  isTemp?: boolean;
  user?: {
    id?: number;
    name?: string;
    email?: string;
    website: string;
  };
}
