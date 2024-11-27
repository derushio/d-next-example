'use server';

import { getAuth } from '@/data-accesses/infra/nextAuth';

export async function UserEmail() {
  const auth = await getAuth();

  return <span>{auth?.email && <div>{auth.email}</div>}</span>;
}
