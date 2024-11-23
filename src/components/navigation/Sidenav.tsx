'use client';

import { BodyStateContext } from '@/components/navigation/BodyContainer';
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import { useContext } from 'react';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';

export function Sidenav() {
  const { isSidenavOpen } = useContext(BodyStateContext);

  return (
    <Sidebar
      className={`fixed overflow-hidden z-40 w-72 h-screen transition-transform sm:translate-x-0 ${isSidenavOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href='/'>
            <h1>App</h1>
          </SidebarItem>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            href='/api/auth/signin?callbackUrl=/'
            icon={HiArrowSmRight}
          >
            Sign In
          </SidebarItem>
          <SidebarItem
            href='/api/auth/signout?callbackUrl=/'
            icon={HiArrowSmLeft}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
