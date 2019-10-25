import { AuthActionEnum } from "../../../app/shared/enums";
import LoginRequestSagaModel from "../../../app/shared/model/auth/auth-saga.model";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import { AccountService } from "../../../app/services";
import { loginFailed, loginSuccess } from "../actions/auth.actions";
import { LoginError, LoginSuccess } from "src/app/shared/model/auth/login.model";
import NavigationService from "../../services/navigation.service";

function* handleLoginRequest(data: LoginRequestSagaModel) {

    try {
        const response: LoginSuccess | LoginError = yield call(AccountService.login, data.login, data.password);

        if((response as LoginError).message){
            yield put(loginFailed((response as LoginError).message));
        } else {

            yield put(loginSuccess((response as LoginSuccess).img, (response as LoginSuccess).token));
            yield call(NavigationService.navigate, 'Home', {});
        }
    } catch(err) {
        if (err instanceof Error) {
            yield put(loginFailed(err.stack!));
        } else {
            yield put(loginFailed('An unknown error occured.'));
        }
    }
}

function* watchLoginReqest() {
    yield takeEvery(AuthActionEnum.LOGIN_EMAIL_REQUEST, handleLoginRequest);
}

function* LoginSaga() {
    yield all([fork(watchLoginReqest)])
}

export default LoginSaga;