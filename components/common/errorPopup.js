const Index = ({error, onClose})  => {
    return (
        <div className="log-modal-overlay" >
            <div className="log-modal">
                <div className="log-modal-inner">

                    <div className="log-modal-header">
                        <h3>Oops</h3>
                    </div>

                    <div className="rep-modal-close" onClick={() => onClose()}>
                        <i className="fas fa-times"></i>
                    </div>

                    <div className="log-modal-body-wrap">
                        <div className="log-modal-body">
                            <p className="cr-prod-name mb-0">Oops</p> <br/>
                            <p className="text-muted cr-bs-dish">{error}</p>
                        </div>
                    </div>
                    <div className="log-modal-continue-btn"  style={{display: 'flex'}}>
                        <button onClick={() => onClose()}>Ok</button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Index