import { lighthouseConfig } from '../../../lighthouse.config'
import { adjustUrlProtocol } from '../../utils/util'

export default async (blob: any, apiKey: string, mimeType = '', useHttp: boolean = false) => {
  try {
    const token = 'Bearer ' + apiKey
    const endpoint = adjustUrlProtocol(`${lighthouseConfig.lighthouseUploadGateway}/api/v0/add`,useHttp)

    // Upload file
    const formData = new FormData()
    formData.set('file', blob)

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Mime-Type': mimeType,
        Authorization: token,
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`)
    }

    const data = await response.json()

    return { data }
  } catch (error: any) {
    throw new Error(error?.message)
  }
}
