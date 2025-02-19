"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/app/lib/firebase"

const Page = () => {
  const [name, setName] = useState("")
  const [imgURL, setImgURL] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        imgURL,
        price,
        category 
      })
      console.log("Document written with ID: ", docRef.id)
      // Optionally, reset the form
      setName("")
      setImgURL("")
      setPrice(0)
      setCategory("")
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <form className='w-[350px]' onSubmit={handleSubmit}>
        <Label className='m-2'>
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Label>
        <Label className='m-2'>
          <Input type="text" placeholder="imgURL" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
        </Label>
        <Label className='m-2'>
          <Input type="number" placeholder="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </Label>
        <Label className='m-2'>
          <Input type="text" placeholder="description" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Label>
        <Button className='w-full mt-2' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Page