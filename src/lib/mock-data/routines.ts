import { mockHairstyle } from '@/lib/mock-data/hairstyles';
import type { Routine } from '@/types/domain';

// One seeded routine template for mockHairstyle (SDS §12), with existing products
// pre-assigned to steps (SDS §13) so the Routines screen has something to render.
export const mockRoutine: Routine = {
  id: 'routine_wash_and_go_weekly',
  name: 'Weekly Wash & Go',
  targetStyleId: mockHairstyle.id,
  status: 'active',
  washCycleDays: 7,
  steps: [
    {
      id: 'step_detangle',
      sequence: 1,
      stepType: 'detangle',
      requirementLevel: 'required',
      assignedProductIds: ['prod_thedoux_hydration_oil'],
    },
    {
      id: 'step_cleanse',
      sequence: 2,
      stepType: 'cleanse',
      requirementLevel: 'required',
      assignedProductIds: ['prod_mielle_rosemary_shampoo'],
    },
    {
      id: 'step_deep_condition',
      sequence: 3,
      stepType: 'deep_condition',
      requirementLevel: 'required',
      assignedProductIds: ['prod_sheamoisture_manuka_masque'],
    },
    {
      id: 'step_leave_in',
      sequence: 4,
      stepType: 'leave_in',
      requirementLevel: 'required',
      // Real, evidence-based partial fit: this leave-in only covers FR01 (hydration);
      // "leave_in" also requires FR02 (retention), which a lighter spray-type leave-in
      // like this one genuinely doesn't provide per its ProductCategories mapping.
      assignedProductIds: ['prod_mielle_pomegranate_leave_in'],
    },
    {
      id: 'step_define',
      sequence: 5,
      stepType: 'define',
      requirementLevel: 'required',
      // Real, evidence-based partial fit: this mousse covers FR11 (curl definition) and
      // FR27 (volume) per its real product-category mapping, but not FR12 (curl hold),
      // which "define" also requires — a genuine weak fit, not a fabricated one.
      assignedProductIds: ['prod_thedoux_texture_foam'],
    },
    {
      id: 'step_refresh',
      sequence: 6,
      stepType: 'refresh',
      requirementLevel: 'optional',
      assignedProductIds: ['prod_thedoux_curl_refresher'],
    },
  ],
};
