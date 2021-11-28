import Header from '../../components/common/header'
import {useState, useEffect, Fragment} from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { getAuth } from '../../lib/helpers/common'
import { updateProfile } from '../../lib/helpers/home'

import {genderEnums} from '../../lib/enums'
import loaderAction from '../../lib/helpers/loader'


const Index = () => {

    
    const [auth, setAuth] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [erros, setErrors] = useState({})

    
    const onChangeKey = (e, key) => {

        if (key == 'name') {
            let regex = /^[a-zA-Z\s]*$/
            if (regex.test(e.target.value)) {
                setName(e.target.value)
            }
        }

        if (key == 'email') {
            setEmail(e.target.value)
        }

        if (key == 'gender') {
            setGender(e.target.value)
        }
    }


    useEffect(() => {
        let data = getAuth(setAuth)
        if (data) {
            setName(data.name)
            setEmail(data.email)
            setGender(data.gender)
            setPhone(data.phone)
        }
    }, [])

    return (
        <div className="wrapper" style={{ height: '100vh' }}>
            <div className="container m-0 p-0">
                <Header 
                    title={`Edit Profile`} 
                    goBack={() => Router.back()} 
                    subtitle=""
                    onSubTitileClick={() => console.log('')} 
                />

                <div style={{marginTop: '25%'}}>
                    {erros && erros.server ? <p>{erros.server}</p> : null}
                </div>

                <div >
                    <label>Name</label>
                    <input type="text" value={name} onChange={e => onChangeKey(e, 'name')}/>
                    {erros && erros.name ? <p>{erros.name}</p> : null}
                </div>

                <div>
                <br/>   <br/>
                    <label>Email</label>
                    <input type="email"  value={email} onChange={e => onChangeKey(e, 'email')}/>
                    {erros && erros.email ? <p>{erros.email}</p> : null}
                </div>

                <div>
                <br/>   <br/>
                    <label>Mobile</label>
                    <input type="text"  disabled value={phone} />
                    {erros && erros.mobile ? <p>{erros.mobile}</p> : null}
                </div>


                <div key={auth.gender}>
                <br/>   <br/>
                    {
                        Object.entries(genderEnums).map((gen, index) => {
                           
                            return (
                               <Fragment key={index}>
                                    <input type="radio" onChange={e => onChangeKey(e, 'gender')} id="html" defaultChecked={gender == gen[1].checkValue} name="gender" value={gen[1].checkValue}/>
                                    <label htmlFor="html">{gen[0]}</label><br></br>
                               </Fragment>
                            )
                        })
                    }
                </div>


                <div>
                    <br/>   <br/>
                    <button onClick={() => updateProfile(loaderAction, name, email, gender, setErrors)} >Submit</button>
                </div>

            </div>
        </div>
    )
}

Index.getInitialProps = async (ctx) => {
    const { asPath, query } = ctx
    const { token } = nextCookie(ctx)
  
    let isLoggedIn = token ? true : false
    return { isLoggedIn, token, asPath, query  }
}

export default Index