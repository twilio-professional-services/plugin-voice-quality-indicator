import React, { Component } from "react";
import { Icon} from "@twilio/flex-ui";

class CustomerPhoneIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { disabled, outputLevel } = this.props;
    let icon = "Hangup"
    let opacity = 0.5;

    if (!disabled) {
      // outputLevel is 0-9 - make sure at least some opacity
      opacity = (outputLevel + 1) / 10
      opacity = opacity * 4 //x4 opacity seems to work best for customer side

      if (opacity > 0.5) {
        icon = "IncomingCall"
              }
      else {
        icon = "Call"
      }
    }
    
    return (
      <div style={{opacity: opacity}}>
      <Icon
        icon={icon}
        style={{ height: 24 }}
        />
      </div>
    );
  }
}

export default CustomerPhoneIcon;



