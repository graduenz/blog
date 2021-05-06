import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Children } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HLink(props: any) {
  const { asPath } = useRouter();
  const { children } = props;
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  // eslint-disable-next-line react/destructuring-assignment
  const className = asPath === props.href || asPath === props.as
    ? `${childClassName} text-blue-600`.trim()
    : childClassName;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}

export default function Header(): JSX.Element {
  return (
    <header className="flex flex-row justify-between py-8">
      <Link href="/">
        <a className="font-mono text-xl text-blue-600">:~$ ./blog.rdnz.dev</a>
      </Link>
      <nav>
        <ul className="flex flex-row font-medium text-gray-400">
          <li className="mr-6"><HLink href="/"><a>Home</a></HLink></li>
          <li className="mr-6"><HLink href="/about"><a>About</a></HLink></li>
          <li><HLink href="/contact"><a>Contact</a></HLink></li>
        </ul>
      </nav>
    </header>
  );
}
