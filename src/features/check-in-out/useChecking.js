import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../../starter/services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useChecking() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({bookingId,breakfast}) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true })
            navigate("/")
        },
        // onError: () => {
        //     toast.error("There was an error WHILE checking in")
        // }
    });
    return {checkin,isCheckingIn}
}

export default useChecking
