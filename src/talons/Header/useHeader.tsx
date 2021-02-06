import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "src/store"
import { signOut } from "src/store/actions/user/asyncActions";

export const useHeader = () => {
    const isSignedIn = useSelector((state: AppState) => state.user.isSignedIn);
    const dispatch = useDispatch();
    
    const handleSignOut = useCallback(() => {
        dispatch(signOut());
    }, [dispatch])
    return {
        isSignedIn,
        handleSignOut
    }
}