import React from 'react';
import { ReactNode } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import scss from "./LayoutSite.module.scss";
import TopHeader from "./header/TopHeader";

export default function LayoutSite({ children }: { children: ReactNode }) {
  return (
    <div className={scss.LayoutSite}>
      <TopHeader />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
