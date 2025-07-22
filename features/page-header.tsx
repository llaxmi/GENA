interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
      {description && (
        <p className="text-gray-600 text-base font-light">{description}</p>
      )}
    </header>
  );
};

export default PageHeader;
