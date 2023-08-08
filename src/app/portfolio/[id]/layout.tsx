import './layout.scss';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="portfolio-layout">{children}</section>;
};

export default PortfolioLayout;
