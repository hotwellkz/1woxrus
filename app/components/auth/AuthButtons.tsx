import { useStore } from '@nanostores/react';
import { userStore, logout } from '~/lib/stores/auth';
import { IconButton } from '../ui/IconButton';
import { useState } from 'react';
import { LoginModal } from './LoginModal';

export function AuthButtons() {
  const user = useStore(userStore);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="text-bolt-elements-textSecondary text-sm hidden md:block">
            {user.name}
          </span>
          <IconButton
            icon="i-ph:sign-out"
            title="Выйти"
            onClick={() => logout()}
          />
        </>
      ) : (
        <IconButton
          icon="i-ph:sign-in"
          title="Войти"
          onClick={() => setShowLoginModal(true)}
        />
      )}
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
