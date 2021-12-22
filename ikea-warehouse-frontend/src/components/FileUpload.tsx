import { useState, FC, useRef, MutableRefObject } from 'react'
import { uploadFileFx } from '../stores/file.store'

type Props = {
  fileType: string
}

export const FileUpload: FC<Props> = ({ fileType }) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const input = useRef() as MutableRefObject<HTMLInputElement>

  const changeHandler = ({ target }: any) => {
    setSelectedFile(target.files[0])
    setIsFilePicked(true)
  }

  const handleSubmission = () => {
    if (selectedFile) {
      uploadFileFx({ selectedFile, fileType })
      setSelectedFile(undefined)
      setIsFilePicked(false)
      if (input.current) {
        ;(input.current as HTMLInputElement).value = ''
      }
    }
  }

  return (
    <div className="flex mr-4">
      <div className="mb-3 ">
        <label className="form-label inline-block mb-2 text-gray-700">
          Upload <b className="text-red-600">{fileType}</b>
        </label>
        <input
          ref={input}
          type="file"
          name="file"
          onChange={changeHandler}
          className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700
            focus:bg-white
            focus:border-blue-600
            focus:outline-none"
          id="formFile"
        />
        <button
          onClick={handleSubmission}
          disabled={!isFilePicked}
          className="disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed bg-green-600 hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center"
        >
          Upload {fileType}
        </button>
      </div>
    </div>
  )
}
