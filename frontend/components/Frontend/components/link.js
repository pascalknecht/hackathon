import { Link as MenuLink, Link as A } from "@chakra-ui/react";
import NextLink from "next/link";
export function NavLink({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <MenuLink {...rest}>{children ? children : label}</MenuLink>
    </NextLink>
  );
}
export function Link({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <A {...rest}>{children ? children : label}</A>
    </NextLink>
  );
}
