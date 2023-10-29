export default function Page() {
  async function create(formData: FormData) {
    'use server'
  }

  return (
    <form action={create}>
      <label>
        First Name:
        <input name="firstName" type="text" />
      </label>
      <br />
      <label>
        Last Name:
        <input name="lastName" type="text" />
      </label>
    </form>
  );
}