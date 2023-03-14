import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const dispatch = useDispatch()
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    // Redirect if user loggen in
    if (isSuccess || user) {
      toast.success('User Created successfully', {
        autoClose: 1000,
        position: 'top-center',
      })
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  // destructuring data from formData
  const { name, email, password, password2 } = formData
  // form handler
  const onSubmit = (e) => {
    e.preventDefault()

    //inputs validation
    if (name.trim() === '') {
      toast.error('Please Enter Your Name', {
        autoClose: 2500,
        position: 'top-center',
      })
    }
    //Email validation
    if (email === '' || !email.includes('@')) {
      toast.error('Please Enter Your Email', {
        autoClose: 2500,
        position: 'top-center',
      })
    }
    //password validation
    if (password !== password2) {
      toast.error('Passwords do not match', {
        autoClose: 2500,
        position: 'top-center',
      })
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }
  //input handler
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              placeholder="Enter Your Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              className="form-control"
              value={password2}
              placeholder="Confirm Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Register
