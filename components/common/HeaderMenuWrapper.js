import Link from 'next/link';
import React from 'react';
import { Urlredirect } from './functions/urlnavigate';

function HeaderMenuWrapper({ link, onClick, children, mainUrl }) {

  if (link) { 
    const href = mainUrl ? `/${mainUrl}${Urlredirect(link)}` : `${Urlredirect(link)}`;
    return <Link href={href}>{children}</Link>;
  }

  if (onClick) {
    return (
      <a onClick={onClick} role="button" tabIndex={0}>
        {children}
      </a>
    );
  }

  return <a>{children}</a>;
}

export default HeaderMenuWrapper;
