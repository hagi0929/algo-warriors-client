import React, { useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SessionStatus } from '../models/User';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Button } from './ui/button';
import { useUserProfile } from '../hooks/useUser';
import { CalendarDays } from 'lucide-react';
import Cookies from 'js-cookie';

interface ListItemProps {
  title: string;
  url: string;
  children?: React.ReactNode;
  className?: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ title, url, children, className = '', ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild className="border-gray border-2">
        <a
          className={`focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors ${className}`}
          href={url}
          {...props}
          ref={forwardedRef}
        >
          <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
          <p className="text-mauve11 leading-[1.4]">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

const Navbar = () => {
  const queryClient = useQueryClient()

  const { data: identity } = useUserProfile();

  useEffect(() => {
    if (identity?.status == SessionStatus.UNKNOWN) {
      queryClient.invalidateQueries({ queryKey: ['identity'] })
    }
  }, [identity])

  const logout = () => async () => {
    const token = Cookies.get('token');

    await fetch('http://127.0.0.1:3000/user/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    queryClient.invalidateQueries({ queryKey: ['identity'] });
  };

  return (
    <NavigationMenu.Root className="relative z-[1] w-full dark:bg-gray navBar">
      <NavigationMenu.List className="w-full flex items-center justify-between shadow-blackA4 m-0 list-none rounded-[6px] bg-gray p-1 shadow-[0_2px_10px]">
        <div className="flex items-center">
          <NavigationMenu.Item className='z-40'>
            <Link to="/home" className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px] content-center">
              AlgoWarrior
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className='ml-auto bg-white'>
            <Link to="/resources" className="mx-1 text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-2 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] bg-white">
              Resources
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className='ml-auto bg-white'>
            <a href="https://nextjs-yjs-monaco-vidhis-projects-5bb70a2b.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-2 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] bg-white">
              Collaborate
            </a>
          </NavigationMenu.Item>

          <NavigationMenu.Item className='ml-auto bg-white'>
            <NavigationMenu.Trigger className="mx-1 text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-2 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] bg-white ">
              Documentation{' '}
              <CaretDownIcon
                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180 bg-white"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto bg-white">
              <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-2 bg-white">
                <ListItem className="border-gray" title="Backend" url="https://github.com/hagi0929/Algo-Warriors-Server">
                  Want to check out the inner workings of the server?
                </ListItem>
                <ListItem className="border-gray" title="Frontend" url="https://github.com/hagi0929/Algo-Warriors-Client">
                  Want to check out the inner workings of the client-side pages?
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </div>


        <NavigationMenu.Item className="ml-auto pr-20">

          <div className="ml-auto flex items-center">
            {!identity ? (
              <div>Loading...</div>
            ) : identity.status == SessionStatus.AUTHENTICATED ? (
              <>
                <HoverCard>
                  <span className="text-s text-muted-foreground">
                    Welcome
                  </span>

                  <HoverCardTrigger asChild>
                    <Button variant="link">@{identity.data?.username}</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">

                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold"><span>@{identity.data?.username}</span>
                        </h4>

                        <p className="text-sm">
                          User ID: {identity.data?.user_id}
                        </p>
                        <p className="text-sm">
                          Email: {identity.data?.email}
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Joined {identity.data?.created_at?.toString()}
                          </span>
                        </div>

                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button variant="link" onClick={logout()}>Logout</Button>

              </>
            ) : (
              <>
                <Link to="/login" className="mx-2 text-violet11 hover:bg-violet3 focus:shadow-violet7 flex select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]">
                  Sign In
                </Link>
                <Link to="/register" className="mx-2 text-violet11 hover:bg-violet3 focus:shadow-violet7 flex select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]">
                  Register
                </Link>
              </>
            )}
          </div>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-left overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-gray" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-left">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-gray transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Navbar;
