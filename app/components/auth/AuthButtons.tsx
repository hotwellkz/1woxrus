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
          <div className="flex items-center gap-2 text-bolt-elements-textSecondary">
            <div className="i-ph-user-circle text-xl" />
            <span className="text-bolt-elements-textSecondary text-sm hidden md:block">
              {user.email}
            </span>
          </div>
          <WithTooltip tooltip="Выйти">
            <IconButton
              icon="i-ph:sign-out"
              onClick={() => logout()}
            />
          </WithTooltip>
        </>
      ) : (
        <WithTooltip tooltip="Войти">
          <IconButton
            icon="i-ph:sign-in"
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
