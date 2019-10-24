import { UserActionsEnum } from "../../../app/shared/enums";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import { UserModel } from "../../shared/model/user/user.model";
import { AccountService } from "../../services/";
import {  putUserFailed, putUserSuccess } from "../actions/profile.actions";
import { PutUserError, PutUserSuccess } from "src/app/shared/model/user/user-profile.models";

function* handleProfileRequest(user: UserModel) {

    try {
        const response: PutUserSuccess | PutUserError = yield call(AccountService.putUser, user);
        if((response as PutUserError).error){
            yield put(putUserFailed((response as PutUserError).error));
        } else {
            yield put(putUserSuccess(user.img));
        }
    }
    catch(err) {
        if (err instanceof Error) {
            yield put(putUserFailed(err.stack!));
        } else {
            yield put(putUserFailed('An unknown error occured.'));
        }
    }
}

function* watchProfileReqest() {
    yield takeEvery(UserActionsEnum.PUT_USER_REQUEST, handleProfileRequest);
}

function* ProfileSaga() {
    yield all([fork(watchProfileReqest)]);
}

export default ProfileSaga;