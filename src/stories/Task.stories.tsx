import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../Task";
import {TaskType} from "../Todolist";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'todolists/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {
      task: {id: "ddsds", isDone: false, title: "JS"},
      removeTask: action('RemoveTask'),
      changeTaskStatus: action('ChangeTaskStatus'),
      changeTaskTitle: action('ChangeTaskTitle'),

    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsNotDone: Story = {

};
export const TaskIsDone: Story = {

    args: {
        task: {id: "ddsdsaa", isDone: true, title: "JS"},
    },
};