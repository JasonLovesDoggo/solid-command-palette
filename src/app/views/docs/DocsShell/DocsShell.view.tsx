import { Component, Show, Suspense } from 'solid-js';
import { Loader } from '../../../shared/Loader/Loader';
import styles from './DocsShell.module.css';
import { AnchorProps, A, useIsRouting } from '@solidjs/router';
import { ParentComponent } from 'solid-js/types/render/component';

const SidebarNavLink: Component<AnchorProps> = (p) => {
  return (
    <A
      class={styles.navLink}
      activeClass={styles.activeNavLink}
      {...p}
    >
      {p.children}
    </A>
  );
};

const DocsShellView: ParentComponent = (p) => {
  const isRouting = useIsRouting();

  return (
    <section class={styles.wrapper}>
      <aside class={styles.sidebar}>
        <nav class={styles.sidebarNavGroup}>
          <h3>Introduction</h3>
          <ul class={styles.sidebarNavList}>
            <li>
              <SidebarNavLink href="/docs/overview">Overview</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/installation">Installation</SidebarNavLink>
            </li>
          </ul>
        </nav>
        <nav class={styles.sidebarNavGroup}>
          <h3>API</h3>
          <ul class={styles.sidebarNavList}>
            <li>
              <SidebarNavLink href="/docs/api/define-action">defineAction</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/api/root">Root</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/api/command-palette">CommandPalette</SidebarNavLink>
            </li>
          </ul>
        </nav>
        <Show when={isRouting()}>
          <Loader />
        </Show>
      </aside>
      <main class={styles.main}>
        <Suspense fallback={<Loader size="large" />}>
          <div class={styles.mainContent}>{p.children}</div>
        </Suspense>
      </main>
    </section>
  );
};

export default DocsShellView;
