import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '@shared/ui';

const meta = {
  title: 'Shared/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [<div>Test</div>]
  },
};
