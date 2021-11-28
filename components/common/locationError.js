import Router from "next/router"
const Index = ()  => {
    return (
        <div className="log-modal-overlay" >
            <div className="log-modal">
                <div className="log-modal-inner">

                    <div className="log-modal-header">
                        <h3>Location help</h3>
                    </div>

                    <div className="rep-modal-close" >
                        {/* <i className="fas fa-times"></i> */}
                    </div>

                    <div className="log-modal-body-wrap">
                        <div className="log-modal-body">
                            <p className="cr-prod-name mb-0"> Location not enabled </p> <br/>
                            <p className="text-muted cr-bs-dish">please set location</p>
                        </div>
                    </div>
                    <div className="log-modal-continue-btn"  style={{display: 'flex'}}>
                        <button onClick={() => Router.push('/searchlocation')}>Set location</button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Index