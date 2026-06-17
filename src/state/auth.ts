/**
 * State management
 */
import { create } from 'zustand';

//Add TypeScript type definition

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; email: string; name?: string } | null;
    login: (data: { accessToken: string; refreshToken: string; user: { id: string; email: string; name?: string } }) => void;
    logout: () => void;
}

//Create the Store with initial state load from localStorage

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    login: ({ accessToken, refreshToken, user }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        set({ accessToken, refreshToken, user });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({ accessToken: null, refreshToken: null, user: null });
    }
}))