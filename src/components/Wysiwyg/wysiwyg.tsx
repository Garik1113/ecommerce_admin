import React, { useRef } from 'react';
import JoditEditor from "jodit-react";

interface IWysiwygProps {
    onChange: any,
    value: string
}
const Wysiwyg = (props: IWysiwygProps) => {
    const { onChange, value } = props;
	const editor = useRef(null);
	
	return (
            <JoditEditor
            	ref={editor}
                value={value}
                onChange={onChange}
            />
        );
}

export default Wysiwyg;