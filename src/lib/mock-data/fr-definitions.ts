import type { FRDefinition } from '@/types/domain';

// Subset of the authoritative FR01–FR29 table (SDS §9). The full table is an open input
// from the product owner (SDS §32) — these five are placeholders scoped to the MVP catalog.
export const mockFRDefinitions: FRDefinition[] = [
  {
    frId: 'FR01',
    name: 'cleanses_without_stripping',
    definition: 'Removes buildup and residue while preserving the hair’s natural moisture.',
    applicableStepTypes: ['cleanse', 'clarify'],
  },
  {
    frId: 'FR05',
    name: 'provides_slip_for_detangling',
    definition: 'Reduces friction between strands enough to ease detangling.',
    applicableStepTypes: ['detangle', 'condition', 'leave_in'],
  },
  {
    frId: 'FR09',
    name: 'seals_and_retains_moisture',
    definition: 'Forms a light film or seal that helps retain moisture after conditioning.',
    applicableStepTypes: ['condition', 'deep_condition', 'seal', 'moisturize'],
  },
  {
    frId: 'FR14',
    name: 'provides_hold_without_flaking',
    definition: 'Defines and holds a style without visible flaking once dry.',
    applicableStepTypes: ['define'],
  },
  {
    frId: 'FR22',
    name: 'protects_from_heat',
    definition: 'Provides a heat-protective barrier before direct heat styling.',
    applicableStepTypes: ['heat_protect'],
  },
];
