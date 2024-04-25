import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../../starter/services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {

    const queryClient = useQueryClient();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out",
        }),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true })
        },
        // onError: () => {
        //     toast.error("There was an error WHILE checking in")
        // }
    });
    return { checkout, isCheckingOut }
}

export default useCheckout