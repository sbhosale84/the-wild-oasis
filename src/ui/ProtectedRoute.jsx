import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();
  //2. if thee is no auth user redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [navigate, isAuthenticated, isLoading]
  );
  //3.while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. If there is user render the app
  if (isAuthenticated) return <div>{children}</div>;
}

export default ProtectedRoute;
