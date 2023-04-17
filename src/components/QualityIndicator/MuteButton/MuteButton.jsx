import React, { Component } from "react";
import { templates } from "@twilio/flex-ui";
import { Actions, IconButton } from "@twilio/flex-ui";

class MuteButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { muted, disabled, inputLevel } = this.props;
    let icon = "MuteLarge";
    let opacity = 0;

    if (disabled)
      {opacity=0.5}
    else if (muted) {
      icon = "MuteLargeBold"
      opacity = 0.5
    }
    else 
    {
      // inputLevel is 0-9 - make sure is at least 0.1 opacity
      opacity = (inputLevel + 1) / 10
      opacity = opacity * 2 //x2 opacity seems to work best
    }

    return (
      <IconButton
        icon={icon}
        onClick={this.onMuteClick}
        title={templates.MuteCallTooltip()}
        disabled={disabled}
        style={{ opacity: opacity }}
        large="true"
      />
    );
  }

  onMuteClick = () => {
    Actions.invokeAction("ToggleMute");
  };
}

export default MuteButton;
