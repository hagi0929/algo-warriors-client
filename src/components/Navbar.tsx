import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import HoverCardDemo from './HoverCard';
import { Link } from 'react-router-dom';

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

interface Props {}

const Navbar = (props: Props) => {
  return (
    <NavigationMenu.Root className="relative z-[1] w-screen dark:bg-gray navBar">
      <NavigationMenu.List className="w-full flex items-center justify-between shadow-blackA4 m-0 list-none rounded-[6px] bg-gray p-1 shadow-[0_2px_10px]">
        <div className="flex items-center">
        <NavigationMenu.Item className='z-40'>
            <Link to="/" className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px] content-center">
                AlgoWarrior
            </Link>
        </NavigationMenu.Item>
        
        <NavigationMenu.Item className='ml-auto bg-white'>
          <a href="https://nextjs-yjs-monaco-vidhis-projects-5bb70a2b.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] bg-white">
              Collaborate
          </a>
        </NavigationMenu.Item>  
          
        <NavigationMenu.Item className='ml-auto bg-white'>
          <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] bg-white ">
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
        <NavigationMenu.Item className="ml-auto">
          <NavigationMenu.Link
            className="text-violet11 hover:bg-violet3 focus:shadow-violet7 flex justify-right select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px] content-center"
            href=""
          >
            <HoverCardDemo />
          </NavigationMenu.Link>
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
