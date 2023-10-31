"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { Contacts } from "../ui/contacts";

export type Inputs = {
  firstName: string
  lastName: string
  phone: number
  email: string
  github: string
  linkedin: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("firstName")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label><br />
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}<br />

      <label>Last Name:</label><br />
      <input {...register("lastName", { required: true })} />
      {errors.lastName && <span>This field is required</span>}<br />

      {Contacts(register)}<br />

      <input type="submit" value="Submit" />
    </form>
  )
}





