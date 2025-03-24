import React, {useState} from 'react'
import axios from 'axios';
function RegisterComponent() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (username, email, password) => {
        const url = `http://0.0.0.0:8000/api/`;
        try {
            const response = await axios.post(`${url}/signup`, { username, email, password });
            console.log('Register attempt: ', response);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <button
                type="button"
                className='btn btn-outline-primary'
                style={{marginTop: '8px'}}
                data-bs-target='#registerModal'
                data-bs-toggle="modal">
                Register
            </button>
            <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" style={{ backgroundColor: '#3d3d5c'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                    <label htmlFor={'username'} className={'form-label'} style={{fontSize: '15px'}}>Username:</label>
                                    <input type={'text'} className={'form-control register-input'} id={'username'} placeholder={'Username'}
                                           value={username} style={{fontSize: '15px'}}
                                           onChange={(e) => setUsername(e.target.value)} required/>
                                    <label htmlFor={'email'} className={'form-label'} style={{paddingTop: '5px', fontSize: '15px'}}>Email:</label>
                                    <input type={'email'} className={'form-control register-input'} id={'email'} placeholder={'Email'}
                                           value={email} style={{fontSize: '15px'}}
                                           onChange={(e) => setEmail(e.target.value)} required/>
                                    <label htmlFor={'password'} className={'form-label '} style={{ paddingTop: '5px', fontSize: '15px' }}>Password:</label>
                                    <input type={'password'} className={'form-control register-input'} id={'password'} placeholder={'Password'} value={password} style={{fontSize: '15px' }} onChange={(e) => setPassword(e.target.value)} required />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleRegister(username, email, password)} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent;