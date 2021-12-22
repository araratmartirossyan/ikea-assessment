import { AxiosResponse } from 'axios'
import { createStore, createEffect, sample } from 'effector'
import { toast } from 'react-toastify'

import axiosFn from '../utils/request'
import { getArticlesFx } from './articles.store'
import { getProductsFx } from './products.store'

interface UploadFileResponse extends AxiosResponse {}
interface UploadFileEffect {
  selectedFile: File
  fileType: string
}

const uploadFile = async (url: string, selectedFile: File) => {
  const formData = new FormData()

  formData.append('file', selectedFile)

  return axiosFn<UploadFileResponse>({
    method: 'post',
    url,
    data: formData
  })
}

// Article Upload
export const uploadFileFx = createEffect(
  async ({ selectedFile, fileType }: UploadFileEffect) => {
    const response = await uploadFile(`${fileType}/upload`, selectedFile)

    return response.data
  }
)

export const $uploadFileError = createStore({}).on(
  uploadFileFx.failData,
  (_, error) => {
    toast.error('File Uploading Failed, try again later')
    return error
  }
)

export const $uploadFile = createStore([]).on(
  uploadFileFx.doneData,
  (_, data) => {
    toast.success('File Uploaded')
    getProductsFx()
    getArticlesFx()
    return data
  }
)
