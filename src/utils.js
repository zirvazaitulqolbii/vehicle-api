export function makeErrorResponse(error, cause) {
  return {
    status: 'error',
    code: cause,
    error,
  };
}

export function makeSuccessResponse(data, meta) {
  return {
    status: 'success',
    data,
    meta,
  };
}

export function makePaginatedResponse(query, data, total) {
  const meta = {
    total,
    limit: query.limit,
    offset: query.offset,
  };
  
  return makeSuccessResponse(data, meta)
}