import {useEffect} from "react";

export function useLockBodyScroll(isLocked) {
    useEffect(() => {
        if(isLocked) {
            document.body.style.overflow="hidden";
        } else document.body.style.overflow="unset";

        // cleanup function for when component unloads
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLocked])

}