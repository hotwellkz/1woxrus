import { Dialog } from '../ui/Dialog';
import { useState } from 'react';
import { login } from '~/lib/stores/auth';
import { toast } from 'react-toastify';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('action', isSignUp ? 'signup' : 'signin');
      
      if (isSignUp) {
        formData.append('name', name);
      }

      const response = await fetch('/api/auth', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.user) {
        login(data.user);
        onClose();
        toast.success(isSignUp ? 'Регистрация успешна' : 'Вход выполнен');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Произошла ошибка');
    }
  };

  return (
    <Dialog onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-xl font-bold mb-4 text-bolt-elements-textPrimary">
          {isSignUp ? 'Регистрация' : 'Вход'}
        </h2>
        
        <div className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-bolt-elements-textSecondary mb-1">
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-bolt-elements-textSecondary mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-bolt-elements-textSecondary mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-bolt-elements-button-primary-background hover:bg-bolt-elements-button-primary-backgroundHover text-bolt-elements-button-primary-text rounded-lg transition-colors"
          >
            {isSignUp ? 'Зарегистрироваться' : 'Войти'}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
          >
            {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
