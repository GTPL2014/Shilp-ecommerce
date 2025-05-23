import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const { fetchAddress } = useGlobalContext()
  const [loadingLocation, setLoadingLocation] = useState(false)

  useEffect(() => {
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        setLoadingLocation(true)
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              )
              const data = await res.json()
              const address = data.address || {}

              // Auto-fill input fields
              setValue("addressline", data.display_name || "")
              setValue("city", address.city || address.town || address.village || "")
              setValue("state", address.state || "")
              setValue("country", address.country || "")
              setValue("pincode", address.postcode || "")
            } catch (error) {
              console.error("Reverse geocoding failed:", error)
            } finally {
              setLoadingLocation(false)
            }
          },
          (error) => {
            toast.error("Location permission denied")
            setLoadingLocation(false)
          }
        )
      } else {
        toast.error("Geolocation not supported")
      }
    }

    fetchLocation()
  }, [setValue])

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          name: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          zip: data.pincode,
          phone: data.mobile
        }
      })

      const { data: responseData } = response

      if (responseData) {
        toast.success(responseData.message)
        if (close) {
          close()
          reset()
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
      <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
        <div className='flex justify-between items-center gap-4'>
          <h2 className='font-semibold'>Add Address {loadingLocation && "(Fetching location...)"}</h2>
          <button onClick={close} className='hover:text-red-500'>
            <IoClose size={25} />
          </button>
        </div>
        <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
          {[
            { id: "addressline", label: "Address Line" },
            { id: "city", label: "City" },
            { id: "state", label: "State" },
            { id: "pincode", label: "Pincode" },
            { id: "country", label: "Country" },
            { id: "mobile", label: "Mobile No." },
          ].map(({ id, label }) => (
            <div key={id} className='grid gap-1'>
              <label htmlFor={id}>{label}:</label>
              <input
                type='text'
                id={id}
                className='border bg-blue-50 p-2 rounded'
                {...register(id, { required: true })}
              />
            </div>
          ))}

          <button
            type='submit'
            className='bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100'>
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddAddress
