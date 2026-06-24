import * as React from "react";

export type ToastProps = {
  title?: string;
  description?: string;
};

export type ToastActionElement = React.ReactNode;

export function toast(props: ToastProps) {
  console.log("Toast:", props);
}