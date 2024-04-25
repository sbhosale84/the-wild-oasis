import { useEffect, useRef } from 'react'

function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();

    function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            handler();
        }
    }
    useEffect(
        function () {
            document.addEventListener("click", handleClick, listenCapturing);

            return () => document.removeEventListener("click", handleClick, listenCapturing);
        },
        [handler, listenCapturing]
    );
    return { ref }
}

export default useOutsideClick
