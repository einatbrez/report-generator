import { useEffect, useState, useRef } from 'react';
import Section from './Section'

const Page = (props) => {

    const [sectionsArr, setSectionsArr] = useState(props.pageSections)
    const firstRenderRef = useRef(true);

    function updateSectionData(section, index){
        const tempSections = [...sectionsArr];
        tempSections[index] = section;
        setSectionsArr(tempSections)
    }
    
    useEffect(()=>{
        if(props.dataLength === props.pageSections.length){
            props.pageCallback(sectionsArr);
        }
    }, [])

    const sections = props.pageSections.map((section, index) => {
        return (
            <Section 
            section={section}
            key={section.title}
            sectionCallback = {(section) => updateSectionData(section, index)}
            />
        )
        
    });
    
    return(
        <div className="border-bottom d-flex flex-column justify-content-between" ref={firstRenderRef} style={{height: props.pageHeight + 'px'}}>
            <div>{sections}</div>
            <div className="page-number">{props.pageNumber}</div>
        </div>
    )
}

export default Page;