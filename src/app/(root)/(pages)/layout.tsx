import { ReactNode } from "react";
import LayoutSite from './../../../components/site/layout/LayoutSite';

const layout = ({ children }: { children: ReactNode }) => (
  <LayoutSite>{children}</LayoutSite>
);

export default layout;
