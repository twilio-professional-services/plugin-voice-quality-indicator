import { connect } from "react-redux";
import MuteButton from "./MuteButton";

const mapStateToProps = (state) => ({
  muted:
    !!state["flex"].phone.connection &&
    state["flex"].phone.connection.source.isMuted(),
});

export default connect(mapStateToProps)(MuteButton);
