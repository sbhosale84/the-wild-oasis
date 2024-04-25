import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource={"cabins"} />;

  // Get the filter and sort parameters from the URL
  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  else if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  let sortedCabins = filteredCabins.slice();
  
  const [sortByField, sortOrder] = sortBy.split("-");
  sortedCabins.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortByField] > b[sortByField] ? 1 : -1;
    } else {
      return a[sortByField] < b[sortByField] ? 1 : -1;
    }
  });

  return (
    <Menus>
      <Table columns={"0.7fr 1.8fr 2.2fr 1fr 1fr 0.6fr"}>
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
