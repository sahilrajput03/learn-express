export const aMulterErrorOccuredWhenUploading = 'A Multer error occurred when uploading.'
export const anUnknownErrorOccuredWhenUploading = 'An unknown error occurred when uploading.'

export const singleFileErrorMulter = (fieldName: string) => `Please make sure you are uploading to \`${fieldName}\` fieldName to upload a single file only.`
export const multiFileErrorMulter = (fieldName: string, maxAllowed: number) => `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} files.`
