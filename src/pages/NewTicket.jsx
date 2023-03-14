import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //getting user from global state
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.tickets
  )

  // states
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 2000,
        position: 'top-center',
      })
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message])

  // on submit form
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <BackButton url="/" />
      <div className="formCard">
        <section className="heading">
          <h1>Create New Ticket</h1>
          <p>Please fill out the form below</p>
        </section>
        <section className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input className="form-control" type="text" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              disabled
            />
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Products</label>
              <select
                name="product"
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="MacBook Pro">MacBook Pro</option>
                <option value="iMac">iMac</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of the issue</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
export default NewTicket
