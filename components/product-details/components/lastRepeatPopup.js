import { useRef, useEffect} from 'react'

const Index = ({reapeatData, name, onAddNewData, onRepeatLastCartData, onToppingModal}) => {
    const toppingModalRef = useRef()
   
    const handleClickOutside = (e) => {
        if (toppingModalRef && !toppingModalRef.current.contains(e.target)) {
            onToppingModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div style={{ display: 'block' }}
            className="rep-modal-overlay">
            <div className="rep-modal">
                <div ref={toppingModalRef} className="rep-modal-inner">
                    <div className="rep-modal-header">
                        <div className="rep-modal-title">
                            <p className="mb-0">Repeat last customisations?</p>
                        </div>
                        <div
                            onClick={() => onToppingModal(false)}
                            className="rep-modal-close">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className="rep-modal-body">
                        <h5 className="r-m-heading">Build your own {name}</h5>
                        <div className="customisation-list">
                            <ul>
                                {
                                    reapeatData.sizeString ? <li> <b>Size : </b>{reapeatData.sizeString} </li> : null
                                } 

                                {
                                    reapeatData.addonsString ? <li> <b>Tapping : </b>{reapeatData.addonsString}</li> : null
                                } 
                            </ul>
                        </div>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <button className="add-new-btn" onClick={() => onAddNewData()} >Add new</button>
                            <button  onClick={() => onRepeatLastCartData()} className="repeat-btn">Repeat</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index