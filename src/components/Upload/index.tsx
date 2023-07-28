'use client'

import axios from 'axios'
import { ChangeEvent, useState } from 'react'

export function Upload() {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)

  const [fileName, setFileName] = useState('')

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  async function handleUploadFile() {
    try {
      setLoading(true)

      const formData = new FormData()

      if (file) formData.append('file', file)

      const response = await axios.post(
        'http://localhost:3333/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      console.log(response.data)

      setFileName(response.data.nameFile)

      setLoading(false)

      console.log(response.data.nameFile)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-row items-center gap-4 rounded-lg p-2 bg-zinc-800">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="h-full text-white rounded-lg px-4 bg-zinc-900"
      />

      <form className="text-white" encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
      </form>

      <progress max="100" value={loading ? 100 : 0} />

      <button
        className="w-full bg-purple-700 text-white px-4 py-2"
        onClick={handleUploadFile}
        type="button"
      >
        Enviar
      </button>
    </div>
  )
}
