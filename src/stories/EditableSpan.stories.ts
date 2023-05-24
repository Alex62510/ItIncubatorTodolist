import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'todolists/EditableSpan',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
argTypes:{
    value:{
    description: "Start value empty string. Set value"
    },
  onChange:{
      description:"Set new value"
  }
},
  args:{
    onChange: action ("Change value EdiatableSpan")
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {


};


