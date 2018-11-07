import React from "react";

export default function Conditional(props: {test: () => boolean, children: any}){
  return (props.test() ? <React.Fragment>{props.children}</React.Fragment> : null);
}