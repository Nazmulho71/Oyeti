import { useState } from "react"
import {addUpi} from '../../lib/helpers/checkout'

const Index = ({onBack, onSuccessAdd, upis, setUpis}) => {

    const [upiText, setUpiText] = useState('')
    const [error, setError] = useState('')

    const _addNeWUpi = async() => {
        let status = await addUpi(upiText, upis, setUpis, setError)
        if (status) {
            onSuccessAdd(upiText)
            setUpiText('')
        }
    }

    return (
        <div className="wrapper">
            <div className="container m-0 p-0">
                <div className="status-bar-cont">
                    <div className="d-flex status-bar-inner">
                        <div className="status-name">
                            <button onClick={() => onBack()}><i className="fas fa-chevron-left"></i></button>
                            <p className="mb-0">New UPI ID</p>
                        </div>
                    </div>
                </div>

                <div className="page-wrapper px-20 pb-0">

                    <p className="text-muted para-small mb-4">Rest Assured your UPI ID is safe with us.</p>

                    <div className="payment-section-container">
                        <div className="form-group mb-3">
                            <input type="text" value={upiText} 
                                onChange={e => {setError('');setUpiText(e.target.value)}} 
                                className="form-control upi-input" 
                                id="exampleInputPassword1" 
                                placeholder="Enter Your UPI ID"
                            />
                        </div>
                    </div>

                   {error  ?  <p className="text-muted para-small mb-4">{error}</p> : ''}

                    <div className="pay-opt-now-btn-cont px-0">
                        <button onClick={() => _addNeWUpi()}>Verify Now</button>
                    </div>

                </div>


            </div>
            <hr className="hr-10" />

        </div>
    )
}

export default Index