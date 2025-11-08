interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="my-6">
      <h2 className="text-base sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-xs sm:text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
};

export default PageHeader;
