import { atom } from 'nanostores';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userStore = atom<User | null>(null);

export function login(user: User) {
  userStore.set(user);
  Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Сохраняем на 7 дней
}

export function logout() {
  userStore.set(null);
  Cookies.remove('user');
}

// Инициализация из cookie при загрузке
if (typeof window !== 'undefined') {
  const savedUser = Cookies.get('user');
  if (savedUser) {
    try {
      userStore.set(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to parse saved user:', e);
    }
  }
}
