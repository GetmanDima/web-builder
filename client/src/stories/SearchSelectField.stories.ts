import type { Meta, StoryObj } from '@storybook/react';
import { SearchSelectField } from '@shared/ui';

const meta = {
  title: 'Shared/SearchSelectField',
  component: SearchSelectField,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof SearchSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{title: 'title1', value: 'value1'}, {title: 'title2', value: 2}]
  },
};

export const WithSelected: Story = {
  args: {
    items: [{title: 'title1', value: 'value1'}, {title: 'title2', value: 2}],
    selected: 2
  },
};
