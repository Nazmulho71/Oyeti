const Index = ({billAmountHanlder}) => {
    return (
        <div className="keyboard-cont">
            <div className="key-brd-cont-inner">
                <div className="key-brd-flex">
                    <button onClick={()=>billAmountHanlder(1)}>1</button>
                    <button onClick={()=>billAmountHanlder(2)}>2</button>
                    <button onClick={()=>billAmountHanlder(3)}>3</button>
                </div>
                <div className="key-brd-flex">
                    <button onClick={()=>billAmountHanlder(4)}>4</button>
                    <button onClick={()=>billAmountHanlder(5)}>5</button>
                    <button onClick={()=>billAmountHanlder(6)}>6</button>
                </div>
                <div className="key-brd-flex">
                    <button onClick={()=>billAmountHanlder(7)}>7</button>
                    <button onClick={()=>billAmountHanlder(8)}>8</button>
                    <button onClick={()=>billAmountHanlder(9)}>9</button>
                </div>
                <div className="key-brd-flex">
                    <button onClick={()=>billAmountHanlder(0)}>0</button>
                    <button  onClick={()=>billAmountHanlder('.')}>.</button>
                    <button onClick={() => billAmountHanlder('back')}><i className="fas fa-chevron-left"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Index