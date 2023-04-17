import React, { Component } from "react";
import { QualityIndicatorStyles } from './QualityIndicator.Styles';
import MuteButtonContainer from "./MuteButton/MuteButton.Container"
import CustomerPhoneIcon from "./CustomerPhoneIcon/CustomerPhoneIcon"
import FlexWifiIndicator from "./FlexWifiIndicator/FlexWifiIndicator"
import { VolumeEventsHandler } from "../../helpers/voiceClientHelper";
class QualityIndicator extends Component {

  constructor(props) {
    super(props)

    this.state = {inputLevel:0, outputLevel:0}
  }

  componentDidMount() {
    VolumeEventsHandler.on('input', (level) => this.setState({inputLevel: level}))
    VolumeEventsHandler.on('output', (level) => this.setState({outputLevel: level}))

  }

  componentWillUnmount() {
    VolumeEventsHandler.removeListener('input')
    VolumeEventsHandler.removeListener('output')
  }

  render() {
    const { isLiveVoiceCall, theme, networkStatus } = this.props;
    const { inputLevel, outputLevel } = this.state;
    

    return (
      <QualityIndicatorStyles disabled={!isLiveVoiceCall} errorLevel={networkStatus.errorLevel} >
        <CustomerPhoneIcon disabled={!isLiveVoiceCall} themeOverride={theme.MainHeader.Button} outputLevel={outputLevel} />
        <MuteButtonContainer disabled={!isLiveVoiceCall} themeOverride={theme.MainHeader.Button} inputLevel={inputLevel}/>
        <FlexWifiIndicator disabled={!isLiveVoiceCall} networkStatus={networkStatus} />
      </QualityIndicatorStyles>)
  }
  
}

export default QualityIndicator;
