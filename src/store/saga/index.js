import { takeEvery } from "redux-saga/effects";
import * as actionType from '../actions/action'

import {RedirectSaga} from './Auth'
export function* sagaAuth(){
    yield takeEvery(actionType.onRedirect,RedirectSaga)
}