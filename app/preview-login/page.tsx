import type { Metadata } from 'next';
import PreviewLoginForm from './PreviewLoginForm';

export const metadata: Metadata = {
  title: 'プレビューアクセス — TANABEピアノ教室',
  robots: { index: false, follow: false },
};

export default function PreviewLoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const redirectTo = searchParams.from ?? '/';
  return <PreviewLoginForm redirectTo={redirectTo} />;
}
