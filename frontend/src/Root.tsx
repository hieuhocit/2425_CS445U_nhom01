// ** React router
import { Link, Outlet } from 'react-router-dom';

// ** Layout
import Layout from './Layout';

export default function Root() {
  return (
    <Layout>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/list-exam'>List Exam</Link>
      </nav>
      <Outlet />
    </Layout>
  );
}
