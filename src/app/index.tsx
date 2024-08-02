import { render } from 'solid-js/web';

import { Router, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import AppShellView from './views/app/AppShell.view';
import DocsShellView from './views/docs/DocsShell/DocsShell.view';
import DocsView from './views/docs/Docs.view';
import ApiView from './views/docs/Api/Api.view';
import HomeView from './views/home/Home.view';
import ApiRootView from './views/docs/Api/ApiRoot.view';
import DemoView from './views/demo/Demo.view';

const appRender = () => {
  return (
    <Router root={AppShellView}>
      <Route
        path="/"
        component={HomeView}
      />
      <Route
        path="/demo"
        component={DemoView}
      />
      <Route
        path="/docs"
        component={DocsShellView}
      >
        <Route
          path="/"
          component={DocsView}
        />
        <Route
          path="/overview"
          component={lazy(() => import('./views/docs/introduction/Overview.view'))}
        />
        <Route
          path="/installation"
          component={lazy(() => import('./views/docs/introduction/Installation.view'))}
        />

        <Route
          path="/api"
          component={ApiRootView}
        >
          <Route
            path="/"
            component={ApiView}
          />
          <Route
            path="/define-action"
            component={lazy(() => import('./views/docs/Api/ApiDefineAction.view'))}
          />
          <Route
            path="/root"
            component={lazy(() => import('./views/docs/Api/ApiRoot.view'))}
          />
          <Route
            path="/command-palette"
            component={lazy(() => import('./views/docs/Api/ApiCommandPalette.view'))}
          />
        </Route>
      </Route>
    </Router>
  );
};

const rootElem = document.getElementById('root') as HTMLElement;

render(appRender, rootElem);
