import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import { updateEmployee } from "../redux/authSlice"

const Editprofile = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const employee = useSelector((state) =>
    state.auth.storedata?.find((emp) => emp._id === id)
  )

  useEffect(() => {
    if (employee) {
      reset(employee)
    }
  }, [employee, reset])

  const onSubmit = (data) => {
    dispatch(
      updateEmployee({
        ...data,
        _id: id
      })
    )

    console.log(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Update Profile
        </h1>

        {/* First Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full rounded-lg border p-3"
            {...register("firstName", {
              required: "First name is required"
            })}
          />

          {errors.firstName && (
            <p className="text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            className="w-full rounded-lg border p-3"
            {...register("lastName", {
              required: "Last name is required"
            })}
          />

          {errors.lastName && (
            <p className="text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3"
            {...register("email", {
              required: "Email is required"
            })}
          />

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone"
            className="w-full rounded-lg border p-3"
            {...register("phone", {
              required: "Phone is required"
            })}
          />

          {errors.phone && (
            <p className="text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-500 py-3 text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Editprofile