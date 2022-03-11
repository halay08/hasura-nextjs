import { CommonActionTypes } from "./actions/Common.action";
import { AuthActions } from "./actions/Auth.actions";

export type AppActions = CommonActionTypes | AuthActions;
