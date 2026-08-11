import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';

import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';

import NavbarItem, {
  type Props as NavbarItemConfig,
} from '@theme/NavbarItem';

import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './styles.module.css';

/* =========================================================
   BRAND
========================================================= */

function NavbarBrand(): ReactNode {
  const logo = useBaseUrl('/img/coregrid-logo.png');

  return (
    <Link to="/" className={styles.brand}>
      <img
        src={logo}
        className={styles.logo}
        alt="CoreGrid Sri Lanka"
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  );
}

/* =========================================================
   NAVBAR ITEMS
========================================================= */

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({
  items,
}: {
  items: NavbarItemConfig[];
}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.

Please double-check the following navbar item in themeConfig.navbar.items:

${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

/* =========================================================
   NAVBAR LAYOUT
========================================================= */

function NavbarContentLayout({
  brand,
  links,
  right,
}: {
  brand: ReactNode;
  links: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className={styles.navbarInner}>
      {/* LEFT — LOGO */}
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          styles.brandArea,
        )}
      >
        {brand}
      </div>

      {/* CENTER — LINKS */}
      <div className={styles.navLinks}>
        {links}
      </div>

      {/* RIGHT — LOGIN / SEARCH */}
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          styles.rightArea,
        )}
      >
        {right}
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR CONTENT
========================================================= */

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();

  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find(
    (item) => item.type === 'search',
  );

  return (
    <NavbarContentLayout
      brand={
        <div className={styles.brandWrapper}>
          {!mobileSidebar.disabled && (
            <div className={styles.mobileToggle}>
              <NavbarMobileSidebarToggle />
            </div>
          )}

          <NavbarBrand />
        </div>
      }

      links={
        <NavbarItems items={leftItems} />
       }

      right={
        <>
          <NavbarItems items={rightItems} />

          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
