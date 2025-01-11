import { useStore } from '@nanostores/react';
import { userStore, logout } from '~/lib/stores/auth';
import { IconButton } from '../ui/IconButton';
import { useState } from 'react';
import { LoginModal } from './LoginModal';
import WithTooltip from '../ui/Tooltip';

export function AuthButtons() {
  const user = useStore(userStore);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            <div className="i-ph:user-circle text-xl text-bolt-elements-textSecondary" />
            <span className="text-bolt-elements-textSecondary text-sm hidden md:block">
              {user.email}
            </span>
          </div>
          <WithTooltip tooltip="Выйти">
            <IconButton
              icon="i-ph:sign-out-bold"
              onClick={() => logout()}
            />
          </WithTooltip>
        </>
      ) : (
        <WithTooltip tooltip="Войти">
          <IconButton
            icon="i-ph:sign-in-bold"
            onClick={() => setShowLoginModal(true)}
          />
        </WithTooltip>
      )}
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
