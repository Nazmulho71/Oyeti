const Index = ({onClose, oyetiPhone, storePhone})  => {
    return (
        <div className="log-modal-overlay" >
            <div className="log-modal">
                <div className="log-modal-inner">

                    <div className="log-modal-header">
                        <h3>Help</h3>
                    </div>

                    <div className="rep-modal-close" onClick={() => onClose()}>
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="log-modal-body-wrap">
                        <div className="log-modal-body">
                            <p className="cr-prod-name mb-0"> You can call the store or oyeti</p> <br/>
                            <p className="text-muted cr-bs-dish">Tell us what you like and what went wrong</p>
                        </div>
                    </div>
                    <div className="log-modal-continue-btn"  style={{display: 'flex'}}>
                        <button > <a target="_blank" href={`tel:${oyetiPhone}`}>Call Oyeti</a> </button>
                        <div style={{paddingLeft: "7%"}}></div>
                        <button ><a target="_blank" href={`tel:${storePhone}`}>Call Store</a></button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Index