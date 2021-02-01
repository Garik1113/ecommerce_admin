export const uploadImage = async (axiosClient: any, url: string, files: File[], afterUpload:any) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axiosClient(
        "POST",
        url,
        formData,
        "multipart/form-data"
    );
    afterUpload(files[0]);
}