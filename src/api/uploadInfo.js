
import request from '@/http/api'

function getUploadInfo({ uuid }) {
  return request.get('/VodStsForApp/' + uuid)
}

export {
  getUploadInfo
}
