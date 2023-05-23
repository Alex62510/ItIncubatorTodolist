import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { Button } from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'Todolists/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem:{
      description: "Button clicked inside form",
      action: "clicked"
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const AddItemFormStory:Story ={
  args: {
   addItem:action('Button clicked inside form')
  },
};
export const AddItemFormErrorStory:Story ={
  render:(args)=>{
    return <div>
      <TextField variant="outlined"
                 error={true}
                 value={""}
                 onChange={()=>alert("hi")}
                 onKeyPress={()=>{alert("hello")}}
                 label="Title"
                 helperText={"Title is required"}
      />
      <IconButton color="primary" onClick={()=>args.addItem('')}>
        <AddBox />
      </IconButton>
    </div>
  }
}
export const AddItemFormErrorStory1:FC<AddItemFormPropsType> =(args)=>{
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  }

  return <div>
    <TextField variant="outlined"
               error={!!error}
               value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               label="Title"
               helperText={error}
    />
    <IconButton color="primary" onClick={addItem}>
      <AddBox />
    </IconButton>
  </div>

}