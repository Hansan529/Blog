'use client';

import { api } from '../../axios';
import Portfolio from './Portfolio';

const PortfolioEdit = async () => {
  const { portfolio } = await (await api.get('/portfolio')).data;
  return <Portfolio edit={true} />;
};

export default PortfolioEdit;
