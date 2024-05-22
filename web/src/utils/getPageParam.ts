export const getPageParam = (searchParams) => {
  const pageParam = searchParams.get("page");
	let page = 1;
	if (pageParam) page = parseInt(pageParam);

  return {
    page,
    pageParam
  }
}