import type { Meta, StoryObj } from '@storybook/react';
import { OutPseudoField } from '@shared/ui';

const meta = {
  title: 'Shared/OutPseudoField',
  component: OutPseudoField,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof OutPseudoField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
