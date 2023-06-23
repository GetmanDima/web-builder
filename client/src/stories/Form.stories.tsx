import type { Meta, StoryObj } from '@storybook/react';
import { Form, TextField } from '@shared/ui';

const meta = {
  title: 'Shared/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Форма",
    children: [<TextField />]
  },
};
