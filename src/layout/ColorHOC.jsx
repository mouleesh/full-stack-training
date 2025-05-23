const ColorWrapperHOC = (WrappedComponent) =>{
    return function func(){
        return (
            <>
                <WrappedComponent color="white" />
            </>
        )
    }
    
}

export default ColorWrapperHOC;
