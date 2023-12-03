import { Store } from 'pullstate';

interface IAppStore {
  isSuperAdmin: boolean;
  isSideMenuOpen: boolean;
  isAllianceAdmin: boolean;
}

export const AppStore = new Store<IAppStore>({
  isSuperAdmin: false,
  isSideMenuOpen: false,
  isAllianceAdmin: false
});
