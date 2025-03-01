import React, { useMemo } from "react";
import { RootState } from "../redux/reducers"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../api/user";
import { setUserInfo } from "../redux/actions";
import { setLoading } from "../redux/slices/appInfo";

export const useMe = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const token = useMemo(() => userInfo?.token, [userInfo]);

    const getMe = React.useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const { data } = await getUserInfo(token);
            dispatch(setUserInfo(data ?? {}));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token])

    return {
        getMe
    }
}