import {put} from "redux-saga/effects"
import * as actions from '../actions/action'
export function* RedirectSaga(action)
{
    console.log(action.path)
    yield put({
        type:actions.SET_PATH,
        path:action.path
    })
}