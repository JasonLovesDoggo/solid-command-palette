import { Component } from 'solid-js';
import { Navigate } from '@solidjs/router';

const DocsView: Component = () => {
  return <Navigate href="/docs/overview" />;
};

export default DocsView;
