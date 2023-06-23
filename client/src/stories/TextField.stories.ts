import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@shared/ui';

const meta = {
  title: 'Shared/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
