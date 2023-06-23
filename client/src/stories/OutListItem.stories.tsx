import type { Meta, StoryObj } from '@storybook/react';
import { OutListItem } from '@shared/ui';

const meta = {
  title: 'Shared/OutListItem',
  component: OutListItem,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof OutListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [<div>Test</div>]
  },
};
