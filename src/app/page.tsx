import Portfolio from './components/Portfolio';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Introduce from './components/Introduce';

export default async function Home() {
  return (
    <>
      <Introduce />
      <Portfolio />
    </>
  );
}
