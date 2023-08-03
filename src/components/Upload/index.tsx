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

      const blob = new Blob([response.data.image], {
        type: response.data.image.mimetype,
      })
      const url = URL.createObjectURL(blob)
      console.log(url)

      setFileName(response.data.nameFile)

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-auto flex flex-col items-center gap-5 rounded-lg p-4 bg-zinc-800">
      <div className="w-full text-center">
        <h1 className="text-xl font-bold text-white ">Converta sua imagem</h1>
      </div>

      <div className="h-full w-full flex flex-col gap-4">
        <span className="text-slate-300 text-xs">
          Customize o nome do arquivo
        </span>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="h-11 w-full text-white rounded-lg px-4 bg-zinc-900"
        />
      </div>

      <form className="w-full text-white" encType="multipart/form-data">
        <input className="w-full" type="file" onChange={handleFileChange} />
      </form>

      <div className="flex items-center">
        <progress max="100" value={loading ? 100 : 0} />
      </div>

      <button
        className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg"
        onClick={handleUploadFile}
        type="button"
      >
        Enviar
      </button>
    </div>
  )
}
