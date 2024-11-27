'use client';

import { UserEmail } from '@/components/atom/user/UserEmail';
import { useIsMountedCheck } from '@/hooks/useIsMountedCheck';
import { Button, MegaMenu } from 'flowbite-react';
import { HiBars3 } from 'react-icons/hi2';

export function Header({
  onSidenavSwitch,
}: {
  onSidenavSwitch: () => void | Promise<void>;
}) {
  const [isMounted] = useIsMountedCheck();

  return (
    <MegaMenu className='absolute z-40 h-14 w-full bg-primary text-white overflow-hidden rounded-sm sm:rounded-none'>
      <div className='w-full flex justify-between items-center gap-2'>
        <div className='flex-none overflow-hidden sm:w-0'>
          {isMounted && (
            <Button onClick={onSidenavSwitch} color='primary' size='sm'>
              <HiBars3 size='20' />
            </Button>
          )}
        </div>

        <div className='flex-1' />

        <div className='flex-none'>
          <UserEmail />
        </div>
      </div>
    </MegaMenu>
  );
}
