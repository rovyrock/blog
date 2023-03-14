import { Link, Outlet } from 'umi';
import styles from './index.less';
import Footer from './footer'

export default function Layout() {
  return (<>
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
    </div>
    <div className='w-full'>
      <Outlet />
    </div>
    <Footer />
  </>
  );
}
