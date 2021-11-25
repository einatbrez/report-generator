import { useEffect, useState } from 'react'
import Page from './Page'
import ContentTable from './ContentTable'

const Report = (props) => {
    
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    //Fetching inital data
    useEffect(() => {
        const sections = async () => {
          let response = await fetch('https://raw.githubusercontent.com/einatbrez/pantera-data/main/sections');
          if (!response.ok) {
            alert("Unfortunatley something went wrong. please contact us for more information");
          }
          response = await response.json();
          setData(response.sections);
          setDisplayData([response.sections]);
        }
        sections();
    }, []);

    useEffect(()=>{
        if(dataReady){
            props.openModalCallback();
        }
        //ctrl+shift+h event listener to shuffle the sections order
        document.addEventListener('keydown', onKeyDown);
        
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    });

    function onKeyDown(e){
        if(e.ctrlKey && e.shiftKey && e.which === 72) {
            setDisplayData([data.sort(() => 0.5 - Math.random())]);
        }
    }
    
    function updatingPageData(sectionsArr){
        let counter = 0
        let page = 1
        
        sectionsArr.forEach((section) => {
            if(counter + section.height > (props.pageHeight - 24)){
                page = page + 1;
                counter = section.height;
            }else{
                counter = counter + section.height;
            }
            section.page = page;
        });
     
       setDisplayData(reducePages(sectionsArr, 'page'));
       setDataReady(true);
    }

    function reducePages(sectionsArr, property) {
        return sectionsArr.reduce((acc, obj) => {
            let key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, [])
    }
      
    const pages = displayData.map((page, index) => {
        return (
            <Page
            key = {index}
            pageSections = {page}
            pageNumber = {index}
            dataLength = {data.length}
            pageHeight = {props.pageHeight}
            pageCallback = {page => updatingPageData(page)}
            />
        )
    });

    return(
        <div>
            <ContentTable
            pageHeight = {props.pageHeight}
            data = {displayData}/>
            <div>{pages}</div>
        </div>
    )
}

export default Report;