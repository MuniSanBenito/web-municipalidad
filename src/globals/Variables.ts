import type { GlobalConfig } from 'payload'

export const Variables: GlobalConfig = {
  slug: 'variables',
  fields: [
    {
      type: 'text',
      name: 'variable1',
      label: 'Variable 1',
    },
    {
      type: 'number',
      name: 'variable2',
      label: 'Variable 2',
    },
  ],
}
