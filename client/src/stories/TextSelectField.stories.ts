import type { Meta, StoryObj } from '@storybook/react';
import { TextSelectField } from '@shared/ui';

const meta = {
  title: 'Shared/TextSelectField',
  component: TextSelectField,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof TextSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'test',
    values: ['test1', 'test2']
  },
};
