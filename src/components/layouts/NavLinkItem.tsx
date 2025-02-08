/** 단순한 링크로 구성된 네비게이션 항목 */
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

export const NavLinkItem = ({ href, label, className }: NavItemProps) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'text-base font-semibold',
          className,
        )}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
