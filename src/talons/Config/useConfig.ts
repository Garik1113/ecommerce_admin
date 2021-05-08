import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useConfig = () => {
    const { configs = {} } = useSelector((state:any) => state.app);

    const getConfigValue = useCallback((configName: string) => {
        return configs[configName] ?   configs[configName] : {}
    }, [configs]);

    return {
        getConfigValue
    }
}