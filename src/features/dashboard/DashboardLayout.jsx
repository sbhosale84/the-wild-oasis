import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, bookings, numDays } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabin();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      <TodayActivity/>
      <DurationChart confirmStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
