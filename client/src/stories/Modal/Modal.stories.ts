import { ModalWrapper } from './ModalWrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Modal',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Test modal'
  },
};
