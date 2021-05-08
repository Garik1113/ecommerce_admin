import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "src/store"
import { signOut } from "src/store/actions/user/asyncActions";
import { useConfig } from "../Config/useConfig";

export const useHeader = () => {
    const isSignedIn = useSelector((state: AppState) => state.user.isSignedIn);
    const dispatch = useDispatch();
    const { getConfigValue } = useConfig();

    const logoSrc = useMemo(() => {
        const logoUrl = getConfigValue("logo");
        return typeof logoUrl == 'string' ? `api/images/config/${logoUrl}` : ""
    }, [getConfigValue]);

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
    }, [dispatch])
    return {
        isSignedIn,
        handleSignOut,
        logoSrc
    }
}