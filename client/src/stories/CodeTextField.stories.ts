import type { Meta, StoryObj } from '@storybook/react';
import { CodeTextField } from '@shared/ui';

const meta = {
  title: 'Shared/CodeTextField',
  component: CodeTextField,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof CodeTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
