const getDate = (createdAt: string) => {
    if(!createdAt) return null;
    const tempDate = new Date(createdAt);
    const month = tempDate.getMonth() + 1 > 9 ? tempDate.getMonth() + 1 : `0${tempDate.getMonth() + 1}`;
    const day = tempDate.getDate() > 9 ? tempDate.getDate() : `0${tempDate.getDate()}`
    const year = tempDate.getFullYear();
    return `${day}/${month}/${year}`
}

export default getDate