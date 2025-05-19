const ColorWrapperHOC = (WrappedComponent) =>{
    return function func(){
        return (
            <>
                <WrappedComponent color="blue" />
            </>
        )
    }
    
}

export default ColorWrapperHOC;
