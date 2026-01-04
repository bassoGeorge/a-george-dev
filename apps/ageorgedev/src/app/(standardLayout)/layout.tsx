import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

export default function StandardLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavigationHeader />
      <main>{children}</main>
    </>
  );
}
