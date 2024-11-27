'use client';

import { BodyStateContext } from '@/components/navigation/BodyClient';
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import { useContext } from 'react';
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

export function Sidenav() {
  const { isSidenavOpen } = useContext(BodyStateContext);

  return (
    <Sidebar
      className={`fixed overflow-hidden z-40 w-72 h-screen transition-transform sm:translate-x-0 ${isSidenavOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href='/'>
            <h1>Create Next App</h1>
          </SidebarItem>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem href='/posts' icon={HiOutlineExclamationCircle}>
            <h2>投稿</h2>
          </SidebarItem>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            href='/api/auth/signin?callbackUrl=/'
            icon={HiArrowSmRight}
          >
            <h2>Sign In</h2>
          </SidebarItem>
          <SidebarItem
            href='/api/auth/signout?callbackUrl=/'
            icon={HiArrowSmLeft}
          >
            <h2>Sign Out</h2>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
