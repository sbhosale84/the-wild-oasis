import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../../starter/services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_COUNT } from '../../../starter/utils/constants';

function useBookings() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  // Extracting sort and filter parameters from searchParams
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };

  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_COUNT)

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return { isLoading, bookings, error, count };
}

export default useBookings;
