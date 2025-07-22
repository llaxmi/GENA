interface FooterProps {
  mainLinks: Array<{
    href: string;
    label: string;
  }>;

  copyright: {
    text: string;
    license?: string;
  };
}

export function Footer({ mainLinks, copyright }: FooterProps) {
  return (
    <footer className="pb-6 lg:pb-8 px-28">
      <div className="pt-6 lg:grid lg:grid-cols-10">
        <nav className="lg:mt-0 lg:col-[4/11]">
          <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
            {mainLinks.map((link, i) => (
              <li key={i} className="my-1 mx-2 shrink-0">
                <a
                  href={link.href}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
          <div>{copyright.text}</div>
          {copyright.license}
        </div>
      </div>
    </footer>
  );
}
