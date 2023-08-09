const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className="portfolio-layout"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      {children}
    </section>
  );
};

export default PortfolioLayout;
