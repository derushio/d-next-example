'use client';

import { BodyStateContext } from '@/components/navigation/BodyContainer';
import { useContext } from 'react';

export function UserEmail() {
  const { auth } = useContext(BodyStateContext);

  return (
    <span>
      {auth && auth.user && auth.user.email && <div>{auth.user.email}</div>}
    </span>
  );
}
