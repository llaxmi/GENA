interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="text-gray-600 text-base font-light">{description}</p>
      )}
    </header>
  );
};

export default PageHeader;
