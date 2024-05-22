export interface getContentTypes {
  contentId?: string,
  contentName?: string,
  contentStatus?: string,
  contentType?: string,
  page?: number
}

export interface addContentToListTypes {
  contentName: string,
  contentStatus: string,
  contentType: string,
  globalRating: string,
  genres: string,
  images: string
}

export interface updateContentTypes {
  content_id: string | number,
  content_status: string
}

export interface getGenresTypes {
  genreName?: string,
  contentType?: string
}