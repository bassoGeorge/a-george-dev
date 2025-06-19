import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

export default function InnerPage({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavigationHeader />
      <main className="px-4 py-4">{children}</main>
    </>
  );
}
