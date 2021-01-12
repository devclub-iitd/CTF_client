import React from "react";
import htmlContent from "./walkthrough.html";

export default function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
