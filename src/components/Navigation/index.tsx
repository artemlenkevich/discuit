import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui';

import { ReactComponent as HomeIcon } from './assets/home-icon.svg';
import { ReactComponent as SubscriptionsIcon } from './assets/subscriptions-icon.svg';
import styles from './Navigation.module.scss';

interface LinkProps {
  to: string;
  name: string;
  icon: ReactElement;
}

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.navItem}>
          <Link to='/' name='Home' icon={<HomeIcon />} />
        </li>
        <li>
          <Link to='/subscriptions' name='Subscriptions' icon={<SubscriptionsIcon />} />
        </li>
      </ul>
    </nav>
  );
};

const Link: React.FC<LinkProps> = ({ to, name, icon }) => {
  return (
    <NavLink to={to}>
      <Button className={styles.navLink} as='span' variant='text' fullWidth startIcon={icon}>
        {name}
      </Button>
    </NavLink>
  );
};
