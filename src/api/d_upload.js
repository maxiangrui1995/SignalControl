import http from './public'

export const imageUpload = params => {
  return http.$post("d_upload/imageUpload", params);
};




