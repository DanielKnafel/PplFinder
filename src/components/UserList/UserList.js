import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useFavorites } from "Contexts/FavoritesContext";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  // a context for manipulating the favorites list
  const { favorites, applyFavorite } = useFavorites()
  // a boolean indicating rather a filter has been turned on or not
  const [isFiltered,setIsFiltered] = useState(false)
  // a list of all active filters
  const [filters, setFilters] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // after a filter has been changed, check if any filters are still active, and set isFiltered accordingly
  useEffect(() => {
    for (const filter of Object.values(filters)) {
      if (filter) {
        setIsFiltered(true);
        return;
      }
    }
    setIsFiltered(false);
  }, [filters])

  const handleCheckBoxChange = (event) => {
    setFilters({...filters, [event] : !filters[event]});
  }

  const handleIconClick = (user) => {
    applyFavorite(user)
  }

  function isFavorite(user) {
    const array =  Object.values(favorites)
    if (array.includes(user))
      return 1
    return 0
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="Brazil" label="Brazil" onChange={handleCheckBoxChange} />
        <CheckBox value="Australia" label="Australia" onChange={handleCheckBoxChange} />
        <CheckBox value="Canada" label="Canada" onChange={handleCheckBoxChange} />
        <CheckBox value="Germany" label="Germany" onChange={handleCheckBoxChange} />
        <CheckBox value="Netherlands" label="Netherlands" onChange={handleCheckBoxChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          // render the user, if it matches the current filters, or no filters are active
          if (!isFiltered || filters[user.location.country])
            return (
                <S.User
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <S.UserPicture src={user?.picture.large} alt="" />
                  <S.UserInfo>
                    <Text size="22px" bold>
                      {user?.name.title} {user?.name.first} {user?.name.last}
                    </Text>
                    <Text size="14px">{user?.email}</Text>
                    <Text size="14px">
                      {user?.location.street.number} {user?.location.street.name}
                    </Text>
                    <Text size="14px">
                      {user?.location.city} {user?.location.country}
                    </Text>
                  </S.UserInfo>
                  <S.IconButtonWrapper isVisible={isFavorite(user) || index === hoveredUserId}>
                    <IconButton onClick={() => handleIconClick(user, index)}>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
            );
          else
            return null
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
