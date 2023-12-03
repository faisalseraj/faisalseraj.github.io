import { Heading, HStack } from '@chakra-ui/react';

import {
  FaFlask,
  FaList,
  FaRegistered,
  FaUser,
  FaUserAlt
} from 'react-icons/fa';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  SideMenu,
  SideMenuLink
} from '@/components/layouts/components/SideMenu';
import { FormattedMessage } from '@/utils/intl';

import { routes } from '@/shared/routes';
import { useSelf } from '@/shared/hooks/useSelf';
import { DashboardIcon } from '../icons/DashboardIcon';
import { useEffect, useMemo } from 'react';
import { UserType } from '@/shared/types';

const staticSections = [
  {
    title: 'Dashboard',
    items: [
      <SideMenuLink
        key="dashboard"
        icon={<DashboardIcon />}
        href={routes.lab.dashboard}
        title={<FormattedMessage id="admin.menu.dashboard" />}
      />
    ]
  },
  {
    title: 'Test',
    items: [
      <SideMenuLink
        key="tests"
        icon={<SettingsIcon />}
        href={routes.lab.tests}
        title={<FormattedMessage id="admin.menu.tests" />}
      />
    ]
  },
  {
    title: 'Reports',
    items: [
      <SideMenuLink
        key="generate Reports"
        icon={<FaFlask />}
        href={routes.lab.reports.generate}
        title={<FormattedMessage id="admin.menu.generateNewReport" />}
      />,
      <SideMenuLink
        key="list Reports"
        icon={<FaList />}
        href={routes.lab.reports.list}
        title={<FormattedMessage id="admin.menu.list" />}
      />
    ]
  },
  {
    title: 'Settings',
    items: [
      <SideMenuLink
        key="generate Reports"
        icon={<SettingsIcon />}
        href={routes.lab.settings}
        title={<FormattedMessage id="admin.menu.settings" />}
      />
    ]
  }
];
export const Menu = () => {
  const { self: user } = useSelf();

  const register = {
    title: 'Registration',
    items: [
      <SideMenuLink
        key="register"
        icon={<FaUser />}
        href={routes.app.register}
        title={<FormattedMessage id="admin.menu.registerNewUser" />}
      />
    ]
  };

  const sections: { title: string; items: JSX.Element[] }[] = useMemo(() => {
    if (
      user?.role === UserType.SuperAdmin &&
      staticSections[staticSections.length - 1].title !== 'Registration'
    ) {
      return [...staticSections, register];
    }
    return staticSections;
  }, [user]);
  return (
    <SideMenu
      header={
        <HStack gap={2}>
          <FaUserAlt fontSize={`${24 / 16}rem`} />
          <Heading
            m={0}
            mb={0}
            p={0}
            fontSize={`${24 / 16}rem`}
            fontWeight={400}
          >
            <FormattedMessage
              id="app.menuHeading"
              values={{ name: user?.firstName ?? '' }}
            />
          </Heading>
        </HStack>
      }
      sections={sections}
    />
  );
};
