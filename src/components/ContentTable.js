const ContentTable = (props) => {
        
    const oneSectionsArr = props.data.reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue),
        []
    );
    
    const table = oneSectionsArr.map((section, index) => {
        return(
            <div key={index} className="table-element pb-2">
                <div className="text-primary font-weight-bold">{section.title}</div>
                <div className="text-secondary">......... page {section.page}</div>
            </div>
        )

    })

    return <div className="d-flex justify-content-center align-items-center flex-column border-bottom" style={{height: props.pageHeight + 'px'}}>{table}</div>

}

export default ContentTable;