import { cn } from '@ageorgedev/toolbelt/cn';
import styles from './Page.module.css';

export function Page({ children }: React.PropsWithChildren) {
  return (
    <div className={cn(styles.Page, 'bg-page-0 min-h-[100vh]')}>
      <div className="max-w-[2048] mx-auto p-6 font-heading flex flex-col">
        {children}
      </div>
    </div>
  );
}
