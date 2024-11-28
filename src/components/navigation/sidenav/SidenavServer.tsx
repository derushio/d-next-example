'use server';

import { SidenavContainer } from '@/components/navigation/sidenav/SidenavContainer';
import { getAuth } from '@/data-accesses/infra/nextAuth';

export async function SidenavServer() {
  const auth = await getAuth();

  return <SidenavContainer auth={auth} />;
}
