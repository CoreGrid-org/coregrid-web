import React from 'react';
import {Redirect} from '@docusaurus/router';

// Modules and Features are one page now; keep old /modules links working.
export default function Modules(): React.ReactElement {
  return <Redirect to="/features" />;
}
