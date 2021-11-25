import { useRef, useLayoutEffect, useState } from 'react';

const Section = (props) => {
    const [section, setSectionHeight] = useState(props.section);
    const targetRef = useRef();

    useLayoutEffect(() => {
        section.height = targetRef.current.clientHeight;
        setSectionHeight(section);
        props.sectionCallback(section);
    }, []);

    return (
        <div ref={targetRef} className="pb-4 pt-4">
            <h4 className="pb-3">{section.title}</h4>
            <div>{section.content}</div>
        </div>
    )

}

export default Section;