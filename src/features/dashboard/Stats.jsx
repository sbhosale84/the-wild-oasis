import React from "react";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.
  const totalCheckIns = confirmStays.length;
  //4.
  //num checked in nights / all available nights
  const occupation =
    confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title={"Bookings"}
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
      />
      <Stat
        title={"sales"}
        value={formatCurrency(totalSales)}
        icon={<HiOutlineBanknotes />}
        color={"green"}
      />
      <Stat
        title={"check ins"}
        value={totalCheckIns}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
      />
      <Stat
        title={"occupancy rate"}
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
      />
    </>
  );
}

export default Stats;
