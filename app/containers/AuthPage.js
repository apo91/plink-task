import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Auth from '../components/Auth';
import * as actions from '../actions/auth';
import { AuthState } from '../reducers/auth';

function mapStateToProps(state: AuthState) {
  return {
    authStatus: state.auth.authStatus,
    qrSlug: state.auth.qrSlug,
    qrConfirmationCountdown: state.auth.qrConfirmationCountdown
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
