type Value = {
    id: number,
    label: string,
    images: string []
}

export type Attribute = {
    label: string,
    id: number,
    values: Value[]
}
export const validateAttribute = (attribute: Attribute): boolean | Attribute => {
    const newAttribute: Attribute = {
        label: "",
        id: 1,
        values: []
    }
    const { label, id, values } = attribute;
    if (!label || !id ) {
        return false;
    } else {
        newAttribute.label = label; 
        newAttribute.id = id;
    }
    const newValues: Value[] = values.filter(e => !!e.label);
    if (!newValues.length) {
        return false
    } else {
        newAttribute.values = newValues;
    }

    return newAttribute;
}