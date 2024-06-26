import React from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);

  const handleClick = (value) => {
    if (searchParams.get("page")) searchParams.set("page", 1);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterField, value);
    setSearchParams(newSearchParams.toString());
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
