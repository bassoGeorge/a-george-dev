'use client';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

export default function InnerPage({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavigationHeader />
      <main className="py-4 px-4">{children}</main>
    </>
  );
}
