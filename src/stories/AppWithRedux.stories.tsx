import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import React from "react";
import {ReduxStoreProvaderDecorator} from "../state/reduxStoreProvaderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'todolists/AppWithRedux',
  component: AppWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
    decorators:[ReduxStoreProvaderDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStory: Story = {


};


