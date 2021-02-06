import { AxiosResponse } from "axios";

export const uploadImage = async (axiosClient: any, url: string, files: File[], afterUpload:any): Promise<void>=> {
    const formData = new FormData();
    formData.append("image", files[0]);
    const response:AxiosResponse = await axiosClient(
        "POST",
        url,
        formData,
        "multipart/form-data"
    );
    
    const { data } = response;
    afterUpload(files[0], data.fileName);
}