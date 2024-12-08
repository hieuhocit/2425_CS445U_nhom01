/** Layout */
import Layout from './Layout';

/** react-router */
import { Outlet } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
