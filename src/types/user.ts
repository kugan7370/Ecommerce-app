export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}


export interface IAuthContextType {
    currentUser: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    users: IUser[];
}