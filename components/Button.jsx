import * as React from "react";
import { useRouter } from "next/router";
import { Button } from "./plasmic/friendo/PlasmicButton";

function Button(props) {
  const router = useRouter();

  const handleClick = () => { 
    console.log("Button clicked! Navigating...");
  }

  return (
    <Button
      {...props}
      overrides={{
        downloadbut: {
          onClick: {handleClick},
          "aria-label": "See All Friends", 
        },
      }}
    />
  );
}

export default Button;



