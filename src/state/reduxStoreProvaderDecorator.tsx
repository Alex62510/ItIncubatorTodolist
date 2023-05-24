import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";
export const ReduxStoreProvaderDecorator=(storyFn:()=>React.ReactNode)=>{
  return  <Provider store={store}>{storyFn()}</Provider>
}