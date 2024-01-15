const LoginForm = ({ handleSubmit, data, setData }) => {
    
    return (
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-3 glassmorphism'>            
              <label>Email</label>
              <input type='email' value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}} required id='email' name='email'/>           
              <label>Password</label>
              <input type='password' value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}} required id='password' name='password'/>
              <button type='submit' className='btn_register'>Login</button>
      </form>
    )
  }
  
  export default LoginForm