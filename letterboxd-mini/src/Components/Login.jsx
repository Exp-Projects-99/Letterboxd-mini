import React, {useState} from 'react'
function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login attempt: ', username, password);
    }

    return (
        <form onSubmit={handleLogin} style={{ width: '600px', marginTop: '10px', marginLeft: '250px' }}>
            <div className='row' style={{ width: "600px", height: '50px', backgroundColor: '#000028', paddingTop: '10px' }}>
                <label htmlFor={'username'} className={'form-label col'} style={{ paddingTop: '2.5px' }}>Username:</label>
                <input type={'text'} className={'form-control col input-box'} id={'username'} placeholder={'Username'} value={username} style={{ width: '150px', height: '30px', fontSize: '16px' }} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor={'password'} className={'form-label col'} style={{ paddingTop: '2.5px' }}>Password:</label>
                <input type={'password'} className={'form-control input-box col'} id={'password'} placeholder={'Password'} value={password} style={{ width: '150px', height: '30px', fontSize: '16px' }} onChange={(e) => setPassword(e.target.value)} required />
            <button type={'submit'} className={"btn btn-outline-secondary"} style={{ marginLeft: '20px', height: '30px', fontSize: '16px' }}>Login</button>
            </div>
        </form>
    )
}

export default LoginComponent;