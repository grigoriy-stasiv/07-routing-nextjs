
import type { ReactNode } from 'react';
import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import css from './layout.module.css';

type FilterLayoutProps = {
  children: ReactNode;
};

export default function FilterLayout({
  children,
}: FilterLayoutProps) {
  return (
    <section className={css.container}>
      <SidebarNotes />
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}