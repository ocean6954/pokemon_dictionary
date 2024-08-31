import React from "react";
import styled from "styled-components";

const StyledListLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  background-color: red;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const ListLoadingOverlay = () => {
  return <StyledListLoadingOverlay></StyledListLoadingOverlay>;
};

export default ListLoadingOverlay;
