import React from "react";

import styled, { css } from "~/theme";
import Date from "../Date";

export interface TFilter {
  id: string;
  isActive?: boolean;
  val: string | null;
  type: string;
  from: string | number;
  to: string | number;
}

export interface TFilterItem {
  add?: (type: string, id: string, createdAt?: string | null) => void;
  id: string;
  createdAt?: string | null;
  dateRemoved?: boolean;
  filters?: TFilter[];
  icon?: string;
  text: string;
}

const Item = ({
  add,
  dateRemoved,
  filters,
  icon,
  id,
  text
}: TFilterItem): JSX.Element => {
  const handleBadgeAdd = (
    type: string,
    id: string,
    createdAt?: string | null
  ): void => {
    add && add(type, id, createdAt);
  };

  return (
    <>
      {add && icon && (
        <StyledWrapper>
          <StyledName>
            <StyledIcon dangerouslySetInnerHTML={{ __html: icon }} />
            {text && text.length && <StyledText>{text}</StyledText>}
          </StyledName>

          {filters && !!filters.length && (
            <StyledList>
              {filters.map(
                ({ id, isActive, val, type }: TFilter): JSX.Element => (
                  <StyledItem key={id}>
                    <StyledBadge
                      isActive={isActive !== undefined && isActive}
                      onClick={() => handleBadgeAdd(type, id)}
                    >
                      {val}
                    </StyledBadge>
                  </StyledItem>
                )
              )}
            </StyledList>
          )}

          {id === "createdAt" && (
            <Date
              dateRemoved={dateRemoved}
              onDateChange={createdAt =>
                handleBadgeAdd("createdAt", "createdAt", createdAt)
              }
            />
          )}
        </StyledWrapper>
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  border-bottom: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  line-height: ${({ theme }) => theme.rem(24)};
  margin-bottom: ${({ theme }) => theme.rem(13)};
  padding-bottom: ${({ theme }) => theme.rem(5)};
  position: relative;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledIcon = styled.i`
  align-items: center;
  color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  height: ${({ theme }) => theme.rem(30)};
  justify-content: center;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(30)};
`;

const StyledName = styled.div`
  height: ${({ theme }) => theme.rem(30)};
  line-height: ${({ theme }) => theme.rem(30)};
  margin-right: ${({ theme }) => theme.rem(10)};
  padding-left: ${({ theme }) => theme.rem(35)};
  position: relative;
  top: ${({ theme }) => theme.rem(-3)};
  width: ${({ theme }) => theme.rem(80)};
`;

const StyledText = styled.span``;

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledItem = styled.li``;

const StyledBadge = styled.span<{
  isActive: boolean;
}>`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  cursor: pointer;
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(13)};
  height: ${({ theme }) => theme.rem(25)};
  line-height: ${({ theme }) => theme.rem(25)};
  margin-bottom: ${({ theme }) => theme.rem(8)};
  margin-right: ${({ theme }) => theme.rem(8)};
  min-width: ${({ theme }) => theme.rem(60)};
  padding: 0 ${({ theme }) => theme.rem(5)};
  text-align: center;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.orange};
      pointer-events: none;
    `}
`;

export default Item;
