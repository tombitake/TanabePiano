import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  description,
  centered = true,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {subtitle && (
        <p className="text-xs tracking-[0.3em] text-primary-dark uppercase font-sans mb-3 flex items-center gap-3 justify-center">
          <span className="inline-block w-10 h-px bg-primary"></span>
          {subtitle}
          <span className="inline-block w-10 h-px bg-primary"></span>
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-medium text-dark-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-text max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
