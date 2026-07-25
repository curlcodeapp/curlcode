import type { Hairstyle } from '@/types/domain';

// The MVP seeds a single hairstyle (SDS §11) rather than the full catalog.
export const mockHairstyle: Hairstyle = {
  id: 'style_wash_and_go',
  name: 'Wash & Go',
  description: 'A wash-day routine that defines natural curls without a protective takedown step.',
};
