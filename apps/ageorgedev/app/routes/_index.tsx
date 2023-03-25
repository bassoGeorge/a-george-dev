import { SiteUnderConstruction } from '../components/SiteUnderConstruction';
import { ThemeProvider } from '@ageorgedev/molecules';

export default function Index() {
  return (
    <ThemeProvider>
      <SiteUnderConstruction />;
    </ThemeProvider>
  );
}
